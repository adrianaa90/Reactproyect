
import { useEffect, useState } from "react";
import Form from "../components/Form";
import Todo from "../components/Todo"
import Button from "../components/Button";
import "../styles.css"; 

function TodoList() {
  /*almacen tareas*/
  const [todos, setTodos] = useState([]);
  /*almacen tarea usuario*/
  const [text, setText] = useState("");


  /*funcion para cambiar estado de texto*/
  function changeText(event) {
    setText(event.target.value);
  }


  /*funcion que agrega tarea nueva*/
  function addTodo(event) {
    event.preventDefault();

    if (!text.trim()) {
      alert("¡Escribe algo!");
      return;
    }

    const newId = Math.round(Math.random() * 10000);
    const newTodo = {
      titulo: text,
      id: newId,
      completed: false,
      editing: false, /* controlar la edición*/
    };

    setTodos([...todos, newTodo]);
    setText(""); 
  };

  /*funcion borrar tareas*/
  function deleteTodo(id) {
    const filteredTodos = todos.filter((tarea) => tarea.id !== id);
    setTodos(filteredTodos);
  }
/*funcion que cambia de estado las tareas*/
  function changeComplete(event, id) {
    const newTodos = todos.map((tarea) => {
      if (tarea.id !== id) {
        return tarea;
      } else {
        tarea.completed = event.target.checked;
        return tarea;
      }
    });
    setTodos(newTodos);
  }
/*funcion eliminar tareas completadas*/
  function deleteCompleted() {
    const filteredTodos = todos.filter((tarea) => !tarea.completed);
    setTodos(filteredTodos);
  }

  function toggleEditing(id) {
    const newTodos = todos.map((tarea) => {
      if (tarea.id === id) {
        tarea.editing = !tarea.editing;
      }
      return tarea;
    });
    setTodos(newTodos);
  }
/*actualizarr*/
  function updateTodoText(id, newText) {
    const newTodos = todos.map((tarea) => {
      if (tarea.id === id) {
        tarea.titulo = newText;
        tarea.editing = false; // Después de actualizar, sale del modo de edición
      }
      return tarea;
    });
    setTodos(newTodos);
  }

  useEffect(() => {
    const recoveredTodosJson = localStorage.getItem("todos");
    if (recoveredTodosJson) {
      const recoveredTodos = JSON.parse(recoveredTodosJson);
      setTodos(recoveredTodos);
    }
  }, []);

  useEffect(() => {
     /*if (todos.length > 0){ => si elimino la ultima y recargo no se elimina*/  
    const jsonTodos = JSON.stringify(todos);
    localStorage.setItem("todos", jsonTodos);
  }, [todos]);

  return (
    <>
      <ul>
        {todos.map((tarea) => (
          <Todo
            key={tarea.id}
            {...tarea}
            deleteTodo={deleteTodo}
            handleChange={changeComplete}
            toggleEditing={toggleEditing}
            updateTodoText={updateTodoText}
          />
        ))}
      </ul>
      <Form handleChange={changeText} handleSubmit={addTodo} value={text} />
      <Button text={"Eliminar tareas completadas"} handleClick={deleteCompleted} />
    </>
  );
}

export default TodoList;
