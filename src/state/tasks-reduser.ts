import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {Simulate} from 'react-dom/test-utils';
import change = Simulate.change;

export const tasksReducer = (state: Array<TasksStateType>, action: TodolistsReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST' : {
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            // let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
            return state.map(el => el.id===action.payload.id ? {...el,title:action.payload.title}:el)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return  state.map(el => el.id===action.payload.id ? {...el,filter: action.payload.filter }: el)
        }


        default:
            return state
    }
}

type TodolistsReducerType = RemoveTodolistACType | AddTodoListACType | changeTodolistTitleACType | changeFilterACType
type RemoveTodolistACType = ReturnType<typeof removeTodoListsAC>
export const removeTodoListsAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }

    } as const
}

type AddTodoListACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }

    } as const
}

type  changeTodolistTitleACType=ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC=(id: string, title: string)=> {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, title
        }
    }as const
}

type changeFilterACType=ReturnType<typeof changeFilterAC>
export const changeFilterAC=( id: string, filter: FilterValuesType)=> {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, filter
        }
    }as const
}
