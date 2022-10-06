import { createContext } from 'react';
import { PokemonStore } from '../../interfaces/pokemon';

interface ContextProps {
    total: number;
    pokemon: PokemonStore[];
    setTotal: (total: number) => void;
    setPokemon: (pokemon: PokemonStore[]) => void;
    handleShoping: (cost: number) => void;
    leavePokemon: (id: string) => void;
}

export const PokemonContext = createContext({} as ContextProps)