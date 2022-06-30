import React from "react";
import {Link} from 'react-router-dom'


export default function Card({id,name,image,types}){
    
    return(
        <div>
            <Link to={`/home/${id}`}>
            <h3>{name}</h3>
            <img src={image} alt="imagen no encontrada" width="250px"/>
            </Link>
            <div>
                {types.map(t=>t + " ")}
            </div>
                
        </div>
    )
}

