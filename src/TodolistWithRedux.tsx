import React, {ChangeEvent} from 'react';
import {FilterValuesType, TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {Delete} from '@material-ui/icons';
import {SuperCheckbox} from './SuperCheckbox';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {changeFilterAC, changeTodolistTitleAC, removeTodoListsAC} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
   todolist: TodolistType
}

export function TodolistWithRedux({todolist}: PropsType) {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const removeTodolist = () => {
        dispatch(removeTodoListsAC(id));
    }
    const changeTodolistTitle = (title: string) => {
     dispatch(changeTodolistTitleAC(title,id));
    }

    const onAllClickHandler = () => dispatch(changeFilterAC(id, 'all'));
    const onActiveClickHandler = () => dispatch(changeFilterAC(id, 'active'));
    const onCompletedClickHandler = () => dispatch(changeFilterAC(id, 'completed'));

    const changeStatusHandler=(tID: string, checked: boolean)=>{
       dispatch(changeTaskStatusAC(tID, checked, id));
    }

    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () =>   dispatch(removeTaskAC(t.id, id));
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue,id));
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                        {/*<Checkbox  defaultChecked onChange={onChangeHandler} checked={t.isDone} />*/}
                        <SuperCheckbox isDone={t.isDone} callBack={(checked)=>changeStatusHandler(t.id, checked)}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={filter === 'all' ? "outlined": "contained"} color="success" onClick={onAllClickHandler}>All</Button>
            <Button variant={filter === 'active' ? "outlined": "contained"} color="error"   onClick={onActiveClickHandler}>Active</Button>
            <Button variant={filter === 'completed' ? "outlined": "contained"} color="secondary"  onClick={onCompletedClickHandler}>Completed</Button>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}


