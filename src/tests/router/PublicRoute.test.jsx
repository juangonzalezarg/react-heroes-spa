import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { AuthContext } from '../../auth';
import { PublicRoute } from '../../router/PublicRoute';


describe('Pruebas en <PublicRoute />', () => { 
    
    test('debe de mostrar el children si no está autenticado', () => { 
        
        const contextValue = {
            logged: false
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
         );

         expect( screen.getByText('Ruta pública') ).toBeTruthy();

     });

     test('debe de navegar si está autenticado', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Juan González',
                id: '123'
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element={                     
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute> 
                        }/>
                        <Route path='marvel' element={ <h1>Página Marvel</h1> }/>
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
         );
        
        expect( screen.getByText('Página Marvel') ).toBeTruthy();

     });

 });