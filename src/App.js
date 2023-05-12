import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Finalpage, Homepage, QuestionPage, Leaderboard } from './pages';



function App() {
  const [count, setCount] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null);
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  console.log(leaderboard);

  useEffect(() => {
    if(!localStorage.getItem('leaderboard')){
      localStorage.setItem('leaderboard', JSON.stringify([]));
  }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path='/'
          element={<Homepage
            setSelectedOption={setSelectedOption}
            username={username}
            setUsername={setUsername}
          />}
        />
        <Route
          path='/question-page'
          element={<QuestionPage
            setCount={setCount}
            count={count}
            selectedOption={selectedOption}
          />}
        />
        <Route
          path='/final-page'
          element={<Finalpage 
            username={username}
            setCount={setCount}
            count={count}
            leaderboard={leaderboard}
            setLeaderboard={setLeaderboard}
          />}
        />
        <Route 
          path='/leaderboard-page'
          element={<Leaderboard 
            leaderboard={leaderboard}
          />}
        />  
      </Routes>
    </div>
  );
}

export default App; 
