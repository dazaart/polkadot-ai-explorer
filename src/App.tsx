import { useEffect, useState } from 'react'
import { StatCard } from './components/StatCard'
import { usePolkadot } from './hooks/usePolkadot'
import { BlockChart, type BlockPoint } from './components/BlockChart'
import { useDotPrice } from './hooks/useDotPrice'
import { useNetworkHealth } from './hooks/useNetworkHealth'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { AiSummary } from './components/AISummary'
import { ApiKeyInput } from './components/ApiKeyInput'

function App() {
  const { api, chainData, loading, error } = usePolkadot()
  const [blockHistory, setBlockHistory] = useState<BlockPoint[]>([])
  const { dotPrice } = useDotPrice()
  const { health } = useNetworkHealth(api)
  const [apiKey, setApiKey] = useState<string>('')

  useEffect(() => {
    if (chainData) {
      setBlockHistory((prev) => {
        const alreadyExists = prev.some(
          (b) => b.block === chainData.blockNumber,
        )
        if (alreadyExists) return prev
        const updated = [
          ...prev,
          {
            block: chainData.blockNumber,
            transactions: chainData.transactions,
          },
        ]
        return updated.slice(-20)
      })
    }
  }, [chainData])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Connecting to Polkadot...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header live={!!health} />
      <main className="px-12 py-10">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-xl">Relay Chain</h2>
        </div>
        <Section title="AI Summary" cols={1}>
          <div>
            {!apiKey && (
              <div className="mb-4">
                <ApiKeyInput onKeySet={setApiKey} />
              </div>
            )}
            <AiSummary
              blockNumber={chainData?.blockNumber ?? 0}
              validators={chainData?.validators ?? 0}
              transactions={chainData?.transactions ?? 0}
              dotPrice={dotPrice?.price ?? 0}
              blockHistory={blockHistory}
              apiKey={apiKey}
            />
          </div>
        </Section>

        <Section cols={4} title="Live Network">
          <StatCard
            title="Current Block"
            value={chainData?.blockNumber.toLocaleString('en-US') ?? 0}
            icon="📦"
          />
          <StatCard
            title="Validators"
            value={chainData?.validators ?? 0}
            icon="👥"
          />
          <StatCard
            title="Transactions"
            value={chainData?.transactions ?? 0}
            icon="⚡"
          />
          <StatCard
            title="Block Hash"
            value={`${chainData?.blockHash.slice(0, 10)}...`}
            icon="🔗"
          />
        </Section>

        <Section title="Market" cols={4}>
          <StatCard
            title="DOT Price"
            value={
              dotPrice
                ? `$${dotPrice.price.toFixed(2)} (${dotPrice.change24h >= 0 ? '+' : ''}${dotPrice.change24h.toFixed(2)}%)`
                : '...'
            }
            icon={dotPrice && dotPrice.change24h >= 0 ? '📈' : '📉'}
          />
        </Section>

        <Section title="Network Health" cols={4}>
          <StatCard
            title="Peers"
            value={health ? health.peers : '...'}
            icon="🌐"
          />
          <StatCard
            title="Status"
            value={
              health ? (
                health.isSyncing ? (
                  'Syncing...'
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse "></span>
                    <span className="mx-2">Live</span>
                  </div>
                )
              ) : (
                '...'
              )
            }
            icon="💡"
          />
        </Section>

        <Section title="Activity" cols={1}>
          <BlockChart data={blockHistory} />
        </Section>
      </main>
    </div>
  )
}

export default App
/*

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
*/
