import React from "react";


export default function Paginado({PokemonPerPage,allPokemons,paginado}){
    const pageNumber=[]

    for(let i=1; i<=Math.ceil(allPokemons/PokemonPerPage);i++){
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul>
                {pageNumber && 
                pageNumber.map(number=>(
                    <li key={number}>
                    <a href='http://localhost:3000/home/#Paginas' onClick={()=>paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


