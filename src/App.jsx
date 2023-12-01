import { useState } from 'react';
import ResultsPage from './components/ResultsPage';
import { Routes, Route } from 'react-router'
import { GetNames } from './components/GetNames';
import { GamePage } from './components/GamePage'
import { useNavigate } from 'react-router';

const App = () => {
  const [rounds, setRounds] = useState(1)
  const [gameData, setGameData] = useState([])
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')

  const navigate = useNavigate()
 
  const updateResult = (result) => {
    setGameData([...gameData, result]);
    setRounds(rounds + 1);
  };

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={
          <GetNames
            setPlayer1Name={setPlayer1Name}
            setPlayer2Name={setPlayer2Name}
            navigate = {navigate}
          />} />
        <Route path='/game' element={
          <GamePage
            player1Name={player1Name}
            player2Name={player2Name}
            updateResult={updateResult}
            rounds={rounds}
            gameData={gameData}
            navigate={navigate}
            setRounds={setRounds}
          />} />
        <Route path='/results' element={
          <ResultsPage navigate={navigate}/>
        } />
      </Routes>
    </div>
  );
};

export default App;