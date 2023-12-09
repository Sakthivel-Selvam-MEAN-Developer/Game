import { render, screen, fireEvent } from '@testing-library/react' 
import '@testing-library/jest-dom' 
import { GetNames } from './GetNames' 

describe('GetNames Component', () => {
  test('renders GetNames with input fields', () => {
    const setPlayer1NameMock = jest.fn() 
    const setPlayer2NameMock = jest.fn() 
    const navigateMock = jest.fn() 

    render(
      <GetNames setPlayer1Name={setPlayer1NameMock} setPlayer2Name={setPlayer2NameMock} navigate={navigateMock} />
    ) 

    expect(screen.getByLabelText(/Player 1 Name/)).toBeInTheDocument() 
    expect(screen.getByLabelText(/Player 2 Name/)).toBeInTheDocument() 
    expect(screen.getByRole('button', { name: /Start Game/ })).toBeInTheDocument() 
  }) 

  test('calls setPlayer1Name and setPlayer2Name on input change', () => {
    const setPlayer1NameMock = jest.fn() 
    const setPlayer2NameMock = jest.fn() 
    const navigateMock = jest.fn() 

    render(
      <GetNames setPlayer1Name={setPlayer1NameMock} setPlayer2Name={setPlayer2NameMock} navigate={navigateMock} />
    ) 

    fireEvent.change(screen.getByLabelText(/Player 1 Name/), { target: { value: 'Player1' } }) 
    fireEvent.change(screen.getByLabelText(/Player 2 Name/), { target: { value: 'Player2' } }) 

    expect(setPlayer1NameMock).toHaveBeenCalledWith('Player1') 
    expect(setPlayer2NameMock).toHaveBeenCalledWith('Player2') 
  }) 

  test('calls navigate on form submission', () => {
    const setPlayer1NameMock = jest.fn() 
    const setPlayer2NameMock = jest.fn() 
    const navigateMock = jest.fn() 

    render(
      <GetNames setPlayer1Name={setPlayer1NameMock} setPlayer2Name={setPlayer2NameMock} navigate={navigateMock} />
    ) 

    fireEvent.submit(screen.getByRole('form')) 

    expect(navigateMock).toHaveBeenCalledWith('/game') 
  }) 
}) 
