const { Router } = require('express');
const router = Router();
const axios =require('axios');
const { getAllPokemons } = require('./functions');
const {Pokemon,Type}=require('../db')

router.get('',async(req,res)=>{
    const name=req.query.name
    let pokemonsTotal=await getAllPokemons()
    if(name){
        let pokemonName=await pokemonsTotal.filter(el=> el.name.toLowerCase().includes(name.toLowerCase()))
        pokemonName.length?
        res.status(200).send(pokemonName):
        res.status(404).send("No se encontro un pokemon con ese nombre, lo siento")
    }
    else{
        res.status(200).send(pokemonsTotal)
    }
})
router.post('/',async(req,res)=>{
    const {
        name,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        img,
        types,
    }=req.body
    console.log(req.body)

        const pokemon=await Pokemon.create({
            name: name.toLowerCase(),
            vida,
            ataque,
            defensa,
            velocidad,
            altura,
            peso,
            img,
        })
        let tipos=await Type.findAll({
            where:{name:types}
        })

        await pokemon.addTypes(tipos)
        
        res.send('Pokemon creado correctamente')

})
router.get('/:id',async(req,res)=>{
    const {id}=req.params
    let pokemon=await getAllPokemons()
    if(id){
        let pokemonId=await pokemon.filter(el=>el.id==id)
        pokemonId.length?
        res.status(200).json(pokemonId):
        res.status(404).send('No se encontro ese personaje')
    }
})
module.exports = router;