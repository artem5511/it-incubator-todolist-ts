import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';

//если автоматом, то тянет всю библиотеку и тормозить будет
// import Button from '@mui/material/Button';
//лучше так

type PropsType = {
    callback: (title: string) => void
}
export const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.callback(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const buttonStyle = {
        maxWidth: '30px',
        maxHeight: '20px',
        minWidth: '15px',
        minHeight: '15px',
        backgroundColor: 'purple'
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            {/*<button onClick={addTask}>+</button>*/}
            <Button size='small' variant="contained" onClick={addTask} style={buttonStyle}>+</Button>

            {error && <div className="error-message">{error}</div>}
        </div>
    )
};
