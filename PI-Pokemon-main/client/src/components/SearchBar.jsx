import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { getNamePokemon } from "../actions";

export default function SearchBar(){
    const dispatch=useDispatch()
    const [name,setName]=useState("")

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNamePokemon(name))
    }
    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
    }

    return(
        <div>
            <input type="text" placeholder="Buscar..." onChange={e=>handleInput(e)} />
            <button type="submit" onClick={e=>handleSubmit(e)}>Buscar</button>
        </div>
    )
}