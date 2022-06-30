
const initialState={
    pokemons : [],
    allPokemons:[],
    types: [],
    detail:[]
}

const rootReducer= (state=initialState,action)=>{
    switch (action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons:action.payload,
                allPokemons:action.payload
            }
        case 'FILTER_CREATED':
            const allPokemons=state.allPokemons
            const createdFilter= action.payload==='created'? allPokemons.filter(el=>el.createdInDb): state.allPokemons.filter(el=> !el.createdInDb)
            return{
                ...state,
                pokemons:action.payload==='todos'?state.allPokemons:createdFilter
            }
        case 'FILTER_BYNAME':
            let vocab= action.payload==='asc'?
            state.pokemons.sort(function(a,b){
                if(a.name>b.name){
                    return 1
                }
                if(b.name>a.name){
                    return -1
                }
                return 0
            }) :
            state.pokemons.sort(function(a,b){
                if(a.name>b.name){
                    return -1
                }
                if(b.name>a.name){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                pokemons:vocab
            }
        case 'FILTER_BYATTACK':
            let attack= action.payload==='maymen'?
            state.pokemons.sort(function(a,b){
                if(a.ataque>b.ataque){
                    return 1
                }
                if(b.ataque>a.ataque){
                    return -1
                }
                return 0
            }) :
            state.pokemons.sort(function(a,b){
                if(a.ataque>b.ataque){
                    return -1
                }
                if(b.ataque>a.ataque){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                pokemons:attack
            }
        case 'FILTER_BYTYPE':
            const allPokemons2=state.allPokemons            
            const typefilter=action.payload==='All'? allPokemons2 : allPokemons2.filter(p=>p.type.map(t=>{return t}).includes(action.payload))
            
            return {
                ...state,
                pokemons: typefilter
            }
        case 'GET_NAME':
            return {
                ...state,
                pokemons:action.payload
            }
        case 'POST_POKEMON':
            return {
                ...state
            }
        case 'GET_TYPE':
            return {
                ...state,
                types:action.payload
            }
        case 'POKEMON_DETAIL':
            return {
                ...state,
                detail:action.payload
            }    
        default:
        return state
    }
}

export default rootReducer;