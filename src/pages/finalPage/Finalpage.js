import React, { useState, useEffect } from 'react';
import './finalpage.css';
import { useHistory } from 'react-router-use-history';
import { useId } from 'react';


const Finalpage = ({ username, count, leaderboard, setLeaderboard }) => {
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState({id: '', name: '', score: ''});
  const userId = useId();

  const saveRes = () => {
      if(userId !== '' && username !== '' && count !== ''){
        user.id = userId;
        user.name = username;
        user.score = count;
        console.log(user);
        setUser(user)
        setLeaderboard([...[user], ...leaderboard])
      }
      setDisable(!disable)
    }
    
      useEffect(() => {
        console.log(leaderboard);
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}, [saveRes]);

  return (
    <div className='quiz__finalpage'>
      <div className='quiz__finalpage-headingBox'>
        <h2 className='quiz__finalpage-heading'>Thank You {username === '' ? 'Anonymus' : username}!</h2>
        <p className='quiz__finalpage-userscore'>You score {count}/10</p>
      </div>

      <div className='quiz__finalpage-btnBox'>
        <button className='quiz__finalpage-btnBox_back' onClick={() => history.push('/')}>Back To Home</button>
        <button className='quiz__finalpage-btnBox_save' 
          style={{ backgroundColor: `${!username ? '#808080': '#e84118' }` }}
          onClick={saveRes}
          disabled={disable}
          >
          Save Result</button>
        <button className='quiz__finalpage-btnBox_leaderboard' onClick={() => history.push('/leaderboard-page')}>Leaderboard</button>
      </div>
    </div>
  )
}

export default Finalpage;