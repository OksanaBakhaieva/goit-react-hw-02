import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import Notifications from '../Notifications/Notifications';
import css from './App.module.css';

export default function App() {
  const [rating, setRating] = useState(
    localStorage.getItem('key')
      ? JSON.parse(localStorage.getItem('key'))
      : {
        good: 0,
        neutral: 0,
        bad: 0,
        }
  );
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
  const averageRate = Math.round(((good + neutral)/ totalFeedback) * 100);

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(rating));
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
        <Feedback
          rating={rating}
          totalFeedback={totalFeedback}
          averageRate={averageRate}
        />
      ) : (
        <Notifications />
      )}
    </div>
  );
}