import {TodolistType} from '../App';

export const todolistsReducer= (state: Array<TodolistType>, action: { id: string; type: string }):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state
        }
        default:return state
    }
}

type TodolistsReducerType=RemoveTodolistACType
type RemoveTodolistACType=ReturnType<typeof removeTodoListsAC>
export const removeTodoListsAC=(id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }

    }as const
}