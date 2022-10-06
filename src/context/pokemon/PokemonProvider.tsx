import { FC, useReducer } from 'react'
import { PokemonContext, PokemonReducer } from '../'
import { PokemonStore } from '../../interfaces/pokemon';
interface Props {
    children: JSX.Element | JSX.Element[]
}

export interface PokemonState {
    total: number,
    // costo: number,
    pokemon: PokemonStore[]
}

const Ui_INITIAL_STATE: PokemonState = {
    total: 0,
    // costo: 0,
    pokemon: []
}

export const PokemonProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(PokemonReducer, Ui_INITIAL_STATE)
    const setTotal = (total: number) => {
        dispatch({
            type: '[Pokemon] - Set Total',
            payload: total
        })
    }
    const setPokemon = (pokemon: PokemonStore[]) => {
        dispatch({
            type: '[Pokemon] - Set Pokemon',
            payload: pokemon
        })
    }
    const handleShoping = (cost: number) => {
        dispatch({
            type: '[Pokemon] - Shoping',
            payload: cost
        })
    }
    const leavePokemon = (id: string) => {
        dispatch({
            type: '[Pokemon] - Leave Pokemon',
            payload: id
        })
    }
    return (
        <PokemonContext.Provider
            value={{
                ...state,
                setTotal,
                setPokemon,
                handleShoping,
                leavePokemon
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};
