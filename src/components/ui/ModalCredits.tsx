import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Player, PlayerState } from '@lottiefiles/react-lottie-player';
import { useRandom } from '../../hooks/useRandom';
import { PokemonContext } from '../../context';

export const ModalCredits = () => {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [counter, setCounter] = useState(20);
    const [isgetCredit, setIsgetCredit] = useState(false);
    const playerRef = React.useRef<Player>(null);
    const [totalCredits, setTotalCredits] = useState(0);
    const { pokemon, getPokemons } = useRandom();
    const { setTotal, total: totalStore } = useContext(PokemonContext);
    const total = useMemo(() => {
        return pokemon.reduce((acc, p) => acc + p.id, 0);
    }, [pokemon]);
    const handleOpenGift = () => {
        setOpen(true);
        getPokemons();
        playerRef.current?.stop();
        setIsgetCredit(false);
    }
    const handleCounter = () => {
        setCounter(counter - 1);
    }
    const handleGetCredits = () => {
        setTotalCredits(totalCredits + total);
        setTotal(totalCredits + total);
        setIsgetCredit(true);
    }

    useEffect(() => {
        if (!open) return;
        if (counter === 0) {
            setCounter(20);
            setOpen(false);
            return;
        }
        console.log('counter', counter);
        const interval = setInterval(() => {
            handleCounter();
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [counter, open])


    return (
        <div className='is-dark '>
            <h1 style={{ color: '#fff' }}>ModalCredits</h1>
            <p style={{ color: '#fff' }}>Obten Créitos para comprar tus pokemon</p>
            <button type="button" className="nes-btn is-primary" onClick={() => setShow(false)}>Obtener Créditos</button>
            <button type="button" className="nes-btn is-primary" onClick={() => setShow(true)}> Créditos</button>
            {!show ?
                <div className="nes-container with-title is-centered is-dark content-credit">
                    <p className="title">Obtener Créditos</p>
                    <div className="favorites-container">
                        <div className="favorite-item">
                            <p>Se obtienen créditos</p>
                            <Player
                                ref={playerRef}
                                autoplay
                                loop
                                src="https://assets3.lottiefiles.com/packages/lf20_qvifbxtq.json"
                                style={{ height: '300px', width: '300px' }}
                            />
                            {
                                pokemon && open &&
                                <div className="card-content">
                                    {
                                        pokemon.map((poke, i) => (
                                            <div className="favorite-item card-gift" key={i}>
                                                <p>{poke.name}</p>
                                                <img src={poke.sprites.front_default} alt={poke.name} />
                                                <p className='nes-text is-warning'>+{poke.id}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            {
                                counter !== 20 &&
                                <>
                                    <p>podrá obtener más créditos en:</p>
                                    <p className='nes-text is-warning'>{counter}</p>
                                </>
                            }
                            {
                                total > 0 &&
                                <div className="total">
                                    <p>Total:</p>
                                    <p className='nes-text is-warning'>${total}</p>
                                </div>
                            }
                            {
                                !open &&
                                <button
                                    type="button"
                                    onClick={handleOpenGift}
                                    className="nes-btn is-primary">
                                    Abrir Regalo
                                </button>
                            }
                            {
                                open && !isgetCredit &&
                                <button
                                    type="button"
                                    onClick={handleGetCredits}
                                    className="nes-btn is-primary">
                                    Obtener Créditos
                                </button>
                            }
                        </div>
                    </div>
                </div>
                :
                <div className="nes-container with-title is-centered is-dark content-favorite">
                    <div className="favorites-container">
                        <div className="favorite-item">
                            <p>Créditos</p>
                            <p className="nes-text is-primary">Total: $ {totalStore}</p>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}
