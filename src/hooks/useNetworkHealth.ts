import { useState, useEffect } from 'react'
import { ApiPromise } from '@polkadot/api'

type NetworkHealth = {
  peers: number
  isSyncing: boolean
}

export function useNetworkHealth(api: ApiPromise | null) {
  const [health, setHealth] = useState<NetworkHealth | null>(null)

  useEffect(() => {
    if (!api) return

    const fetch = async () => {
      try {
        const result = await api.rpc.system.health()
        setHealth({
          peers: (result as any).peers.toNumber(),
          isSyncing: (result as any).isSyncing.valueOf(),
        })
      } catch (err) {
        console.error('Network Health Fehler:', err)
      }
    }

    fetch()
    const interval = setInterval(fetch, 10000)
    return () => clearInterval(interval)
  }, [api])

  return { health }
}
