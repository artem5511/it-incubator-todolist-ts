import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {Simulate} from 'react-dom/test-utils';
import change = Simulate.change;

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

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



