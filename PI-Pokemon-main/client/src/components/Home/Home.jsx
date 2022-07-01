import React, { Component } from 'react';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { filterByCreated, getPokemons, orderByAttack, orderByName, orderByType } from '../../actions';
import {Link} from 'react-router-dom'
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';


export default function Home(){
    const dispatch= useDispatch()
    const allPokemons=useSelector((state)=>state.pokemons)
    const [orden,setOrden]=useState('')
    const [currentPage,setCurrentPage]=useState(1)
    const [PokemonPerPage,setPokemonPerPage]=useState(12)
    const lastPokemonPage= currentPage*PokemonPerPage //12
    const firstPokemonPage=lastPokemonPage-PokemonPerPage //0
    const currentPokemon= allPokemons.slice(firstPokemonPage,lastPokemonPage)
    

    const paginado=(pageNumber)=>{
        
        setCurrentPage(pageNumber)
        
    }


    useEffect(()=>{
        dispatch(getPokemons())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }
    function handleCreated(e){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
    }
    function handleOrder(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Orden ${e.target.value}`)
    }
    function handleAttack(e){
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1)
        setOrden(`Ataque ${e.target.value}`)
    }
    function handleType(e){
        e.preventDefault()
        dispatch(orderByType(e.target.value))
    }
    return(
        <div id='Paginas'>
            <Link to ='/pokemons'>Crear Pokemon</Link>
            <h1>POKEMONS</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los pokemones
            </button>
            <SearchBar/>
            <div className='contenedor'>
                <select onChange={e=>handleOrder(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='des'>Descendente</option>
                </select>
                <select onChange={e=>handleType(e)}>
                    <option value="All">All</option>
                    <option value="grass">Grass</option>
                    <option value="poison">Poison</option>
                    <option value="fire">Fire</option>
                    <option value="flying">Flying</option>
                    <option value="water">Water</option>
                    <option value="bug">Bug</option>
                    <option value="normal">Normal</option>
                    <option value="electric">Electric</option>
                    <option value="ground">Ground</option>
                    <option value="fairy">Fairy</option>
                </select>
                <select onChange={e=>handleCreated(e)}>
                    <option value="todos">Todos</option>
                    <option value="created">Creados</option>
                    <option value="existente">Existente</option>
                </select>
                <select onChange={e=>handleAttack(e)}>
                    <option value="maymen">Menor poder de ataque</option>
                    <option value="menmay">Mayor poder de ataque</option>

                </select>
            
                {
                    currentPokemon?.map((c,i)=>{ 
                        return(
                            <div className='contenedor-carta'>
                                <Card  
                                key={i} 
                                id={c.id}
                                name={c.name} 
                                types={c.types}
                                image={c.img?c.img:c.image} 
                                /> 

                            </div>
                            )
                        })
                        }
                    <Paginado
                    PokemonPerPage={PokemonPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                    />
            </div>
        </div>
    )
}