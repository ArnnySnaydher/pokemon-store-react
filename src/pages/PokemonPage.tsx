import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ModalCredits } from '../components/ui/ModalCredits';
import { ModalFavorites } from '../components/ui/ModalFavorites';
import { PokemonContext } from '../context';
import { useFetch } from '../hooks';
import { PokemonStore } from '../interfaces/pokemon';
import { useNavigate, Link } from "react-router-dom";

export const PokemonPage = () => {
    const { data, loading } = useFetch();
    const [cart, setCart] = useState<PokemonStore[]>([]);
    const [searchPokemon, setSearchPokemon] = useState<PokemonStore[]>([]);
    const [favorites, setFavorites] = useState<PokemonStore[]>([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [openCredit, setopenCredit] = useState(false);
    const [show, setShow] = useState(false);
    const { total, setPokemon, handleShoping } = useContext(PokemonContext);
    const navigate = useNavigate();
    const handleAddToCart = (pokemon: PokemonStore) => {
        if (cart.find(p => p.id === pokemon.id)) return;
        if (cart.length >= 3) return;
        console.log('add', cart.length);
        setCart(cart.concat(pokemon));
    }
    const handleRemoveFromCart = (pokemon: PokemonStore) => {
        setCart(cart.filter(p => p.id !== pokemon.id));
    }
    const costo = useMemo(() => {
        return cart.reduce((acc, p) => acc + p.price, 0);
    }, [cart]);
    const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search.length === 0) {
            setSearchPokemon([]);
            return;
        }
        const result = data?.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        setSearchPokemon(result || []);
    }
    const handleFavorite = (pokemon: PokemonStore) => {
        if (favorites.find(p => p.id === pokemon.id)) {
            setFavorites(favorites.filter(p => p.id !== pokemon.id));
            return;
        }
        setFavorites(favorites.concat(pokemon));
        localStorage.setItem('favorites', JSON.stringify(favorites.concat(pokemon)));
    }
    const handleBuy = () => {
        if (cart.length === 0) return;
        if (costo > total) return;
        setCart([]);
        handleShoping(costo);
        setPokemon(cart);
    }
    useEffect(() => {
        const favorites = localStorage.getItem('favorites');
        if (!favorites) return;
        setFavorites(JSON.parse(favorites));
    }, [])
    return (
        <div className="app" style={{ background: "#212529" }}>
            <header className="app-header">
                <div className='logo-header'>
                    <Link to='/' className='logo-header'>
                        <img src="https://res.cloudinary.com/react-romel/image/upload/v1711509563/portfolio/moneda_mario_yg5hsq.webp" className="app-logo" alt="logo" />
                        <h1 className='nes-text'>
                            PokeStore
                        </h1>
                    </Link>
                </div>
                <button
                    type="button"
                    className="nes-btn is-primary"
                    onClick={() => setopenCredit(true)}
                >
                    Créditos
                </button>
                <button
                    type="button"
                    className="nes-btn is-primary"
                    onClick={() => setOpen(true)}
                >
                    Favoritos
                </button>
            </header>
            <main>
                <div style={{ backgroundColor: '#212529', padding: '1rem' }} className="nes-field is-inline">
                    <form onSubmit={handleSearch}>
                        <input type="text" id="dark_field" className="nes-input is-dark" placeholder="Ingrese un pokemon" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>
                </div>
                <div className="grid-container">
                    {
                        searchPokemon.length > 0 && searchPokemon.map((pokemon: PokemonStore) => {
                            return (
                                <div className="nes-container with-title is-dark grid-item" key={pokemon.name}>
                                    <button
                                        onClick={() => handleFavorite(pokemon)}
                                        className="nes-btn is-primary btn-favorite" >
                                        <i className={`nes-icon heart ${ favorites.find(p => p.id === pokemon.id) ? 'is-filled' : 'is-transparent'
                                            }`}></i>
                                    </button>
                                    <p className="title">{pokemon.id}</p>
                                    <img src={pokemon.url} alt={pokemon.name} title={pokemon.name} />
                                    <p>{pokemon.name}</p>
                                    <p className="nes-text is-primary">Precio: $ {pokemon.price}</p>
                                    <button
                                        onClick={() => handleAddToCart(pokemon)}
                                        className='btn-add-cart nes-btn is-primary '
                                    >
                                        <p>
                                            Agregar al carrito
                                        </p>
                                        <img
                                            src="https://res.cloudinary.com/react-romel/image/upload/v1711509694/portfolio/Pokebola-pokeball-png-0_tbejoa.png"
                                            alt="pokeball"
                                            title="pokeball"
                                            style={{ width: '2rem', height: '2rem' }}
                                            className="nes-pointer"
                                        />
                                    </button>
                                </div>
                            )
                        })
                    }
                    {
                        loading ?
                            <h1>Cargando...</h1>
                            :
                            searchPokemon.length === 0 && data?.map((pokemon: PokemonStore) => {
                                return (
                                    <div className="nes-container with-title is-dark grid-item" key={pokemon.name}>
                                        <button
                                            onClick={() => handleFavorite(pokemon)}
                                            className="nes-btn is-primary btn-favorite" >
                                            <i className={`nes-icon heart ${ favorites.find(p => p.id === pokemon.id) ? 'is-filled' : 'is-transparent'
                                                }`}></i>
                                        </button>
                                        <p className="title">{pokemon.id}</p>
                                        <img src={pokemon.url} alt={pokemon.name} title={pokemon.name} />
                                        <p>{pokemon.name}</p>
                                        <p className="nes-text is-primary">Precio: $ {pokemon.price}</p>
                                        <button
                                            onClick={() => handleAddToCart(pokemon)}
                                            className='btn-add-cart nes-btn is-primary '
                                        >
                                            <p>
                                                Agregar al carrito
                                            </p>
                                            <img
                                                src="https://res.cloudinary.com/react-romel/image/upload/v1711509694/portfolio/Pokebola-pokeball-png-0_tbejoa.png"
                                                alt="pokeball"
                                                title="pokeball"
                                                style={{ width: '2rem', height: '2rem' }}
                                                className="nes-pointer"
                                            />
                                        </button>
                                    </div>
                                )
                            }
                            )
                    }
                </div>

                {
                    show && (
                        <section className="message -right message-total">
                            <div className="nes-balloon from-right is-dark">
                                <div className="nes-container with-title is-dark cart-container">

                                    <p className="title">Carrito</p>
                                    <div className="cart-items">
                                        {
                                            cart.map((pokemon: PokemonStore) => {
                                                return (
                                                    <div key={pokemon.id} className="cart-item">
                                                        <button
                                                            onClick={() => handleRemoveFromCart(pokemon)}
                                                            className="nes-btn is-error"
                                                        >
                                                            <i className="nes-icon close is-small"></i>
                                                        </button>
                                                        <img src={pokemon.url} alt={pokemon.name} title={pokemon.name} />
                                                        <p>{pokemon.name}</p>
                                                        <p className="nes-text is-primary">Precio: $ {pokemon.price}</p>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                    <div className="cart-total">
                                        <p>Costo Total: $ {costo}</p>
                                        <p>Créditos: $ {total}</p>
                                    </div>
                                    {
                                        costo > 0 &&
                                        <button
                                            className="nes-btn is-primary"
                                            onClick={handleBuy}
                                        >
                                            <i className="nes-icon is-small star"></i>
                                            <span>Comprar</span>
                                        </button>
                                    }
                                </div>
                            </div>
                        </section>
                    )
                }
                <div className="content__buttons">
                    <button
                        className="nes-btn is-primary"
                        onClick={() => setShow(!show)}
                    >
                        <i className="nes-icon is-small star"></i>
                        <span>Mi Carrito</span>
                    </button>
                    <button
                        className="nes-btn is-primary"
                        onClick={() => navigate('/mis-pokemon')}
                    >
                        <i className="nes-icon is-small star"></i>
                        <span>Mis Pokemon</span>
                    </button>
                </div>
                {
                    open && (
                        <div
                            onClick={() => setOpen(false)}
                            className="modal is-active">
                            <ModalFavorites favorites={favorites} />
                        </div>
                    )
                }
                <div
                    className={`${ openCredit ? 'is-open' : 'is-close ' }`}
                >
                    <div
                        onClick={() => setopenCredit(!openCredit)}
                        className={`modal`}>
                    </div>
                    <div style={{ position: 'fixed', top: '15%', left: '30%', zIndex: 120 }}>
                        <ModalCredits />
                    </div>
                </div>
            </main>
        </div>
    )
}
