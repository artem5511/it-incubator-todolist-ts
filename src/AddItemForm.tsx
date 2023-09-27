import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
        maxHeight: '30',
        minWidth: '30px',
       minHeight: '30px',
        backgroundColor: 'purple'
    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
                id="outlined-basic"
                label="Outlined"
                variant="outlined" />
        {/*<button onClick={addTask}>+</button>*/<Button size='small' variant="contained" color="primary" style={buttonStyle} onClick={addTask}>
              +
            </Button>

            {error && <div className="error-message">{error}</div>}
        </div>
    )
};
