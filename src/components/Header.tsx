type Props = {
  live: boolean
}

export function Header({ live }: Props) {
  return (
    <header className="border-b border-gray-200 px-12 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">⬡</span>
        <span className="font-bold text-lg">Polkadot AI Explorer</span>
      </div>
      {live && (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      )}
    </header>
  )
}
