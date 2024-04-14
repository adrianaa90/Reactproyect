import Button from "../components/Button"
import TodoList from "../views/TodoList"
import "../styles.css"; 

 function Form({handleChange,handleSubmit, value}) {
  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
        <h1 >Lista de tareas</h1>
        <input type="text" 
        placeholder="Ingresar tareas..." 
        onChange={handleChange} 
         value={value}/>
        <Button text={"Añadir "}/>
      
    </form>
    </div>
  )
}
export default Form