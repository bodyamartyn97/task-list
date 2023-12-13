import { useEffect, useState } from "react";
import List from "./List";
import { v4 as uuidv4 } from 'uuid';

function Main() {

    const [visible, setVisible] = useState(true);
    const [tasks, setTasks] = useState(() => {
        const storedTodos = localStorage.getItem('tasks');
        if (!storedTodos) {
            return []
        } else {
            return JSON.parse(storedTodos);
        }
    });
    const [taskTitle, setTaskTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = (e) => {
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        if (e.key === 'Enter' && e.target.value !== '') {
            setTasks([
                ...storedTodos, {
                    id: uuidv4(),
                    title: taskTitle,
                    status: false
                }
            ])
            setTaskTitle('');
            setVisible(true);
        }
    }

    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "Novebmer", "December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const onChangeHandler = (e) => {
        setTaskTitle(e.target.value);

        if (e.target.value !== '') {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }
    return (
        <div className="container">
            <h1>Note your Tasks</h1>
            <span>{`${month} ${day}, ${year}`}</span>
            <div className="input-field">
                <input
                    type="text"
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={addTask}
                />
                {visible && <label>Task Name</label>}
            </div>
            <List tasks={tasks} />
        </div>
    )
}

export default Main;