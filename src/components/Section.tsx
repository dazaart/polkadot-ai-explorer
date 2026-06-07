import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  cols: number
}

export function Section({ title, children, cols }: Props) {
  return (
    <div className="my-8">
      <div className="flex items-center gap-3 ">
        <span className="font-bold text-lg py-4">{title}</span>
        <hr className="border-gray-300 flex-1" />
      </div>

      <div className={`grid grid-cols-${cols} gap-4`}>{children}</div>
    </div>
  )
}
