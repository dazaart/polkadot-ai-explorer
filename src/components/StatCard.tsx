import type { ReactNode } from 'react'

type Props = {
  title: string
  value: string | number | ReactNode
  icon: string | ReactNode
}

export function StatCard({ title, value, icon }: Props) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 boder border-gray-800">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-gray-300 text-sm">{title}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
