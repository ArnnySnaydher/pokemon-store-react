import { createContext } from 'react';

interface ContextProps {
    toggle: boolean;
}

export const UiContext = createContext({} as ContextProps)