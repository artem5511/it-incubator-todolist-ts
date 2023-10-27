import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodoListsAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {AppRootStateType} from './state/store';
import {useDispatch, useSelector} from 'react-redux';
import {TodolistWithRedux} from './TodolistWithRedux';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    // function removeTask(id: string, todolistId: string) {
    //     dispatch(removeTaskAC(id, todolistId))
    // }
    //
    // function addTask(title: string, todolistId: string) {
    //     dispatch(addTaskAC(title, todolistId))
    // }
    //
    // function changeFilter(value: FilterValuesType, todolistId: string) {
    //     dispatch(changeFilterAC(todolistId, value))
    // }
    //
    // function changeStatus(id: string, isDone: boolean, todolistId: string) {
    //     dispatch(changeTaskStatusAC(id, isDone, todolistId))
    // }
    //
    // function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //     dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    // }
    //
    // function removeTodolist(id: string) {
    //     dispatch(removeTodoListsAC(id))
    //     // dispatchToTasks(action)
    // }
    //
    // function changeTodolistTitle(id: string, title: string) {
    //     dispatch(changeTodolistTitleAC(id, title))
    // }

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    // let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])

    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    // // let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    // //     [todolistId1]: [
    // //         {id: v1(), title: "HTML&CSS", isDone: true},
    // //         {id: v1(), title: "JS", isDone: true}
    // //     ],
    // //     [todolistId2]: [
    // //         {id: v1(), title: "Milk", isDone: true},
    // //         {id: v1(), title: "React Book", isDone: true}
    // //     ]
    // // })
    const dispatch = useDispatch()

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            // let allTodolistTasks = tasks[tl.id];
                            // let tasksForTodolist = allTodolistTasks;
                            //
                            // if (tl.filter === "active") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            // }

                            return <Grid key={tl.id} item>
                                <Paper elevation={5} style={{padding: '20px'}}>
                                    <TodolistWithRedux
                                        todolist={tl}
                                        />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
