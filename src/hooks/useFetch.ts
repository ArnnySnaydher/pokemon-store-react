import { useEffect, useState } from "react";
import { Pokemon, PokemonResponse, PokemonStore } from "../interfaces/pokemon";

export const useFetch = () => {
    const [data, setData] = useState<PokemonStore[]|null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=60&offset=0");
        const data:PokemonResponse = await response.json();
        const pokemonImages=data.results.map(poke=>{
            const id = poke.url.split("/")[6];
            poke.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            return {
                name: poke.name,
                url: poke.url,
                id: id,
                price: 10+Math.floor(Math.random()*(30-1)+1)
            }
        })
        setData([
            ...pokemonImages
        ]);
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading };
}
