import { useState, useRef } from 'react'

const COOLDOWN_SECONDS = 30

type Props = {
  blockNumber: number
  validators: number
  transactions: number
  dotPrice: number
  blockHistory: { block: number; transactions: number }[]
  apiKey: string
}

export function AiSummary({
  blockNumber,
  validators,
  transactions,
  dotPrice,
  blockHistory,
  apiKey,
}: Props) {
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const lastCallRef = useRef<number>(0)

  const analyze = async () => {
    if (!apiKey) return

    const now = Date.now()
    const secondsSinceLast = (now - lastCallRef.current) / 1000

    if (secondsSinceLast < COOLDOWN_SECONDS) {
      const remaining = Math.ceil(COOLDOWN_SECONDS - secondsSinceLast)
      setCooldown(remaining)
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return
    }

    lastCallRef.current = now
    setLoading(true)

    try {
      const avgTxns =
        blockHistory.reduce((sum, b) => sum + b.transactions, 0) /
        blockHistory.length
      console.log('headers being sent:', {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      })

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 150,
          messages: [
            {
              role: 'user',
              content: `You are a Polkadot network analyst. Analyze this data and write a 2-3 sentence summary in English. Be concise and insightful. Do not use markdown formatting, headers, or bullet points. Plain text only.

Important context: This data is from the Polkadot Relay Chain, not a parachain. The relay chain intentionally has low transaction 
volume as it primarily handles consensus and validator coordination. Most user transactions happen on parachains like Asset Hub. 

Current block: ${blockNumber}
Validators: ${validators}
Current transactions: ${transactions}
Average transactions (last ${blockHistory.length} blocks): ${avgTxns.toFixed(1)}
DOT price: $${dotPrice}

Do not use markdown formatting, headers, or bullet points. Plain text only. Thanks!`,
            },
          ],
        }),
      })

      const data = await response.json()
      setSummary(data.content[0].text)
    } catch (err) {
      console.error('AI Fehler:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!apiKey) {
    return (
      <p className="text-gray-400 text-sm">
        Add your Anthropic API Key above to use AI features.
      </p>
    )
  }

  return (
    <div>
      <button
        onClick={analyze}
        disabled={loading || cooldown > 0}
        className=" my-4 px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors rounded-lg"
      >
        {loading
          ? 'Analyzing...'
          : cooldown > 0
            ? `Wait ${cooldown}s`
            : 'Analyze Network'}
      </button>
      {summary && (
        <p className="border-gray-300 border rounded-lg p-4 text-gray-700 leading-relaxed">
          {summary}
        </p>
      )}
      {!summary && !loading && (
        <p className="text-gray-400 text-sm">
          Press the button to analyze the current network state.
        </p>
      )}
    </div>
  )
}
