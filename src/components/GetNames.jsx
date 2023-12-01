const GetNames = ({ setPlayer1Name, setPlayer2Name, navigate }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/game')
    }

    return (
        <div className="getnames text-center d-flex justify-content-center align-items-center ">
            <form action="#" onSubmit={handleSubmit}>
                <div className="title">
                    <h3 className="text-black">To Start Game</h3>
                </div>
                <div className="player1-name m-4">
                    <label htmlFor="player1-name" className="m-3">Player 1 Name</label>
                    <input type="text" className="form-control" id="player1-name" required onChange={(e) => setPlayer1Name(e.target.value)} />
                </div>
                <div className="player2-name m-4">
                    <label htmlFor="player2-name" className="m-3">Player 2 Name</label>
                    <input type="text" className="form-control" id="player2-name" required onChange={(e) => setPlayer2Name(e.target.value)} />
                </div>
                <button className="btn btn-dark text-white m-3">Start Game</button>
            </form>
        </div>
    )
}

export { GetNames }