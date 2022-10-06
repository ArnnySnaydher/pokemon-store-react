import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { MyPokemonPage, PokemonPage } from '../pages';

export const DashBoardRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PokemonPage />} />
                <Route path="/mis-pokemon" element={<MyPokemonPage />} />
            </Routes>
        </BrowserRouter>
    )
}
