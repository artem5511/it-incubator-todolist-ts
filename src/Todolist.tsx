import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import {Delete} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

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

function DeleteIcon() {
    return null;
}

export function Todolist(props: PropsType) {

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

    return <div>
        <h3>
            <EditableSpan oldtitle={props.title} callback={updateTodolistTitle}/>
            {/*<button onClick={removeTodolistHandler}>X</button>*/}
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <Delete />
            </IconButton>
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

                    const updateTaskHandler = (newTitle: string) => {
                        props.updateTask(props.todolistID, t.id, newTitle)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*       checked={t.isDone}/>*/}
                        {/*<span>{t.title}</span>*/}
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeHandler}
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />



                        <EditableSpan oldtitle={t.title} callback={updateTaskHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="primary"  onClick={handlerCreator("all")}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="secondary" onClick={handlerCreator("active")}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained" }  color="inherit" onClick={handlerCreator("completed")}>Completed</Button>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={handlerCreator("all")}>All*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={handlerCreator("active")}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={handlerCreator("completed")}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}
