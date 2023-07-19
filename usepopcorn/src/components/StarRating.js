import {useState} from 'react';
import PropTypes from "prop-types";

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
};

const starContainerStyle = {
  display: 'flex',
  gap: '4px'
};

const Star = ({
                onRate, full,
                onEnter, onLeave,
                color, size
              }) => {

  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: 'pointer',
    color
  }

  return (
    <span style={starStyle}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={onRate}>
    {full ? (<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={color}
        stroke="#000"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>)
      : (<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke={color}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>)
    }
</span>
  )
}

const StarRating = ({
                      maxRating = 5,
                      defaultRating = 0,
                      classname = "",
                      color = '#fcc419',
                      messages = [],
                      size = 48,
                      onRateChange
                    }) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onRateChange && onRateChange(rating);
  }


  const textStyle = {
    lineHeight: '1',
    margin: '0',
    fontSize: `${size / 1.5}px`,
    color
  };

  return (
    <div style={containerStyle} className={classname}>
      <div style={starContainerStyle}>
        {Array.from({length: maxRating}, (_, i) => (
          <Star key={i}
                onEnter={() => setTempRating(i + 1)}
                onLeave={() => setTempRating(0)}
                onRate={() => handleRating(i + 1)}
                color={color}
                size={size}
                defaultRating={defaultRating}
                full={tempRating ? i < tempRating : i < rating}/>
        ))}
      </div>
      <p style={textStyle}>{messages.length === maxRating + 1
        ? messages[tempRating ? tempRating
          : rating ? rating : 0]
        : tempRating || rating || ""}</p>
    </div>
  );
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating : PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  classname: PropTypes.string,
  onRateChange: PropTypes.func
}
export default StarRating;


/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128

FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 /52 / 62 / 74 / 86 / 98
*/

