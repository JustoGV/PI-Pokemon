const {sequelize, DataTypes}=require('sequelize')
const axios =require('axios')
const {API_KEY}=process.env
const {Pokemon,Type}=require('../db')
const e = require('express')



// const getAllPokemons=async function (){
//     const api=await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
//     const db=await Pokemon.findAll({
//         include:{
//             model: Type,
//             attributes:["name"],
//             through:{
//                 attributes:[]
//             }
//         }
//     })
//     let newDB=db.map(e=>{
//         return {
//             id:e.id,
//             name:e.name,
//             vida:e.vida,
//             ataque:e.ataque,
//             defensa:e.defensa,
//             velocidad:e.velocidad,
//             altura:e.altura,
//             peso:e.peso,
//             types:e.types.map(e=>e.name)
//         }
//     })
//     pokelist=[...pokelist,...newDB]
// }
const getApiInfo=async()=>{
    const pokemonsPromises=[]
    const primeros20= await axios.get('https://pokeapi.co/api/v2/pokemon')
    const segundos20= await axios.get(primeros20.data.next)
    const totalPokemones=primeros20.data.results.concat(segundos20.data.results)
    const infoUrl=totalPokemones.map(e=>axios.get(e.url))
    
    let infoPokemons= await Promise.all(infoUrl)
    .then(values=>{
        let pokemon=values.map(e=>e.data) //info de cada pokemon
        let info=[]
        pokemon.map(el=>{
            info.push({
                id:el.id,
                name: el.name,
                vida:el.stats[0].base_stat,
                ataque:el.stats[1].base_stat,
                defensa:el.stats[2].base_stat,
                velocidad:el.stats[5].base_stat,
                altura:el.height,
                peso:el.weight,
                image:el.sprites.other["official-artwork"].front_default,

                types: el.types.map(e=>e.type.name)
            })
        })
        return info
    })
    return infoPokemons

}
const getDbInfo=async()=>{
    let db= await Pokemon.findAll({
        include:{model: Type,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    })
    let newDB = db.map(e => {
        return {
          id: e.id,
          name: e.name,
          vida: e.vida,
          ataque: e.ataque,
          defensa: e.defensa,
          velocidad: e.velocidad,
          altura: e.altura,
          peso: e.peso,
          createdInDb:e.createdInDb,
          types: e.types.map(e => e.name),
        }
      })
      return newDB
}
const getAllPokemons= async()=>{
    const apiInfo= await getApiInfo()
    const dbInfo= await getDbInfo()
    const infoTotal= apiInfo.concat(dbInfo)
    return infoTotal
}
const TypeApiInfo=async()=>{
    await Type.findAll().then(tipo=>{
        if(tipo.length===0){
            axios.get('https://pokeapi.co/api/v2/type').then(res=>{
                res.data.results.map(el=>{
                   Type.create({
                    name: el.name
                   })
                })
            })
        }
    })
    
}
const TypeDbInfo=async()=>{
    return await Type.findAll({
        attributes: ["name"]
    })
}












module.exports={
    getApiInfo,
    getDbInfo,
    getAllPokemons,
    TypeApiInfo,
    TypeDbInfo
}