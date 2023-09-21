import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldtitle: string
    callback: (newTitle:string) => void
}
export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.oldtitle)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    console.log(newTitle)

    const editHandler = () => {
        setEdit(!edit)
        if(edit) {
            props.callback(newTitle)
        }
    }


    // const editHandler2 = () =>{
    //     setEdit(false)
    // }
    // const updateTitle =() => {
    //    props.callback(newTitle)
    // }

    return (
        edit
            ? <input value={newTitle} onBlur={editHandler} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldtitle}</span>
    );
};
