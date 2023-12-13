import { useState } from "react"

export default function Item({ id, title, status }) {

    const [checked, setChecked] = useState(status);
    const [visible, setVisible] = useState(true);

    const removeElement = () => {
        setVisible(prev => !prev);
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        let removeTodos = storedTodos.filter(item => {
            if (item.id !== id) {
                return true;
            } else {
                return false;
            }
        })

        localStorage.setItem('tasks', JSON.stringify(removeTodos))
    }
    const classes = ['todo'];

    if (checked) {
        classes.push('status');
    }

    const updateStatus = () => {
        setChecked(!checked);
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        storedTodos.map(item => {
            if (item.id === id) {
                item.status = !checked;
            }
            return true;
        })

        localStorage.setItem('tasks', JSON.stringify(storedTodos));
    }

    return (
        <>
            {visible && (
                <li className={classes.join(' ')}>
                    <label>
                        <input type="checkbox" checked={checked} onChange={updateStatus} />
                        <span>{title}</span>
                        <i onClick={removeElement} className="material-icons red-text">X</i>
                    </label>
                </li>
            )}
        </>
    )
}