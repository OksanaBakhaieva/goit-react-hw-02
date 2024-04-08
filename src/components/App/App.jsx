import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import Notification from '../Notification/Notification';
import css from './App.module.css';



export default function App() {
  const getInitialClicks = () => {
  const savedClicks = localStorage.getItem('feedbackCount');
  return savedClicks !== null ? JSON.parse(savedClicks) : {
        good: 0,
        neutral: 0,
        bad: 0,
        };
};
  const [rating, setRating] = useState(getInitialClicks); 
    
  const updateFeedback = feedbackType => {
    setRating(prevState => {
      return {
        ...prevState,
        [feedbackType]: prevState[feedbackType] + 1,
      };
    });
  };

  const resetRating = () => {
    setRating({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const { good, neutral, bad } = rating;
  const totalFeedback = good + neutral + bad;
  const positiveFeedback = totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
  // const positiveFeedback = totalFeedback > 0 ? (Math.round(good / totalFeedback) * 100) : 0;

  useEffect(() => {
    localStorage.setItem('feedbackCount', JSON.stringify(rating));
  }, [rating]);

  return (
    <div className={css.container}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetRating={resetRating}
        summaryRating={totalFeedback}
      />
      {totalFeedback > 0 ? (
        < Feedback
          rating={rating}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}