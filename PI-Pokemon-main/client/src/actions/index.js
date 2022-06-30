import axios from 'axios';


export function getPokemons(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/pokemons')
        console.log(json.data)
        return dispatch({
         type: 'GET_POKEMONS',
         payload:json.data
        })
    }
}
export function filterByCreated(payload){
    return {
        type:'FILTER_CREATED',
        payload
    }
}
export function orderByName(payload){
    return {
        type:'FILTER_BYNAME',
        payload
    }
}
export function orderByAttack(payload){
    return {
        type:'FILTER_BYATTACK',
        payload
    }
}
export function orderByType(payload){
    console.log(payload)
    return {
        type:'FILTER_BYTYPE',
        payload
    }
}
export function getNamePokemon(name){
    return async function(dispatch){
        try {
            var json=await axios.get('http://localhost:3001/pokemons?name='+ name)
            return dispatch({
                type: 'GET_NAME',
                payload:json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getTypes(){
    return async function (dispatch){
        var info=await axios.get('http://localhost:3001/types')
        return dispatch({
            type:'GET_TYPE',
            payload:info.data
        })
    }
}
export function postPokemon(payload){
    return async function (dispatch){
        var response=await axios.post('http://localhost:3001/pokemons',payload)

        return response
    }
}
export function pokemonDetail(id){
    return async function(dispatch){
            var json=await axios.get(`http://localhost:3001/pokemons/${id}`)
            
            return dispatch({
                type:'POKEMON_DETAIL',
                payload: json.data
            })
        
    }
}