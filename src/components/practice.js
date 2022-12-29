import React, {  useReducer } from 'react'
import { useCallback } from 'react';
import { useState } from 'react'
import { Global } from './context';

const reducer = (state,action) => {
    if(action.type==="INCREMENT"){return state+1}
    if(action.type=== "CHANGE"){ return !state}
    return state;

}
const initialState = 0;

function Practice() {
    // const[count, setCount] = useState(0);
    // const [state, setState] = useState(true);

    // const inc = () => {
    //     setCount(count +1);
    // }

    
    // const chng =  useCallback(()=>{

    //         setState(!state);

    //     },[state]);


        
        const {name,age} = Global();

        const [state,dispatch]=useReducer(reducer, initialState);

  return (
    <>
    <div>count {state}</div>
    <button onClick={()=>dispatch({type:"INCREMENT"})}>+</button>
    <br />
    <div>{state ? "true":"false"}</div>
    <button onClick={()=>dispatch({type:"CHANGE"})}>change</button>
    <div> Name:{name},   Age:{age}</div>

    <form action="">
            <label htmlFor="">Username</label><br />
        <input type="text" id='username'/><br />
        <label htmlFor="">Password</label><br />
        <input type="text" id='password' /><br />
        <input type="submit" />
    </form>    
    </>
    
  )
}

export default Practice