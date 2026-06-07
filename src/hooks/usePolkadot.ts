import { useState, useEffect } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api'

export type ChainData = {
  blockNumber: number
  blockHash: string
  validators: number
  transactions: number
}

export function usePolkadot() {
  const [api, setApi] = useState<ApiPromise | null>(null)
  const [chainData, setChainData] = useState<ChainData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const connect = async () => {
      try {
        const provider = new WsProvider('wss://rpc.polkadot.io')
        const api = await ApiPromise.create({ provider })

        api.rpc.chain.subscribeNewHeads(async (header) => {
          const validators = await api.query.session.validators()
          const blockHash = header.hash.toString()
          const block = await api.rpc.chain.getBlock(header.hash)
          const transactions = block.block.extrinsics.length

          setChainData({
            blockNumber: header.number.toNumber(),
            blockHash,
            validators: (validators as any).length,
            transactions,
          })
          setLoading(false)
        })
        setApi(api)
      } catch (err) {
        setError('Verbindung zu Polkadot Chain fehlgeschlagen')
        setLoading(false)
      }
    }

    connect()
  }, [])

  return { api, chainData, loading, error }
}
