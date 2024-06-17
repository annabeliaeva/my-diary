import './CardButton.css'

function CardButton({ children, className, onClick }) {
  const cl = 'card-button' + (className ? ' ' + className : '')

  return (
    <>
      <button className={cl} onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default CardButton
