import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  cols: number
}

export function Section({ title, children, cols }: Props) {
  const colsClass =
    {
      1: 'grid-cols-1 2xl:grid-cols-2',
      2: 'grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
    }[cols] ?? 'grid-cols-4'

  return (
    cols && (
      <div className="my-8">
        <div className="flex items-center gap-3 ">
          <span className="font-bold text-lg py-4">{title}</span>
          <hr className="border-gray-300 flex-1" />
        </div>

        <div className={`grid ${colsClass} gap-4`}>{children}</div>
      </div>
    )
  )
}
