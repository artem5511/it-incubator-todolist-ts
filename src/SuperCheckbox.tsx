import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';

type PropsType={
    isDone:boolean
    callBack: (checked:boolean)=>void
}
export const SuperCheckbox =(props: PropsType)=> {
   const onChangeHandler=(e: ChangeEvent<HTMLInputElement>)=> {
       props.callBack(e.currentTarget.checked)
    }
        return (
            <Checkbox
                onChange={onChangeHandler}
                checked={props.isDone} />
        );
};