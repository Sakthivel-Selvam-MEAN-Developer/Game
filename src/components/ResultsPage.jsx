import React, { useEffect, useState } from 'react';
import { query, collection, getDocs } from 'firebase/firestore'
import { database } from '../firebase/server';

const ResultsPage = ({ navigate }) => {
  const [allResults, setAllResults] = useState([])

  useEffect(() => {
    getAllResults()
  }, [])

  const getAllResults = async () => {
    const que = query(collection(database, 'Game_Results'))
    const querySnapShot = await getDocs(que)
    let results = []
    querySnapShot.forEach(data => {
      results.push({ ...data.data(), id: data.id })
    })
    setAllResults(results)
    console.log(allResults)
  }
  return (
    <div className='results container overflow-x-scroll d-flex flex-column justify-content-center'>
      <div className="title mb-5">
        <h3 className='text-center'>All Game Results</h3>
        <button className="btn btn-dark mt-3" onClick={() => navigate('/')}>Back to Home</button>
      </div>
      <table className='table table-striped table-hover text-center'>
        <tbody>
          <tr>
            <th colSpan='2'>Player 1</th>
            <th colSpan='2'>Player 2</th>
            <th rowSpan='2' className='align-middle'> Overall </th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Wins</th>
            <th>Name</th>
            <th>Wins</th>
          </tr>
          {allResults.length ?
            (allResults.map(data => (
              <tr>
                <td>{data.player1_name}</td>
                <td>{data.player1_wins}</td>
                <td>{data.player2_name}</td>
                <td>{data.player2_wins}</td>
                <td>{data.overall}</td>
              </tr>
            ))) : (
              <tr>
                <td>
                  Loading...
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPage;