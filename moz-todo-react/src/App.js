import React, {useState} from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo"
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All : () => true,
  Active : (task) => !task.completed,
  Completed: (task) => task.completed,  
}
const FILTER_NAMES = object.keys(FILTER_MAP)

function App(props) {
  const [filter, setFilter] = useState("All")

  const [tasks, setTasks] = useState(props.tasks)

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id)
    setTasks(remainingTasks)
  }

  function editTask(id, newName){
    const editTaskList = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name:newName}
      }
      return task
    })
    setTasks(editTaskList)
  }

  const taskList = tasks.map((task) => (
  <Todo 
  id={task.id} 
  name={task.name} 
  completed={task.completed} 
  key={task.id}
  toggleTaskCompleted = {toggleTaskCompleted}
  deleteTask = {deleteTask}
  editTask = {editTask}
  />)
  )

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false}
    setTasks([...tasks, newTask])
  }

  const taskNoun = taskList.length !== 1 ? "tasks" : "task"

  const headingText = `${taskList.length} ${taskNoun} remaining`

  

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton/>
        <FilterButton/>
        <FilterButton/>
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;