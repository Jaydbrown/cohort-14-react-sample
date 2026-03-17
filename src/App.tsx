import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Todo, type ITodo } from "./components/todo";
import useTodos from "./hooks/useTodos";

// hooks => useState, useCallBack, useMemo, useContext, useEffect , useRef
// addTodo, deleteTodo, updateTodo, markTodoAsComplete, searchTodo
// custom hooks

function App() {
  const {
    title,
    desc,
    setTitle,
    setDesc,
    todos,
    setTodos,
    isUpdating,
    createTodo,
    updateTodo
  } = useTodos();

  const handleTodoCreation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo()
  };

  // const handleDelete =(id : string)=> {
  //   if(!todos){
  //     return;
  //   }
  //   const filteredTodos = todos.filter((todo) => {
  //     return todo.id !== id
  //   });
  //   setTodos(filteredTodos);
  // }

  return (
    <>
      <h1>Todos</h1>

      <form onSubmit={handleTodoCreation}>
        <input
          type="text"
          placeholder="title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <input
          type="text"
          placeholder="type in your description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDesc(e.target.value)
          }
          value={desc}
        />

        <button type="submit">
          {isUpdating ? "Update Todo" : "Create todo"}
        </button>
      </form>

      <ul>
        {todos &&
          todos.map((todo) => (
            <Todo
              key={todo.id}
              // title={todo.title}
              // id={todo.id}
              // desc={todo.desc}
              // isCompleted={todo.isCompleted}
              // isUpdated={todo.isUpdated}
              {...todo}
              setTodos={setTodos}
              handleUpdateTodo={() => updateTodo(todo.id)}
            />
          ))}
      </ul>
      {/* <ul>
        <li>
          <p>{todos && todos[0].title}</p>
        </li>
        <li>
          <p>{todos && todos[1].title}</p>
        </li>
      </ul> */}
    </>
  );
}

export default App;
