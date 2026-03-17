import useTodos from "../hooks/useTodos";

export interface ITodo {
  title: string;
  id: string;
  desc: string;
  isCompleted: boolean;
  isUpdated: boolean;
}

interface ITodoComp extends ITodo {
  setTodos : React.Dispatch<React.SetStateAction<ITodo[] | null>>;
  handleUpdateTodo : () => void;
}

export const Todo: React.FC<ITodoComp> = ({
  title,
  id,
  desc,
  handleUpdateTodo
}) => {
  const {deleteTodo} = useTodos();
  return (
    <li key={id}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button type="button" onClick={() => deleteTodo(id)}>
        delete
      </button>
      <button type="button" onClick={handleUpdateTodo}>update</button>
      <input type="checkbox" />
    </li>
  );
};
