const PlayerGame = ({ playerName, setPlayerSelectedOption }) => {
    return (
        <div className='player text-center pt-2 rounded'>
            <h3>{playerName}</h3>
            <button className='btn btn-primary m-2' onClick={() => setPlayerSelectedOption('stone')}>Stone</button>
            <button className='btn btn-warning m-2' onClick={() => setPlayerSelectedOption('paper')}>Paper</button>
            <button className='btn btn-dark m-2' onClick={() => setPlayerSelectedOption('scissors')}>Scissors</button>
        </div>
    )
}

export { PlayerGame }