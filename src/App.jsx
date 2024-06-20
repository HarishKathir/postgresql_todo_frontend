import "./App.css";
import React, {useState , useEffect} from "react";
import axios from 'axios';
import TodoItem from './todoItem';
import AddTodo from './addtodo';

function App() {

  const [todos,setTodos] = useState([]);

  useEffect(() => {
    fetchtodos();
  },[]);

  const fetchtodos = async() => {
    try {
      const response = await axios.get('http://localhost:5002/todos');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const addTodo = async (description) => {
    try {
      const response = await axios.post('http://localhost:5002/todos', { description });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`http://localhost:5002/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodo addTodo={addTodo} />
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default App;
