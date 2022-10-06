import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { PokemonContext } from '../context';

export const MyPokemonPage = () => {
    const { pokemon, leavePokemon } = useContext(PokemonContext);
    const navigate = useNavigate();
    return (
        <div className='app'>
            <header className="app-header">
                <div className='logo-header'>
                    <Link to='/' className='logo-header'>
                        <img src="https://media.discordapp.net/attachments/839620709517230081/1026864145942970390/pngegg_1.png?width=644&height=676" className="app-logo" alt="logo" />
                        <h1 className='nes-text'>
                            PokeStore
                        </h1>
                    </Link>
                </div>
            </header>
            <main>
                <div className="nes-container with-title is-centered is-dark pokemon-container">
                    <h1>Pokemons Comprados</h1>
                    <div className="cards-container">
                        {
                            pokemon.length > 0 ?
                                pokemon.map((poke, i) => (
                                    <div className="card-pokemon" key={i}>
                                        <p>{poke.name}</p>
                                        <img src={poke.url} alt={poke.name} />
                                        <button
                                            type="button"
                                            onClick={() => leavePokemon(poke.id)}
                                            className="nes-btn is-error">
                                            Liberar
                                        </button>
                                    </div>
                                ))
                                :
                                <div className="favorite-item">
                                    <p>No tienes pokemones</p>
                                </div>
                        }
                    </div>
                </div>
            </main>
            <div className="content__buttons">
                <button
                    className="nes-btn is-primary"
                    onClick={() => navigate('/')}
                >
                    <i className="nes-icon is-small star"></i>
                    <span>Comprar Pokemon</span>
                </button>
            </div>
        </div>
    )
}
