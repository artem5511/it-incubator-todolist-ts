import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldtitle: string
    callback: (newTitle:string) => void
}
export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState<string>(props.oldtitle)
    console.log(newTitle)

    const editHandler = () => {
        setEdit(!edit)
        if(edit) {
            updateTitle()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    // const editHandler2 = () =>{
    //     setEdit(false)
    // }
    const updateTitle = () => {
       props.callback(newTitle)
    }
    return (
        edit
            ? <input value={newTitle} onBlur={editHandler} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldtitle}</span>
    );
};
