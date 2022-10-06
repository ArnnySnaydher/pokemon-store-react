import { useEffect, useState } from "react";
import { Pokemon } from "../interfaces/apipokemon";

export const useRandom = () => {
    const [random, setRandom] = useState<number[]>(Array.from({ length: 4 }, () => Math.floor(Math.random() * (41 + 1)) + 1));
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    
    const getPokemons = async () => {
        setRandom(
            Array.from({ length: 4 }, () => Math.floor(Math.random() * (
                50 + 1)) + 1)
        );
        const response:Pokemon[] = await Promise.all(
            random.map(async (id) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                return res.json();
            })
        );
        console.log(response);
        setPokemon(response);
    };

    // useEffect(() => {
    //     setRandom(
    //         Array.from({ length: 5 }, () => Math.floor(Math.random() * (41 + 1)) + 1)
    //     );
    // }, []);

    return {
        getPokemons,
        random,
        pokemon,
    }
}
