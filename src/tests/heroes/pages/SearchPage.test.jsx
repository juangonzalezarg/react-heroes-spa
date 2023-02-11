import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../heroes/pages/SearchPage';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Pruebas en <SearchPage />', () => { 
    
    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrarse correctamente con valores por defecto', () => { 
        
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        
        expect( container ).toMatchSnapshot();
        
    });

    test('debe de mostrar a batman y el input con el valor del queryString', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        
        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');
        
        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');
        expect( alert.style.display ).toBe('none');

    });

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );
        
        const alert = screen.getByLabelText('alert-danger');
        expect( alert.style.display ).toBe('');

     });

    test('debe de llamar el navigate en la pantalla nueva', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const form = screen.getByLabelText('form-principal');
        fireEvent.submit( form );
        expect( mockedUsedNavigate ).toHaveBeenCalledWith("?q=batman");

    });

 });