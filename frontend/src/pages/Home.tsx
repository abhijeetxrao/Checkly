import {useState, useEffect} from 'react'
import axios from 'axios'

function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(()=>{
    const fetchTodo = async ()=>{
      try {
        setLoading(true)
        const res = await axios.get('http://localhost:3000/todo',{
          withCredentials:true,
          headers:{
            'Content-Type':'application/json'
          }
        })
        console.log(res.data);
        setTodo(res.data);
      } catch (error:String) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
      }
      fetchTodo();
    },[])


  
  return (

    <div>Home</div>
  )
}

export default Home