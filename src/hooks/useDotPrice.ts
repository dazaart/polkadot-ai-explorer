import { useState, useEffect } from 'react'

type DotPrice = {
  price: number
  change24h: number
}

export function useDotPrice() {
  const [dotPrice, setDotPrice] = useState<DotPrice | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=polkadot&vs_currencies=usd&include_24hr_change=true',
        )
        const data = await response.json()
        console.log(' useDotPrice data : ', data)
        setDotPrice({
          price: data.polkadot.usd,
          change24h: data.polkadot.usd_24h_change,
        })
      } catch (err) {
        console.error('Preis konnte nicht geladen werden', err)
      }
    }

    fetchPrice()
    // 60sec update
    const interval = setInterval(fetchPrice, 60000)
    return () => clearInterval(interval)
  }, [])

  return { dotPrice }
}
