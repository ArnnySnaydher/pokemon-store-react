import React, { FC } from 'react'
import { PokemonStore } from '../../interfaces/pokemon';
interface ModalFavoritesProps {
    favorites: PokemonStore[];
}
export const ModalFavorites: FC<ModalFavoritesProps> = ({ favorites }) => {
    return (
        <div className="nes-container with-title is-centered is-dark content-favorite">
            <p className="title">Pokemones Favoritos</p>
            <div className="favorites-container">
                {
                    favorites.map((pokemon: PokemonStore) => {
                        return (
                            <div key={pokemon.id} className="favorite-item">
                                <img src={pokemon.url} alt={pokemon.name} title={pokemon.name} />
                                <p>{pokemon.name}</p>
                                <p className="nes-text is-primary">Precio: $ {pokemon.price}</p>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}
