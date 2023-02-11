import { useReducer } from 'react';

import { authReducer } from '../../../auth';
import { types } from '../../../auth/types/types';


describe('Pruebas en authReducer', () => { 
    
    const initialState = {
        logged: false,
    };

    test('debe de retornar el estado por defect', () => { 
        
        const state = authReducer( initialState, {} );

        expect( state ).toEqual( initialState );
     });

     test('debe de llamar al login autenticar y establecer el user', () => { 
        
        const name = 'Juan González';

        const action = {
            type: types.login,
            payload: { 
                name: name,
                id: '123'
            }
        }

        const state = authReducer(initialState, action);

        expect( state ).toEqual( {
            logged: true,
            user: action.payload
        });

      });

      test('debe de borrar el name del usuario y logged en false', () => { 
        
        const state = {
            logged: true,
            user: { 
                name: 'Juan González',
                id: '123'
            }
        }

        const action = {
            type: types.logout,
        }

        const newState = authReducer(state, action);

        expect( newState ).toEqual({
            logged: false,
        });

      });

 });