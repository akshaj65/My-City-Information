import React, { useEffect, useRef, useState } from "react";
import './placelist.css'
import AttractionCard from "./AttractionCard";

const places = [
  {
    "index": 0,
    "name": "Lalbagh",
    "address": "Mavalli, Bangalore - 560004",
    "description": "A botanical garden and historic park in Bangalore, known for its beautiful gardens and glasshouse.",
    "latitude": 12.9507,
    "longitude": 77.5848,
    "imageUrls": [
      "https://farm66.staticflickr.com/65535/52797541993_6bbf147c9a.jpg",
      "https://farm66.staticflickr.com/65535/52776951859_d01e6d7c58.jpg",
      "https://farm66.staticflickr.com/65535/52776802920_762fa62a01.jpg",
    ]

  },
  {
    "index": 1,
    "name": "Cubbon Park",
    "address": "Kasturba Road, Behind High Court of Karnataka, Bengaluru - 560001",
    "description": "A popular park in Bengaluru known for its lush greenery, walking trails, and recreational activities.",
    "latitude": 12.9762,
    "longitude": 77.5907,
    "imageUrls": [
      "https://farm66.staticflickr.com/65535/52768082229_4cc48205e1.jpg",
      "https://farm66.staticflickr.com/65535/52672464721_c58fe2bd05.jpg",
      "https://farm66.staticflickr.com/65535/52671956057_90b19aa380.jpg",
    ]
  },
  {
    "index": 2,
    "name": "ISKCON Temple, Bangalore",
    "address": "Hare Krishna Hill, Chord Rd, Rajajinagar, Bengaluru - 560010",
    "description": "A famous temple in Bengaluru dedicated to Lord Krishna, known for its spiritual ambiance and architectural beauty.",
    "latitude": 12.9952,
    "longitude": 77.5510,
    "imageUrls": [
      "https://farm66.staticflickr.com/65535/52660659184_12d6aa2c96.jpg",
      "https://farm66.staticflickr.com/65535/52639169882_3ec9f585f7.jpg",
      "https://farm66.staticflickr.com/65535/50677169441_db68f874a8.jpg"
    ]
  },
];

function PlaceList() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(null);



  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((slideIndex + 1) % places[slideIndex].imageUrls.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideIndex,]);

  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef();

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.pageX - sliderRef.current.offsetLeft - position);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const newPosition = event.pageX - sliderRef.current.offsetLeft - startX;
    setPosition(Math.min(0, Math.max(-sliderRef.current.clientWidth + window.innerWidth, newPosition)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (event) => {
    setIsDragging(true);
    setStartX(event.touches[0].pageX - position);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const newPosition = event.touches[0].pageX - startX;
    setPosition(Math.min(0, Math.max(-sliderRef.current.clientWidth + window.innerWidth, newPosition)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="placeList"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >

      {places.map((place, index) => (
        <AttractionCard place={place} index={index} activeCard={activeCard} slideIndex={slideIndex} setActiveCard={setActiveCard} />
      ))}
    </div>
  );
}

export default PlaceList;