import React from "react";
import {Link} from 'react-router-dom'
import "./Card.css"


export default function Card({id,name,image,types}){
    
    return(
        <div className="contenedor-carta">
            <div className="carta">
            <Link to={`/home/${id}`}>
            <h3>{name}</h3>
            <img src={image} alt="imagen no encontrada" width="250px"/>
            </Link>
            <h5>
                {types.map(t=>t + " ")}
            </h5>
            </div>
                
        </div>
    )
}

