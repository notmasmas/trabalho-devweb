export default function Button({ children, onClick, className = '', style }) {

  return (
    <button
      onClick={onClick}
      style={style}
      className="btn"
    >
      {children}
    </button>
  )
}