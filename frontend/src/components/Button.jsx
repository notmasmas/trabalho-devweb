export default function Button({ children, onClick, variant = 'dark', className = '' }) {

  return (
    <button
      onClick={onClick}
      className="btn"
    >
      {children}
    </button>
  )
}