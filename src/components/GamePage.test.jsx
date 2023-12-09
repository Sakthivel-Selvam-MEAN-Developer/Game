import { render, screen, fireEvent } from '@testing-library/react';
import { GamePage } from './GamePage';

jest.mock('../api/game.api', () => ({
  post: jest.fn(() => Promise.resolve()),
}))

describe('GamePage Component', () => {
  test('renders GamePage with initial state', () => {
    render(<GamePage player1Name="Player1" player2Name="Player2" />)
    
    expect(screen.getByText('Round 1')).toBeInTheDocument()
    expect(screen.getByText('Result')).toBeInTheDocument()
  })

  test('calculates winner correctly', () => {
    render(<GamePage player1Name="Player1" player2Name="Player2" />)
    
    fireEvent.click(screen.getByText('Player1').closest('div').querySelector('button[data-testid="stone"]'))
    fireEvent.click(screen.getByText('Player2').closest('div').querySelector('button[data-testid="scissors"]'))
    
    fireEvent.click(screen.getByText('Show Result'));
    
    expect(screen.getByText(/Player1 wins/i)).toBeInTheDocument()
  })

  test('handles round end correctly', () => {
    render(<GamePage player1Name="Player1" player2Name="Player2" />)
    
    fireEvent.click(screen.getByText('Player1').closest('div').querySelector('button[data-testid="stone"]'));
    fireEvent.click(screen.getByText('Player2').closest('div').querySelector('button[data-testid="scissors"]'));
    
    fireEvent.click(screen.getByText('Show Result'))
    
    expect(screen.getByText(/Player1 wins/i)).toBeInTheDocument()
    expect(screen.queryByText('stone')).not.toBeInTheDocument()
    expect(screen.queryByText('scissors')).not.toBeInTheDocument()
  })

  test('handles navigate button click', () => {
    const navigateMock = jest.fn()
    render(<GamePage player1Name="Player1" player2Name="Player2" navigate={navigateMock} />)
    
    fireEvent.click(screen.getByText('New Game'))
    
    expect(navigateMock).toHaveBeenCalledWith('/')
  });

  test('handles API call when rounds reach 7', async () => {
    render(<GamePage player1Name="Player1" player2Name="Player2" rounds={7} />)
    
    fireEvent.click(screen.getByText('Show Result'))
    
    await expect(require('../api/game.api').post).toHaveBeenCalledWith('/api/post/game_results', {
      player1Name: 'Player1',
      player2Name: 'Player2',
      player1TotalWins: 0,
      player2TotalWins: 0,
      overall: 'It\'s Tie',
    })
  })
})
