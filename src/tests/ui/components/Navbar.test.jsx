import { render, screen, fireEvent  } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../../auth/context/AuthContext';
import { Navbar } from '../../../ui';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Pruebas en <Navbar />', () => { 
    
    const contextValue = {
      logged: true,
      user: {
          name: 'Juan González',
          id: '123'
      },
      logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el nombre del usuario', () => {         

      render(
        <AuthContext.Provider value={ contextValue }>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </AuthContext.Provider>
      ) 
      
      expect( screen.getByText('Juan González') ).toBeTruthy();

    });

    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => { 

      render(
        <AuthContext.Provider value={ contextValue } >
          <MemoryRouter initialEntries={['/']}>
            <Navbar />
          </MemoryRouter>
        </AuthContext.Provider>
      ) 

      const buttonElement = screen.getByRole('button');
        
      fireEvent.click( buttonElement );      
      
      expect( contextValue.logout ).toHaveBeenCalled();
      expect( mockedUsedNavigate ).toHaveBeenCalledWith("/login", {"replace": true});

    });      

 });