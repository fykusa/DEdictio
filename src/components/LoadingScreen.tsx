interface Props {
  error?: string
}

export function LoadingScreen({ error }: Props) {
  if (error) {
    return (
      <div className="loading-screen">
        <div className="error-message">{error}</div>
      </div>
    )
  }
  return (
    <div className="loading-screen">
      <div className="spinner" role="status" aria-label="Načítání" />
    </div>
  )
}
