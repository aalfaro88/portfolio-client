// MiniGame

import React, { useState, useEffect } from 'react';
import { post, get } from '../../services/authService';
import './MiniGame.css';
import { SERVER_URL } from '../../services/SERVER_URL';

function MiniGame() {
  const [gridLetters, setGridLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [wordsList, setWordsList] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [dictionary, setDictionary] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [topScores, setTopScores] = useState([]);
  const TOP_SCORES_COUNT = 20; 

  const points = {
    A: 2,
    B: 4,
    C: 4,
    D: 3,
    E: 1,
    F: 4,
    G: 4,
    H: 3,
    I: 2,
    J: 5,
    K: 4,
    L: 3,
    M: 4,
    N: 2,
    O: 2,
    P: 4,
    Q: 6,
    R: 3,
    S: 2,
    T: 2,
    U: 3,
    V: 4,
    W: 4,
    X: 5,
    Y: 4,
    Z: 6,
  };

  const consonants = [
    'B',
    'B',
    'C',
    'C',
    'D',
    'D',
    'D',
    'F',
    'F',
    'G',
    'G',
    'H',
    'H',
    'J',
    'K',
    'L',
    'L',
    'L',
    'M',
    'M',
    'N',
    'N',
    'N',
    'P',
    'P',
    'R',
    'R',
    'R',
    'R',
    'S',
    'S',
    'S',
    'S',
    'T',
    'T',
    'T',
    'T',
    'V',
    'W',
    'W',
    'Y',
    'Z',
  ];
  const vocals = ['A', 'A', 'A', 'A', 'A', 'E', 'E', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'O', 'U', 'U'];
  const letters = consonants.concat(vocals);

  useEffect(() => {
    // Call fetchTopScores when the component mounts
    fetchTopScores();
  }, []); 

  useEffect(() => {
    const loadDictionaryData = async () => {
      try {
        const response = await get('/dictionary');
        if (response.status === 200) {
          console.log('Successfully loaded dictionary from server');
          const dictionaryArray = response.data.split('\n');
          setDictionary(dictionaryArray);
        } else {
          console.error('Error fetching dictionary data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dictionary data:', error);
      }
    };

    loadDictionaryData();
  }, []);

  useEffect(() => {
    let intervalId;
    if (isGameStarted && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isGameStarted) {
      // Set game over when the timer reaches zero and the game is started
      setGameOver(true);
      clearInterval(intervalId); // Clear the interval
    }

    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, [isGameStarted, timer]);

  const handleStartGame = () => {
    // Reset all game-related state variables
    setIsGameStarted(true);
    setTimer(60); // Reset the timer to the initial value (change to your desired initial time)
    setWordsList([]); // Clear the list of valid words
    setSelectedLetters([]); // Clear selected letters
    setCurrentWord(''); // Clear current word
    setGameOver(false); // Reset game over state
  
    populateGrid();
  
  };
  

  const populateGrid = () => {
    const newGridLetters = Array.from({ length: 25 }, () => {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      return { letter: randomLetter, points: points[randomLetter] };
    });
    setGridLetters(newGridLetters);
  };

  const handleShuffle = () => {
    setTimer((prevTimer) => Math.max(prevTimer - 3, 0));
  
    const shuffledGrid = [...gridLetters];
    for (let i = shuffledGrid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledGrid[i], shuffledGrid[j]] = [shuffledGrid[j], shuffledGrid[i]];
    }
    setGridLetters(shuffledGrid);
  };

  const handleMouseDown = (letter, index) => {
    setIsSelecting(true);
    setSelectedLetters([{ letter, index }]);
  };
  
  const handleMouseEnter = (letter, index) => {
    if (isSelecting) {
      const lastSelectedIndex = selectedLetters[selectedLetters.length - 1].index;
  
      // Check if the letter is adjacent to the last selected letter and not already selected
      if (isNeighbor(index, lastSelectedIndex) && !selectedLetters.find((item) => item.index === index)) {
        setSelectedLetters([...selectedLetters, { letter, index }]);
      }
    }
  };

const handleMouseUp = () => {
  setIsSelecting(false);
  const word = selectedLetters.map((l) => l.letter).join('').toLowerCase(); // Convert to lowercase for case-insensitive check

  if (isWordInDictionary(word)) {
    // Word is valid, add it to the list of valid words
    setWordsList((prevWordsList) => [...prevWordsList, word]);

    // Replace selected letters in the grid
    const updatedGridLetters = [...gridLetters];
    selectedLetters.forEach(({ index }) => {
      // Replace the letter with a new random letter
      updatedGridLetters[index] = getRandomLetter();
    });
    setGridLetters(updatedGridLetters);

    // Clear the selected letters
    setSelectedLetters([]);
    
    // Check word length and add time accordingly
    if (word.length > 5) {
      setTimer((prevTimer) => prevTimer + 10); // Add 10 seconds for words longer than 5 letters
    } else if (word.length > 4) {
      setTimer((prevTimer) => prevTimer + 5); // Add 5 seconds for words longer than 4 letters
    }
  } else {
    console.log(`Word "${word}" does not exist in the dictionary.`);
    // Invalid word, clear the selected letters
    setSelectedLetters([]);
  }
};


  // Function to get a random letter
  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    return { letter: letters[randomIndex], points: points[letters[randomIndex]] };
  };

  const isWordInDictionary = (word) => {
    return dictionary.includes(word);
  };

  const calculateWordPoints = (word) => {
    let totalPoints = 0;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i].toUpperCase();
      if (points.hasOwnProperty(letter)) {
        totalPoints += points[letter];
      }
    }
    return totalPoints;
  };

  const calculateTotalScore = () => {
    let totalScore = 0;
    wordsList.forEach((word) => {
      totalScore += calculateWordPoints(word);
    });
    return totalScore;
  };

  const sendScoreToServer = async (score) => {
    try {
      const response = await post('/users/update-score', { score });
  
      if (response.status === 200) {
        console.log('Score updated successfully');
      } else {
        console.error('Failed to update score:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };
  
  // Call sendScoreToServer with the user's score when the game is over
  if (gameOver) {
    const userScore = calculateTotalScore();
    sendScoreToServer(userScore);
  }
  
  const fetchTopScores = async () => {
    try {
      const response = await get(`/users/scores/top?limit=${TOP_SCORES_COUNT}`);
      if (response.status === 200) {
        console.log(response);
        setTopScores(response.data);
      } else {
        console.error('Error fetching top scores data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching top scores data:', error);
    }
  };
  

  const isNeighbor = (index1, index2) => {
    const row1 = Math.floor(index1 / 5);
    const col1 = index1 % 5;
    const row2 = Math.floor(index2 / 5);
    const col2 = index2 % 5;

    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);

    return rowDiff <= 1 && colDiff <= 1 && rowDiff + colDiff > 0;
  };


  return (
    <div className="mini-game-component">
        <h1 className="title">Word Minigame</h1>
        <div className='game-instructions'>
          <h3>Connect letters to complete as many words as possible in 1 minute!</h3>
          <p>
              Remember the rules: You have one minute to complete as many words as possible.<br />
              If you shuffle the letters, you lose 3 seconds. <br />
              For words of 5 characters, you get an additional 5 seconds, and for words with more than 5 letters, you earn 10 extra seconds.
          </p>
        </div>

        {(!isGameStarted || gameOver) && (
            <button className="start-button" onClick={handleStartGame}>
                Start Game
            </button>
        )}

        {gameOver && (
            <div>
                <p className="gameover-text">Game Over! Your Score: {calculateTotalScore()}</p>
            </div>
        )}

        <div className="game-arrange">
            <div className="word-section">
                <div className="valid-words-table">
                    <table className="table-common">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wordsList.map((word, index) => (
                                <tr key={index}>
                                    <td>{word}</td>
                                    <td>{calculateWordPoints(word)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="game-container">
                {isGameStarted && !gameOver ? (
                    <div className="grid">
                        {gridLetters.map((item, index) => (
                            <button
                                key={index}
                                onMouseDown={() => handleMouseDown(item.letter, index)}
                                onMouseEnter={() => handleMouseEnter(item.letter, index)}
                                onMouseUp={handleMouseUp}
                                className={selectedLetters.some((l) => l.index === index) ? 'selected-letter' : ''}
                            >
                                {item.letter}
                                <sub>{item.points}</sub>
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="game-functions">
                {isGameStarted && !gameOver ? (
                    <>
                        <p className="timer-text">Timer: {timer}</p>
                        <button className="shuffle-button" onClick={handleShuffle}>
                            Shuffle
                        </button>
                    </>
                ) : (
                    <div className="score-section">
                        <table className="table-common score-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Username</th>
                                    <th>Score</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topScores.map((score, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{score.username}</td>
                                        <td>{score.max_points}</td>
                                        <td>{new Date(score.max_points_date).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    </div>
);

}

export default MiniGame;
