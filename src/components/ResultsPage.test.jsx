import { render, screen, waitFor } from '@testing-library/react' 
import '@testing-library/jest-dom' 
import axios from 'axios' 
import ResultsPage from './ResultsPage' 

jest.mock('axios') 

describe('ResultsPage Component', () => {
  test('renders ResultsPage with data', async () => {
    const mockedData = [
      {
        game_id: 1,
        player1_name: 'Player1',
        player1_wins: 2,
        player2_name: 'Player2',
        player2_wins: 1,
        overall: 'Player1 Wins!',
      },
    ] 
    axios.get.mockResolvedValueOnce({ data: mockedData }) 

    render(<ResultsPage navigate={() => {}} />) 

    await waitFor(() => {
      expect(screen.getByText(/Player1/i)).toBeInTheDocument() 
      expect(screen.getByText(/Player2/i)).toBeInTheDocument() 
      expect(screen.getByText(/Player1 Wins!/i)).toBeInTheDocument() 
    }) 

    expect(screen.getByText(/Player1/i)).toBeInTheDocument() 
    expect(screen.getByText(/2/i)).toBeInTheDocument() 
    expect(screen.getByText(/Player2/i)).toBeInTheDocument() 
    expect(screen.getByText(/1/i)).toBeInTheDocument() 
    expect(screen.getByText(/Player1 Wins!/i)).toBeInTheDocument() 
  }) 

  test('renders ResultsPage with loading state', async () => {
    axios.get.mockResolvedValueOnce({ data: [] }) 

    render(<ResultsPage navigate={() => {}} />) 

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument() 

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).toBeNull() 
    }) 
  }) 
}) 
