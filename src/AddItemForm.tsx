import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    // console.log('AddItemForm')

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    const buttonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
    }

    return <div>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""*/}
        {/*}*/}
        {/*/>*/}
        <TextField
            id="outlined-basic"
            label={error ? error : "Type smth..."  }
            size="small"
            variant="outlined"
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
        />
        {/*<button onClick={addItem}>+</button>*/}
        <Button size="small" variant="contained" onClick={addItem} style={buttonStyle}>+</Button>

        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
})
