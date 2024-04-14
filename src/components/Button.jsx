function Button({handleClick, text}) {
  return (
  <button onClick={handleClick ? handleClick: null}> {text} </button>
  )
}
export default Button;