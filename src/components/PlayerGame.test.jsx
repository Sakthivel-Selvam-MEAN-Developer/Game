import { render, screen, fireEvent } from '@testing-library/react' 
import '@testing-library/jest-dom' 
import { PlayerGame } from './PlayerGame' 

describe('PlayerGame Component', () => {
  test('renders PlayerGame with player name and buttons', () => {
    const playerName = 'Player1' 
    const setPlayerSelectedOptionMock = jest.fn() 

    render(<PlayerGame playerName={playerName} setPlayerSelectedOption={setPlayerSelectedOptionMock} />) 

    expect(screen.getByText(playerName)).toBeInTheDocument() 
    expect(screen.getByRole('button', { name: /Stone/ })).toBeInTheDocument() 
    expect(screen.getByRole('button', { name: /Paper/ })).toBeInTheDocument() 
    expect(screen.getByRole('button', { name: /Scissors/ })).toBeInTheDocument() 
  }) 

  test('calls setPlayerSelectedOption on button click', () => {
    const playerName = 'Player1' 
    const setPlayerSelectedOptionMock = jest.fn() 

    render(<PlayerGame playerName={playerName} setPlayerSelectedOption={setPlayerSelectedOptionMock} />) 

    fireEvent.click(screen.getByRole('button', { name: /Stone/ })) 
    fireEvent.click(screen.getByRole('button', { name: /Paper/ })) 
    fireEvent.click(screen.getByRole('button', { name: /Scissors/})) 

    expect(setPlayerSelectedOptionMock).toHaveBeenCalledWith('stone') 
    expect(setPlayerSelectedOptionMock).toHaveBeenCalledWith('paper') 
    expect(setPlayerSelectedOptionMock).toHaveBeenCalledWith('scissors') 
  }) 
}) 
