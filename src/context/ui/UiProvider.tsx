import { FC, useReducer } from 'react'
import { UiContext, UiReducer } from '../'
interface Props {
    children: JSX.Element | JSX.Element[]
}

export interface UiState {
    toggle: boolean
}

const Ui_INITIAL_STATE: UiState = {
    toggle: false
}

export const UiProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(UiReducer, Ui_INITIAL_STATE)
    return (
        <UiContext.Provider
            value={{
                ...state,
            }}
        >
            {children}
        </UiContext.Provider>
    );
};
