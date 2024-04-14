
import React, { useState } from "react";
import "../styles.css"; 
import Button from "./Button";

function Todo({ titulo, id, completed, editing, deleteTodo, handleChange, toggleEditing, updateTodoText }) {
  const [newText, setNewText] = useState(titulo);

  const handleInputChange = (event) => {
    setNewText(event.target.value);
  };

  const handleUpdateClick = () => {
    updateTodoText(id, newText);
  };

  return (
    <li style={{ display: "flex" }}>
      {!editing ? (
        <>
          <input type="checkbox" onChange={(event) => handleChange(event, id)} checked={completed} />
          <p style={{ textDecoration: completed ? "line-through" : "none" }}>{titulo}</p>
          <Button text={"Editar tarea"} handleClick={() => toggleEditing(id)} />
          <Button text={"Eliminar"} handleClick={() => deleteTodo(id)} />
        </>
      ) : (
        <>
          <input type="text" value={newText} onChange={handleInputChange} />
          <Button text={"Actualizar"} handleClick={handleUpdateClick} />
        </>
      )}
    </li>
  );
}

export default Todo;
