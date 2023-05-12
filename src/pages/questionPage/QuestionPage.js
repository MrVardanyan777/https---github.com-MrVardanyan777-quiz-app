import React, { useEffect, useState } from 'react';
import './questionpage.css';
import { questionList } from "../../api";
import { useHistory } from 'react-router-use-history';


const QuestionPage = ({ selectedOption, setCount, count }) => {
  const history = useHistory();
  const [questions, setQuestions] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);

  const handleClick = (event) => { 
      // let buttonNumber = +event.target.value + 1;
      let rightAnswer = questions[questionNumber].correct_answer;
      let userAnswer = event.target.innerText; 
      if (rightAnswer === userAnswer) {
        setCount(count + 1);
      } 

          setQuestionNumber(questionNumber + 1)
  

      if (questionNumber + 1 === 10){
          history.push('/final-page')
      }
  }


  async function question() {
    const response = await questionList(selectedOption);
    const newData = response.map((element) => {
      return {
        ...element,
        answers: [...element.incorrect_answers, element.correct_answer].sort(),

      }
    })
    setQuestions(newData)
    console.log(newData)
  }


  useEffect(() => {
    question()
  }, [])

  return (
    <div className='quiz__question-page_main'>
      {
        questions != null ?
          <div className='quiz__questionpage-mainBox'>

            <p className='quiz__questionpage-questionNumber'>Questions {questionNumber + 1 < 10 ? `0${questionNumber + 1}` : 10}</p>
            <p className='quiz__questionpage-questionDifficulty' style={{
              backgroundColor: questions[questionNumber].difficulty === 'hard' ? '#EF7D54': 
              questions[questionNumber].difficulty === 'medium' ?  '#EAC505':
              '#42A976'}}> 
            {questions[questionNumber].difficulty} 
            </p>
            <h2>{questions[questionNumber].question}</h2>
            <div className='quiz__questionpage-btnBox'>
            {
              questions[questionNumber].answers.map((element, index) => {
                return (
                  <button onClick={handleClick}>{element}</button>
                )
              })
            }
            </div>
          </div>
          :
          null
      }
    </div>
  )
}

export default QuestionPage