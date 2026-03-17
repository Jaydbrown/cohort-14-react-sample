import { useCallback, useState } from "react";
import type { ITodo } from "../components/todo";

const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTodoId, setUpdateTodoId] = useState("");

  const createTodo = useCallback(() => {
    if (!title || !desc) {
      return;
    }
    if (isUpdating) {
      if (updateTodoId == "") return;
      if (!todos) return;
      const updatedTodos = todos.map((ele) => {
        if (ele.id === updateTodoId) {
          ele.title = title;
          ele.desc = desc;
          ele.isUpdated = true;
        }
        return ele;
      });
      setTodos(updatedTodos);
      setIsUpdating(false);
      setUpdateTodoId("");
      resetFormValues();
      return;
    }

    const formBody: ITodo = {
      title: title.trim(),
      desc: desc.trim(),
      isCompleted: false,
      isUpdated: false,
      id: `${todos?.length}${title}`,
    };
    resetFormValues();
    if (!todos) {
      setTodos([formBody]);
      return;
    }
    setTodos([...todos, formBody]);
  }, []);

  const updateTodo = useCallback((id: string) => {
    if (!todos) return;
    const todo = todos.find((ele) => ele.id == id);
    if (!todo) return;
    if (todo.isCompleted) return;
    setTitle(todo.title);
    setDesc(todo.desc);
    setIsUpdating(true);
    setUpdateTodoId(id);
  }, []);

  const deleteTodo = useCallback((id: string) => {
    if (!todos) {
      return;
    }
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredTodos);
  }, []);

  const resetFormValues = () => {
    setTitle("");
    setDesc("");
  };

  //  createTodo, updateTodo, deleteTodo
  return {
    todos,
    setTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    title,
    desc,
    setTitle,
    setDesc,
    isUpdating,
    setIsUpdating,
    updateTodoId,
    setUpdateTodoId,
  };
};

export default useTodos;
