import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-use-history';
import './homepage.css';
import { categoriesList } from '../../api';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const Homepage = ({ setSelectedOption, username, setUsername }) => {
    const history = useHistory();
    const [categories, setCategories] = useState([]);
    const [disabled, setDisabled] = useState(true);


    async function getCategory() {
        const response = await categoriesList()
        setCategories(response);
    }

    const checkuserName = (event) => {
        setUsername(event.target.value);
    }

    const handleChange = (e) => {
        setDisabled(false)
        setSelectedOption(e.target.value)
    }

    const handleClick = (e) => {


        if (username === '') {
            toast.promise(
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('Not save')
                    }, 2000);
                }),
                {
                    loading: 'Your data will not save', // Message to show while promise is resolving
                }
            ).then(() => {
                history.push('/question-page');
            });
        }
        else {
            history.push('/question-page');
        }
    }


    useEffect(() => {
        getCategory()

    }, [])

    return (
        <div className='quiz__homepage'>
            <Toaster
                toastOptions={{
                    icon: '⚠',
                    position: 'top-right',
                    style: {
                        fontFamily: 'var(--font-family)',
                        padding: '0.5rem'
                    }
                }}
            />
            <div className='quiz__homepage-container'>
                <h1>Welcome to Quiz App</h1>
                <h2>Pick a category</h2>

                <div className='quiz__hompage-container_categorybox'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Pick a category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                            label="category"
                            sx={{
                                fontFamily: 'var(font-family)'
                            }}
                        >
                            {
                                categories.map((el, id) => {
                                    return (
                                        <MenuItem
                                            sx={{
                                                fontFamily: 'var(font-family)'
                                            }}
                                            key={id}
                                            value={el.id}
                                        >
                                            {el.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className='quiz__homepage-container_btnBox'>

                    <input type='text'
                        placeholder='Enter Your Name'
                        onChange={checkuserName}
                        value={username}
                    />

                    <Button
                        onClick={handleClick}
                        value="start"
                        disabled={disabled}
                        variant="contained"
                        color="success"
                        sx={{
                            width: '200px',
                            fontFamily: 'var(--font-family)',
                            fontSize: '16px',
                            fontWeight: '400'
                        }}
                    >
                        Start
                    </Button>
                </div>
            </div>

            <div className='quiz__homepage-btnbox'>
                <button onClick={() => {history.push('/leaderboard-page')}} className='leaderboard-btn'>Leaderboard</button>
                <a href='https://github.com/MrVardanyan777' target='_blank' rel="noreferrer" ><button  className='github-btn'>Get Code</button></a>
            </div>
        </div>
    )
}

export default Homepage;