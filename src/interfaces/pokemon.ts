export interface PokemonResponse {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}
export interface Pokemon {
    name: string;
    url: string;
}
export interface PokemonStore {
    name: string;
    url: string;
    id: string;
    price: number;
}