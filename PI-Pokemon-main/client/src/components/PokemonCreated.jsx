import React,{useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getTypes, postPokemon } from "../actions";



function validate (input){
    let errors={}
    if(!input.name){
        errors.name= 'Se requiere un Nombre'
    }
    return errors
}

export default function PokemonCreated(){
    const dispatch=useDispatch()
    const types=useSelector((state)=>state.types)
    const history=useHistory()
    const [errors,setErrors]=useState({})

    const [input,setInput]=useState({
        name:"",
        vida:"",
        ataque:"",
        defensa:"",
        velocidad:"",
        altura:"",
        peso:"",
        img:"",
        types:[]
    })

    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
        console.log(input)
    }

    function handleSelect(e){
        e.preventDefault()
        setInput({
            ...input,
            types:[...input.types,e.target.value]
        })
    }

    function handleDelete(e){
        setInput({
            ...input,
            types:input.types.filter(t=>t!==e)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postPokemon(input))
        alert('Pokemon Creado!!')
        setInput({
            name:"",
            vida:"",
            ataque:"",
            defensa:"",
            velocidad:"",
            altura:"",
            peso:"",
            img:"",
            types:[]
        })
        console.log(input)
        history.push('/home')
    }

    useEffect(()=>{
        dispatch(getTypes())
    },[dispatch])

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Creá tu Pokemon</h1>
            <form onSubmit={e=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name='name' onChange={e=>handleChange(e)}/>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Vida:</label>
                    <input type="text" value={input.vida} name='vida' onChange={e=>handleChange(e)}/>
                </div>
                <div>
                    <label>Ataque:</label>
                    <input type="text" value={input.ataque} name='ataque' onChange={e=>handleChange(e)}/>
                </div>
                <div>
                    <label>Defensa:</label>
                    <input type="text" value={input.defensa} name='defensa' onChange={e=>handleChange(e)}/>
                </div>
                <div>
                    <label>Velocidad:</label>
                    <input type="text" value={input.velocidad} name='velocidad' onChange={e=>handleChange(e)}/>
                </div>
                <div>
                    <label>Altura:</label>
                    <input type="text" value={input.altura} name='altura' onChange={e=>handleChange(e)}/>
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="text" value={input.peso} name='peso' onChange={e=>handleChange(e)}/>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text" value={input.img} name='img' onChange={e=>handleChange(e)}/>
                </div>
                <select onChange={e=>handleSelect(e)}>
                    {
                        types.map((t,i)=>(
                            <option key={i} value={t.id}>{t.name}</option>
                        ))
                    }
                </select>
                <button type="submit">Crear Pokemon</button>

            </form>
            {input.types.map((el,i)=>
                <div key={i}>
                    <button onClick={()=>handleDelete(el)}>x</button>
                    <p>{el}</p>
                </div>
                )}
        </div>
    )
}