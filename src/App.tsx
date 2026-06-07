import { useEffect, useState } from 'react'
import { StatCard } from './components/StatCard'
import { usePolkadot } from './hooks/usePolkadot'
import { BlockChart, type BlockPoint } from './components/BlockChart'

function App() {
  const { chainData, loading, error } = usePolkadot()
  const [blockHistory, setBlockHistory] = useState<BlockPoint[]>([])

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
        <p className="text-xl">Verbinde mit Polkadot...</p>
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
    <div className="min-h-screen bg-gray-950 text-white p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-pink-400 mb-8">
        Polkadot AI Explorer
      </h1>
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Aktueller Block"
          value={chainData?.blockNumber.toLocaleString() ?? 0}
          icon="📦"
        />
        <StatCard
          title="Validators"
          value={chainData?.validators ?? 0}
          icon="👥"
        />
        <StatCard
          title="Transaktionen"
          value={chainData?.transactions ?? 0}
          icon="⚡"
        />
        <StatCard
          title="Block Hash"
          value={`${chainData?.blockHash.slice(0, 10)}...`}
          icon="🔗"
        />
      </div>
      <BlockChart data={blockHistory} />
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
