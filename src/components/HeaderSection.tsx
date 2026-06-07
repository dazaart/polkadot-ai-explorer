type Props = {
  title: string
}

export function HeaderSection({ title }: Props) {
  return (
    <div className="flex items-center gap-3 ">
      <span className="font-bold text-lg">{title}</span>
    </div>
  )
}
