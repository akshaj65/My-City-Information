import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/slideshow.css';

const ImageSlideshow = ({ cityName }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const timers = images.map((image, index) => {
      return setTimeout(() => {
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
      }, (index + 1) * 3000); // multiply index by 2000 to stagger the timeouts
    });
  
    return () => timers.forEach((timer) => clearTimeout(timer));

  }, [slideIndex, images, isReversed]);


  const importAll = useCallback((r) => {
    return r.keys()
      .filter(filename => filename.startsWith(`./${cityName}/`))
      .map((key) => ({
        name: key.substr(2),
        src: r(key),
      }));
  }, [cityName]);

  useEffect(() => {
    const importImages = async () => {
      const imageFiles = await importAll(require.context('../../Images', true, /\.(png|jpe?g|gif|jfif)$/));
      setImages(imageFiles);
    };
    importImages();
  }, [importAll]);


  return (
    <div className="slideshow-container">
      <div
        className="slides-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {images.map((image) => {
          // image = image[1];
          // console.log(image.id);
          return (
            <div key={image.name} className="mySlides">
              <img key={image.name} src={image.src} alt={image.name} />
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default ImageSlideshow;
