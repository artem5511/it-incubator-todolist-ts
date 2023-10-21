import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {Simulate} from 'react-dom/test-utils';
import change = Simulate.change;
import {AddTodoListACType} from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListACType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistsId]: state[action.todolistsId].filter(t => t.id !== action.tasksId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistsId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistsId]]
            }
        case 'CHANGE-STATUS-TASK':
            return {
                ...state,
                [action.todolistsId]: state[action.todolistsId]
                    .map(t => t.id === action.tasksId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TITLE-TASK':
            return {
                ...state,
                [action.todolistsId]: state[action.todolistsId]
                    .map(t => t.id === action.tasksId ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLISTS' : {
            // let copyState = {...state}
            // delete copyState[action.id]
            // return copyState
            let {[action.id]:[], ...rest} = state
            return rest
        }

        default:
            return state
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

export const RemoveTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLISTS', id} as const
}


