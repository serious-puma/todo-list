function TodoItem({ todo , onToggle , onDelete}) {
    return (
    <li>
        <span onClick={() => onToggle(todo.id)} //pass id to inform parent toggleTodo function which task to update
        style={{
            textDecoration: todo.completed ? "line-through":"none",
            cursor: "pointer",
            marginRight: "2rem"
        }}
        >
        {todo.text}
        </span>
        <button 
            onClick={() => onDelete(todo.id)
            }
        >
            Delete
        </button>
    </li>
  );
}

export default TodoItem;