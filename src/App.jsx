import { useState , useEffect } from 'react'
import './styles/App.css'
import TodoItem from './components/TodoItem'

function App() {
  const [task, setTask] = useState(""); //holds current inputed task
  const [todos, setTodos] = useState([]); //holds all todos
  
  // load todos from local Storage when component first mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    // console.log("raw localStorage:", localStorage.getItem("todos"));
    // console.log("parsed localStorage:", savedTodos);
    if (savedTodos) {
      // console.log("Parsed todos:", savedTodos);
      setTodos(savedTodos);
      // console.log("typeof parsed:", typeof savedTodos);
      // console.log("todos set:", savedTodos);
    }
  }, []); //empty dependency array = only run once on mount

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]); // run this effect to save every time "todos" changes

  // toggleTodo function updates todos
  // passing the id of clicked todo item as parameter
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed }: todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // console.log("Rendering todos:", todos);

  const addTodo = () => { 
    if (!task.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: task.trim(),
      completed: false
    };
    setTodos([...todos, newTodo]);
    setTask(""); //clears input after adding todo
  };


  return (
    <div>
      <h1>To-Do List</h1>
      <input 
        name="todo task"
        placeholder="My next task"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key==="Enter") {
            addTodo()
          }
        }}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem 
            key = {todo.id}
            todo = {todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
