import { useEffect, useState } from 'react';
import { PlayerGame } from './PlayerGame';
import api from '../api/game.api';

const GamePage = ({ player1Name, player2Name, updateResult, rounds, navigate, setRounds }) => {
    const [player1SelectedOption, setPlayer1SelectedOption] = useState('');
    const [player2SelectedOption, setPlayer2SelectedOption] = useState('');
    const [player1TotalWins, setPlayer1TotalWins] = useState(0)
    const [player2TotalWins, setPlayer2TotalWins] = useState(0)
    const [result, setResult] = useState('')

    useEffect(() => {
        window.addEventListener('beforeunload', handleReloadPage)
        return () => {
            window.removeEventListener('beforeunload', handleReloadPage)
        }
    }, [])

    useEffect(() => {
        if (rounds == 7) {
            handleAPI()
        } else return
    }, [rounds])

    const handleAPI = async () => {
        try {
            const finalWinner = player1TotalWins == player2TotalWins ? 'It\'s Tie' : (player1TotalWins > player2TotalWins ? player1Name + ' Wins!' : player2Name + ' Wins!')
            const response = await api.post('/api/post/game_results', {
                player1Name: player1Name,
                player2Name: player2Name,
                player1TotalWins: player1TotalWins,
                player2TotalWins: player2TotalWins,
                overall: finalWinner
            })
        } catch (err) {
            console.Error('Error : ', err)
        }
    }

    const handleReloadPage = (event) => {
        const message = 'Are you sure you want to Refresh?'
        event.returnValue = message
        return message
    }

    const calculateWinner = () => {
        if (player1SelectedOption === player2SelectedOption) {
            return 'It\'s a tie!';
        } else if (
            (player1SelectedOption === 'stone' && player2SelectedOption === 'scissors') ||
            (player1SelectedOption === 'scissors' && player2SelectedOption === 'paper') ||
            (player1SelectedOption === 'paper' && player2SelectedOption === 'stone')
        ) {
            setPlayer1TotalWins(player1TotalWins + 1)
            return `${player1Name} wins!`;
        } else {
            setPlayer2TotalWins(player2TotalWins + 1)
            return `${player2Name} wins!`;
        }
    };

    const handleRoundEnd = () => {
        if (player1SelectedOption != '' && player2SelectedOption != '') {
            setResult(calculateWinner())
            updateResult(result);
            setPlayer1SelectedOption('');
            setPlayer2SelectedOption('');
        } else {
            alert('Both Players must select Option...')
        }
    }

    const handleNavigate = () => {
        setRounds(1)
        navigate('/')
    }

    return (
        <>
            {rounds <= 6 ? (
                <div className='gamepage mt-5'>
                    <h2 className='text-center pt-5'>Round {rounds}</h2>
                    <div className="game d-flex justify-content-evenly pt-5">
                        <PlayerGame
                            playerName={player1Name}
                            setPlayerSelectedOption={setPlayer1SelectedOption}
                        />
                        <PlayerGame
                            playerName={player2Name}
                            setPlayerSelectedOption={setPlayer2SelectedOption}
                        />
                    </div>
                    <div className="end-game d-flex justify-content-center">
                        <button className='btn btn-danger m-2 mt-5' onClick={() => handleRoundEnd()}>Show Result</button>
                        <button className='btn btn-success m-2 mt-5' onClick={() => handleNavigate()}>New Game</button>
                        <button className='btn btn-outline-danger m-2 mt-5' onClick={() => navigate('/results')}>Show All Result</button>
                    </div>
                    <div className="results d-flex flex-column align-items-center mt-4">
                        <div className="title">
                            <h3 className='text-center'>Result</h3>
                            <div className="results-body text-center ">
                                <div className="result text-start">
                                    <p className='text-center'>{result}</p>
                                    <p>{player1Name} <small>(Player 1) </small>: {player1TotalWins}</p>
                                    <p>{player2Name} <small>(Player 2) </small>: {player2TotalWins}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="results d-flex flex-column align-items-center mt-5">
                    <div className="title">
                        <h3>Results</h3>
                        <div className="results-body text-center ">
                            <div className="result">
                                <p>{player1TotalWins == player2TotalWins ? 'It\'s Tie' : (player1TotalWins > player2TotalWins ? player1Name + ' Wins!' : player2Name + ' Wins!')}</p>
                                <p>{player1Name} : {player1TotalWins}</p>
                                <p>{player2Name} : {player2TotalWins}</p>
                            </div>
                        </div>
                    </div>
                    <div className="home-btn">
                        <button className='btn btn-warning' onClick={() => handleNavigate()}>Back to New Game</button>
                    </div>
                </div>
            )}
        </>
    )
}

export { GamePage }

