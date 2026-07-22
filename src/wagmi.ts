// src/wagmi.ts
import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia], // Adjust chain to match where you deployed in Remix
  connectors: [
    injected(), // Detects browser wallets like MetaMask or Rabby
  ],
  transports: {
    [sepolia.id]: http(),
  },
})