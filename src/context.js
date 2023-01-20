import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''

// const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10, category: 'sports', difficulty: 'easy', type: 'multiple'
  });
  const [isModelOpen, setIsModelOpen] = useState(false);

  const fetchQuestions = async (url) => {
    setWaiting(false)
    setLoading(true);
    const response = await axios(url).catch(err => console.error(err));
    console.log(response);
    if (response) {
      const data = response.data.results;
      console.log(data);
      if (data.length > 0) {
        setQuestions(data);
        setWaiting(false)
        setLoading(false);
        setError(false);
      } else {
        setWaiting(true)
        setError(true);
        setLoading(false);
      }

    } else {
      console.log('no response');
      setError(true);
    }
  }

  // useEffect(() => {
  //   fetchQuestions(tempUrl);
  //   // eslint-disable-next-line
  // }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${API_ENDPOINT}amount=${quiz.amount}&category=${table[quiz.category]}&difficulty=${quiz.difficulty}&type=${quiz.type}`;
    fetchQuestions(url);
  }

  return <AppContext.Provider
    value={{
      waiting, loading, questions, index, correct, error, isModelOpen, setIndex, setCorrect, setIsModelOpen, setWaiting,
      quiz, handleChange, handleSubmit
    }}
  >{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }