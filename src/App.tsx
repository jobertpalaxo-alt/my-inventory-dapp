// src/App.tsx
import React, { useState, useMemo } from 'react'
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useReadContract,
  useReadContracts, 
  useWriteContract, 
  useWaitForTransactionReceipt 
} from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { CONTRACT_ADDRESS, INVENTORY_ABI } from './contract'

// --- DESIGN SYSTEM (INLINE STYLES) ---
const styles = {
  layout: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: '"Inter", -apple-system, sans-serif',
    color: '#1f2937',
  },
  // Fixed Header Styles
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    zIndex: 1000,
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#111827',
  },
  // Main Content Area (Offset by header height)
  main: {
    paddingTop: '100px',
    paddingBottom: '2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  card: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '2rem',
  },
  sectionTitle: {
    margin: '0 0 1.25rem 0',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#374151',
    borderBottom: '2px solid #f3f4f6',
    paddingBottom: '0.5rem',
  },
  // Form Styles
  formRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap' as const,
  },
  input: {
    flex: 1,
    minWidth: '150px',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
  },
  btnPrimary: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    whiteSpace: 'nowrap' as const,
  },
  btnDanger: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fca5a5',
    fontWeight: '600',
    cursor: 'pointer',
  },
  btnConnect: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    backgroundColor: '#1f2937',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: '0.35rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginRight: '1rem',
  },
  // Table Styles
  tableWrapper: {
    overflowX: 'auto' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    textAlign: 'left' as const,
  },
  th: {
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderBottom: '2px solid #e5e7eb',
    color: '#4b5563',
    fontWeight: '600',
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    color: '#111827',
  }
}

export default function App() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [priceEth, setPriceEth] = useState('0.01')

  // 1. READ: Get total item count
  const { data: itemCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: INVENTORY_ABI,
    functionName: 'item_count',
  })

  // 2. READ ALL: Dynamically generate an array of contract calls for the table
  const count = itemCount ? Number(itemCount) : 0
  
  // Creates an array of calls: get_item(1), get_item(2), ..., get_item(count)
  const itemContractCalls = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      address: CONTRACT_ADDRESS,
      abi: INVENTORY_ABI,
      functionName: 'get_item' as const,
      args: [BigInt(i + 1)],
    }))
  }, [count])

  // Fetch all items simultaneously
  const { data: itemsData, refetch: refetchItems } = useReadContracts({
    contracts: itemContractCalls as any,
  })

  // 3. WRITE: Trigger add_item
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: INVENTORY_ABI,
      functionName: 'add_item',
      args: [name, BigInt(quantity), parseEther(priceEth)],
    })
  }

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <div style={styles.layout}>
      {/* --- FIXED HEADER --- */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>📦 dApp Inventory</h1>
        <div>
          {!isConnected ? (
            connectors.map((connector) => (
              <button 
                key={connector.uid} 
                onClick={() => connect({ connector })}
                style={styles.btnConnect}
              >
                Connect {connector.name}
              </button>
            ))
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={styles.badge}>{address ? truncateAddress(address) : ''}</span>
              <button onClick={() => disconnect()} style={styles.btnDanger}>
                Disconnect
              </button>
            </div>
          )}
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main style={styles.main}>
        
        {/* ADD ITEM CARD */}
        {isConnected && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>➕ Add New Item</h2>
            <form onSubmit={handleAddItem}>
              <div style={styles.formRow}>
                <input 
                  style={styles.input} type="text" placeholder="Item Name" 
                  value={name} onChange={(e) => setName(e.target.value)} required 
                />
                <input 
                  style={{...styles.input, maxWidth: '100px'}} type="number" placeholder="Qty" 
                  value={quantity} onChange={(e) => setQuantity(e.target.value)} required min="1"
                />
                <input 
                  style={{...styles.input, maxWidth: '150px'}} type="text" placeholder="Price (ETH)" 
                  value={priceEth} onChange={(e) => setPriceEth(e.target.value)} required 
                />
                <button type="submit" disabled={isPending} style={styles.btnPrimary}>
                  {isPending ? '⏳ Confirming...' : 'Add Item'}
                </button>
              </div>
            </form>
            
            {/* Status Messages */}
            {isConfirming && <p style={{ color: '#d97706', marginTop: '1rem' }}>⏳ Transaction is being mined...</p>}
            {isConfirmed && <p style={{ color: '#15803d', marginTop: '1rem' }}>✅ Item added successfully! (Refresh table below)</p>}
          </div>
        )}

        {/* INVENTORY TABLE CARD */}
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={styles.sectionTitle}>📋 Inventory Ledger</h2>
            <button onClick={() => refetchItems()} style={{...styles.btnConnect, backgroundColor: '#4b5563'}}>
              🔄 Refresh Table
            </button>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Price (ETH)</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Check if we have data, otherwise show empty state */}
                {!itemsData || itemsData.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ ...styles.td, textAlign: 'center', color: '#6b7280' }}>
                      No items in inventory.
                    </td>
                  </tr>
                ) : (
                  itemsData.map((item, index) => {
                    // Wagmi returns an object with { status, result }. We only show successful reads.
                    if (item.status !== 'success' || !item.result) return null;
                    
                    // The result is the tuple from our Vyper contract: [id, name, quantity, price, exists]
                    // Cast as any here to easily extract tuple elements based on your ABI
                    const data: any = item.result; 
                    const isDeleted = !data.exists;

                    return (
                      <tr key={index} style={{ opacity: isDeleted ? 0.5 : 1 }}>
                        <td style={styles.td}>#{String(data.id)}</td>
                        <td style={styles.td}>{data.name}</td>
                        <td style={styles.td}>{String(data.quantity)}</td>
                        <td style={styles.td}>{formatEther(data.price)} ETH</td>
                        <td style={styles.td}>
                          {isDeleted ? (
                            <span style={{ color: '#dc2626', fontWeight: 'bold' }}>Removed</span>
                          ) : (
                            <span style={{ color: '#16a34a', fontWeight: 'bold' }}>Active</span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </main>
    </div>
  )
}