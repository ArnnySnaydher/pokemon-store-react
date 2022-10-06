import { PokemonState } from '../';
import { PokemonStore } from '../../interfaces/pokemon';

type PokemonActionType = 
| {type:'[Pokemon] - Set Total',payload:number}
| {type:'[Pokemon] - Set Pokemon',payload:PokemonStore[]}
|{type:'[Pokemon] - Shoping',payload:number}
|{type:'[Pokemon] - Leave Pokemon',payload:string}

export const PokemonReducer = (state:PokemonState,action:PokemonActionType):PokemonState => { 
    switch (action.type) {
        case '[Pokemon] - Set Total':
            return {
                ...state,
                total:action.payload
            };
        case '[Pokemon] - Set Pokemon':
            return {
                ...state,
                pokemon:[...state.pokemon,...action.payload]
            };
        case '[Pokemon] - Shoping':
            return {
                ...state,
                total:state.total-action.payload
            };
        case '[Pokemon] - Leave Pokemon':
            return {
                ...state,
                pokemon:state.pokemon.filter(poke=>poke.id!==action.payload)
            };
    
        default:
            return state;
    }
 }