import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {Simulate} from 'react-dom/test-utils';
import change = Simulate.change;
import {AddTodoListACType} from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListACType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistsId]:state[action.todolistsId].filter(t=> t.id !== action.tasksId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistsId]:[{id: v1(), title: action.title, isDone: false}, ...state[action.todolistsId]]
            }
        case 'CHANGE-STATUS-TASK':
            return {
                ...state,
                [action.todolistsId]:state[action.todolistsId]
                    .map(t=> t.id === action.tasksId ? {...t, isDone: action.isDone}: t)
            }
        case 'CHANGE-TITLE-TASK':
            return {
                ...state,
                [action.todolistsId]:state[action.todolistsId]
                    .map(t=> t.id === action.tasksId ? {...t, title: action.title}: t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]:[]
            }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (tasksId: string, todolistsId: string) => {
    return {type: 'REMOVE-TASK', todolistsId, tasksId} as const
}
export const addTaskAC = (title: string, todolistsId: string) => {
    return {type: 'ADD-TASK', title, todolistsId} as const
}
export const changeTaskStatusAC = (tasksId: string, isDone: boolean, todolistsId: string) => {
    return {type: 'CHANGE-STATUS-TASK', tasksId, isDone, todolistsId} as const
}

export const changeTaskTitleAC = (tasksId: string, title: string, todolistsId: string) => {
    return {type: 'CHANGE-TITLE-TASK', tasksId, title, todolistsId} as const
}



