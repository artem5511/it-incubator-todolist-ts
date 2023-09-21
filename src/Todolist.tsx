import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    callback: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(props.todolistID, title.trim());
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    // const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    // const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    // const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilter(props.todolistID,filter)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const addTaskHandler = (title: string) => {
        props.callback(props.todolistID,title)
    }
    const updateTodolistTitle = (newTitle: string) => {
        props.updateTodolistTitle(props.todolistID,newTitle)
    }
    const updateTaskHandler = (title: string) => {
        props.updateTask(props.todolistID, title, taskId.string)
    }
    return <div>
        <h3>
            <EditableSpan oldtitle={props.title} callback={updateTodolistTitle}/>
            <button onClick={removeTodolistHandler}>X</button>
        </h3>
        <AddItemForm callback={addTaskHandler}/>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan oldtitle={props.title} callback={updateTaskHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={handlerCreator("all")}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={handlerCreator("active")}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={handlerCreator("completed")}>Completed
            </button>
        </div>
    </div>
}
