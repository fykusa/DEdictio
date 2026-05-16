interface Props {
  code: string
  size?: number
  label?: string
}

export function FlagImg({ code, size = 28, label }: Props) {
  return (
    <img
      src={`/flags/${code}.png`}
      width={size}
      alt={label ?? code.toUpperCase()}
      height={size}
      style={{ borderRadius: '50%', objectFit: 'cover', display: 'block' }}
    />
  )
}
