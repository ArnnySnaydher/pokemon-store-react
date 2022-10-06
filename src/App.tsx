import { useEffect, useMemo, useState } from 'react'
import './App.css';
import { PokemonProvider } from './context';
import { PokemonPage } from './pages';
import { DashBoardRoutes } from './router/DashBoardRoutes';

function App() {

  return (
    <PokemonProvider>
      <DashBoardRoutes />
    </PokemonProvider>
  )
}

export default App
