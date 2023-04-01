import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { can_add_rtaing_api, send_rating_api } from '../../assets/assets';
import './StarRating.css';
import CustomSnackBar from '../Snackbar/Snackbar';

function StarRating({campId}) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review,setReview] = useState("");
  const [canAddRate,setCanAddRate] = useState(false);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleRatingClick(ratingValue) {
    setRating(ratingValue);
  }

  useEffect(()=>{
    can_add_rating()
  },[])

  const can_add_rating = ()=>{
    fetch(`${can_add_rtaing_api(campId)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        res.json().then((res) => {
        setCanAddRate(res.shouldShow)
        })
        .finally((res)=>{
          
        })
        ;
      })
      .catch((res) => {
       
      });
  }
  
  function handleEmojiHover(e, ratingValue) {
    if (ratingValue > rating) {
      e.target.style.transform = 'scale(1.2)';
      setHoveredRating(ratingValue);
    }
  }

  const rating_api = ()=>{
    fetch(`${send_rating_api(campId)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({rate:rating,review:review}),
    })
      .then((res) => {
        res.json().then((res) => {
            setSnackBarMessage("Thanks for rating");
            setMessageType("success");
            setSnackBarVisible(true);
            setCanAddRate(false);
        })
        .finally((res)=>{
          setProgress(false);
        })
        ;
      })
      .catch((res) => {
       
      });
      
  }

  function handleEmojiLeave(e) {
    e.target.style.transform = 'scale(1)';
    setHoveredRating(0);
  }

  const labels = {
    1: 'Disappointed',
    2: 'Neutral',
    3: 'Satisfied',
    4: 'Happy',
    5: 'Ecstatic',
  };

  return (
    <>
     <CustomSnackBar
          snackBarVisible={snackBarVisible}
          message={snackBarMessage}
          messageType={messageType}
        />
    {canAddRate && <div style={{textAlign:'center'}}>
      <h2>Please rate your experience:</h2>
      <div className='star-container'>
        <span
          role='img'
          aria-label='disappointed face'
          onClick={() => handleRatingClick(1)}
          onMouseEnter={e => handleEmojiHover(e, 1)}
          onMouseLeave={handleEmojiLeave}
          className={`star ${rating === 1 ? 'active' : ''} ${
            hoveredRating === 1 ? 'hovered' : ''
          }`}
        >
          😕
        </span>
        <span
          role='img'
          aria-label='neutral face'
          onClick={() => handleRatingClick(2)}
          onMouseEnter={e => handleEmojiHover(e, 2)}
          onMouseLeave={handleEmojiLeave}
          className={`star ${rating === 2 ? 'active' : ''} ${
            hoveredRating === 2 ? 'hovered' : ''
          }`}
        >
          😐
        </span>
        <span
          role='img'
          aria-label='slightly smiling face'
          onClick={() => handleRatingClick(3)}
          onMouseEnter={e => handleEmojiHover(e, 3)}
          onMouseLeave={handleEmojiLeave}
          className={`star ${rating === 3 ? 'active' : ''} ${
            hoveredRating === 3 ? 'hovered' : ''
          }`}
        >
          🙂
        </span>
        <span
          role='img'
          aria-label='smiling face with smiling eyes'
          onClick={() => handleRatingClick(4)}
          onMouseEnter={e => handleEmojiHover(e, 4)}
          onMouseLeave={handleEmojiLeave}
          className={`star ${rating === 4 ? 'active' : ''} ${
            hoveredRating === 4 ? 'hovered' : ''
          }`}
        >
          😊
        </span>
        <span
          role='img'
          aria-label='heart eyes'
          onClick={() => handleRatingClick(5)}
          onMouseEnter={e => handleEmojiHover(e, 5)}
          onMouseLeave={handleEmojiLeave}
          className={`star ${rating === 5 ? 'active' : ''} ${
            hoveredRating === 5 ? 'hovered' : ''
          }`}
        >
          😍
        </span>
      </div>
      <p>
        {rating
          ? `You rated your experience as ${labels[rating]} (${rating}/5)`
          : 'How would you rate your experience?'}
      </p>
      <Box className={"textf"}>
        <TextField placeholder='Add Your Review' autoComplete='off' style={{flex:3}} variant='outlined' onChange={(e)=>setReview(e.target.value)} />
        <Button  variant='outlined' style={{flex:1}} onClick={rating_api}>Add Review</Button>
      </Box>
    </div>}

    {!canAddRate && <TextField fullWidth value={"You have rated this campground already!"} disabled={true}/>}
    
    </>
  );
}

export default StarRating;
