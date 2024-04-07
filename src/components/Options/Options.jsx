import css from './Options.module.css';

export default function Options ({ updateFeedback, resetRating, summaryRating }) {
    return (
        <>
            <ul className={css.options}>
                <button type="button" onClick={() => updateFeedback('good')}>Good</button>
                <button type="button" onClick={() => updateFeedback('neutral')}>Neutral</button>
                <button type="button" onClick={() => updateFeedback('bad')}>Bad</button>
                {summaryRating > 0 ? <button type="button" onClick={resetRating}>Reset</button> : null} 
            </ul>
        </>
    );
}

