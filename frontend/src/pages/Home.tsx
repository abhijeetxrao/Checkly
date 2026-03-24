import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

const api_url = "https://checkly-backend-lnx5.onrender.com/"

function Home() {

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [todo, setTodo] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const res = await axios.get<FetchTodoResponse>(
          `${api_url}/todo/fetch`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(res.data);
        setTodo(res.data.todos);
        setError(null);
      } catch (error: unknown) {
        setLoading(true);
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, []);

  const createTodo = async () => {
    if(!newTodo.trim()) return;
    try {
      const response = await axios.post<createTodoResponse>(
        `${api_url}/todo/create`,
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
      setLoading(true)
        setError("Failed to create todo!");
      
    }
  };

  const updateTodo = async (id: string) => {
    const selected = todo.find((t) => t._id === id);
    if (!selected) return;
    try {
      const response = await axios.put(
        `${api_url}/todo/update/${id}`,
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
 
        setError("Failed to update todo!");
      
    }
  };

  const deleteTodo = async (id: string) => {
    const selected = todo.find((t) => t._id === id);
    if (!selected) return;
    try {
      const response = await axios.delete(
        `${api_url}/todo/delete/${id}`,
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      setTodo((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setLoading(true)
        setError("Failed to delete todo!");
      
    }
  };

    const logout = async () => {
    try {
      await axios.get(`${api_url}/auth/logout`, {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo('/');
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todo.filter((todo) => !todo.completed).length;

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
        {loading? <p className="text-red-500 font-semibold text-center">{error}</p>:
        (<ul className="space-y-2">
          {todo.map((t, index)=>(
            <li key={t._id||index} className="flex justify-between
          ">
            <div className="py-2">
              <input className="focus:outline-none w-3 h-3" type="checkbox" defaultChecked={t.completed} onClick={()=> updateTodo(t._id)}></input>
              <span className={t.completed?"line-through pl-2 text-md text-blue-400":"pl-2 text-md text-blue-400"}>{t.text}</span>
            </div>
            <button className="bg-white px-4 py-1 rounded-md text-red-500 hover:text-red-600" onClick={() => deleteTodo(t._id)}>
              Delete
            </button>
          </li>
          ))}
          
        </ul>)}
        <p className="text-md mx-auto my-2 text-gray-700">{remainingTodos} Todo Remaining</p>
        <button onClick={logout} className="bg-red-400 mx-auto px-3 py-1 rounded-md text-white hover:bg-red-500 ">Logout</button>
      </div>
    </div>
  );
}

export default Home;
