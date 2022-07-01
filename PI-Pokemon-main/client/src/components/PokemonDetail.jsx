import React from "react";
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { pokemonDetail } from "../actions/index";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function PokemonDetail(){
    const dispatch=useDispatch()
    const myPokemon=useSelector((state)=>state.detail)
    const {id}=useParams()

    useEffect(()=>{
        dispatch(pokemonDetail(id))
    },[dispatch])

    
    return(
        <div>
            {
                myPokemon.length>0 ? 
                <div>
                    <h1>{myPokemon[0].name}</h1>
                    <img src={myPokemon[0].img?myPokemon[0].img:myPokemon[0].image} alt='imagen no encontrada'/>
                    <h4>{!myPokemon[0].createInDb?myPokemon[0].types + ' ': myPokemon[0].types.map(el=>el.name + (' '))}</h4>
                    <h5>Vida: {myPokemon[0].vida}</h5>
                    <h5>Ataque: {myPokemon[0].ataque}</h5>
                    <h5>Velocidad: {myPokemon[0].velocidad}</h5>
                    <h5>Altura: {myPokemon[0].altura}</h5>
                    <h5>Peso: {myPokemon[0].peso}</h5>

                </div>
                : <p>Loading...</p>
            }
            <Link to ='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )

    
}