import { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

interface FetchTodoResponse {
  message: string;
  todos: Todo[];
}

interface createTodoResponse {
  message: String;
  todo: Todo;
}

function Home() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const res = await axios.get<FetchTodoResponse>(
          "http://localhost:3000/todo/fetch",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(res.data);
        setTodo(res.data.todos);
      } catch (error: unknown) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, []);

  const createTodo = async () => {
    try {
      const response = await axios.post<createTodoResponse>(
        "http://localhost:3000/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      setTodo((todo) => [...todo, response.data.todo]);
      setNewTodo("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const updateTodo = async (id: string) => {
    const selected = todo.find((t) => t._id === id);
    if (!selected) return;
    try {
      const response = await axios.put(
        `http://localhost:3000/todo/update/${id}`,
        {
          ...selected,
          completed: !selected.completed,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      setTodo((prev) =>
        prev.map((t) => (t._id === id ? response.data.todo : t)),
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    const selected = todo.find((t) => t._id === id);
    if (!selected) return;
    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/delete/${id}`,
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      setTodo((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="my-8 mx-6 p-6 sm:mx-auto bg-gray-100 max-w-lg lg:max-w-lg rounded-lg shadow-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-center">To-Do</h2>
        <div className="flex justify-between">
          <input
            className="grow p-2 focus:outline-none border rounded-l-md"
            placeholder="Add new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createTodo()}
          />
          <button className="text-white text-sm  bg-blue-600 rounded-r-md border focus:outline-none hover:bg-blue-900 py-1 px-4" onClick={createTodo}>Add</button>
        </div>
        <ul className="space-y-2">
          <li className="flex justify-between
          ">
            <div className="py-2">
              <input className="focus:outline-none w-3 h-3" type="checkbox"></input>
              <span className="pl-2 text-md text-blue-400">Hello</span>
            </div>
            <button className="bg-white px-4 py-1 rounded-md text-red-500 hover:text-red-600">Delete</button>
          </li>
        </ul>
        <p className="text-md mx-auto my-2 text-gray-700">0 Todo Remaining</p>
        <button className="bg-red-400 mx-auto px-3 py-1 rounded-md text-white hover:bg-red-500 ">Logout</button>
      </div>
    </div>
  );
}

export default Home;
