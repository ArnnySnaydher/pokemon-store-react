import { UiState } from '../';

type UiActionType = 
| {type:'[Ui] - Toggle'}

export const UiReducer = (state:UiState,action:UiActionType):UiState => { 
    switch (action.type) {
        case '[Ui] - Toggle':
            return {
                ...state,
            };
    
        default:
            return state;
    }
 }