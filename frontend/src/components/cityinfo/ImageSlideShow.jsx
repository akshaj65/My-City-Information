import React, { useState, useEffect } from 'react';
import './slideshow.css';

const ImageSlideshow = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slideIndex === images.length - 2) {
        setIsReversed(true);
      } else if (slideIndex === 0) {
        setIsReversed(false);
      }

      setSlideIndex((prevIndex) => {
        if (isReversed) {
          return prevIndex - 1;
        } else {
          return prevIndex + 1;
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [slideIndex, images, isReversed]);
  return (
    <div className="slideshow-container">
      <div
        className="slides-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {images.map((element) => {
          element = element[1];
          // console.log(element.id);
          return (
            <div key={element.id} className="mySlides">
              <img key={element.id} src={element.image}  alt="myimage" />
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default ImageSlideshow;
