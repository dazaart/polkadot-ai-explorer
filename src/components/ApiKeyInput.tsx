import { useState, useEffect } from 'react'

type Props = {
  onKeySet: (key: string) => void
}

export function ApiKeyInput({ onKeySet }: Props) {
  const [input, setInput] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('anthropic_key')
    if (saved) onKeySet(saved)
  }, [])

  const handleSave = () => {
    console.log('input:', input)
    if (!input.trim()) return
    localStorage.setItem('anthropic_key', input.trim())
    onKeySet(input.trim())
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="password"
        placeholder="sk-ant-..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-black rounded-lg"
      />
      {<button
        onClick={handleSave}
        className="px-4 py-1.5 bg-black text-white text-sm hover:bg-gray-800 transition-colors rounded-lg "
      >
        Save Key
      </button>}
    </div>
  )
}
