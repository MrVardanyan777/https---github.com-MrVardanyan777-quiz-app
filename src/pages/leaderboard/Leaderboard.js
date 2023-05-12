import React, { useEffect, useState } from 'react';
import './leaderboard.css';
import { useHistory } from 'react-router-use-history';

const Leaderboard = () => {

    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const leaderboardData = JSON.parse(localStorage.getItem('leaderboard'));
        const sortedData = leaderboardData.sort((a, b) => b.score - a.score);

        setData(sortedData);
    }, [])


    return (
        <div className='quiz__leaderboard'>
            <div className='quiz__leaderboard-heading'>
                <h1>Leaderboard</h1>
            </div>
            <div className='quiz__leaderboard-list'>

                {
                    data.length > 0 ? (
                        <table>
                            <thead>
                                <tr className='quiz__leaderboard-table_header'>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody className='quiz__leaderboard-table_body'>
                                {
                                    data.map((row, index) => (
                                        <tr key={index} className='quiz__leaderboard-table_row'>
                                            <td>{row.name}</td>
                                            <td>{row.score}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className='quiz__leaderboard-message'>
                            <p>You can be First.</p>
                        </div>
                    )
                }
            </div>
            <div className='quiz__leaderboard-btnBox'>
                <button onClick={() => {history.push('/')}} className='back-home_btn'>Back to Home</button>
            </div>
        </div>
    )
}

export default Leaderboard