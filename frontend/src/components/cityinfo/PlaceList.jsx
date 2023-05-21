import React, { Fragment, useEffect, useRef, useState } from "react";
import './placelist.css'
import { getAttraction } from "../../redux/actions/attractionAction";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaces } from "../../redux/actions/allPlacesAction";
import PlaceCard from "./PlaceCard";
import AttractionList from "./AttractionList";
import Loader from "../Loader";


function PlaceList({ placeType, cityName, setMapData, activeCard, setActiveCard }) {
  const dispatch = useDispatch();
  const { attractionLoading, attractionError, attraction } = useSelector(state => state.attractions)
  const { allPlacesError, allPlacesLoading, data } = useSelector(state => state.places)

  const BREAKPOINT = 768; // Change this value to your desired breakpoint

  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef();


  useEffect(() => {

    if (placeType === 'Attractions') {
      dispatch(getAttraction(cityName));

    } else {
      dispatch(fetchPlaces(placeType, cityName));
    }

  }, [dispatch, cityName, placeType])

  useEffect(() => {
    if (placeType === 'Attractions') {
      // console.log(attraction);
      setMapData(attraction);
    } else {
      setMapData(data);
    }
  }, [attraction, data, setMapData, placeType]);


  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(
      window.innerWidth <= BREAKPOINT
        ? event.pageX - sliderRef.current.offsetLeft - position
        : event.pageY - sliderRef.current.offsetTop - position
    );
  };

  const handleTouchStart = (event) => {
    setIsDragging(true);
    setStartX(
      window.innerWidth <= BREAKPOINT
        ? event.touches[0].pageX - position + 20
        : event.touches[0].pageY - position
    );
  };



  const handleMouseUp = () => {
    setIsDragging(false);
  };


  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const newPosition =
      window.innerWidth <= BREAKPOINT
        ? event.pageX - sliderRef.current.offsetLeft - startX + 20
        : event.pageY - sliderRef.current.offsetTop - startX;
    setPosition(
      Math.min(
        0,
        Math.max(
          -sliderRef.current.clientWidth + window.innerWidth,
          newPosition
        )
      )
    );
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const newPosition =
      window.innerWidth <= BREAKPOINT
        ? event.touches[0].pageX - startX
        : event.touches[0].pageY - startX;
    setPosition(
      Math.min(
        0,
        Math.max(
          -sliderRef.current.clientWidth + window.innerWidth,
          newPosition
        )
      )
    );
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMoveLeft = () => {
    const newPosition = sliderRef.current.scrollLeft - 200; // Change 200 to the desired number of pixels to move left
    if (newPosition >= 0) {
      sliderRef.current.scrollLeft = newPosition;
    }
  };

  const handleMoveRight = () => {
    const newPosition = sliderRef.current.scrollLeft + 200; // Change 200 to the desired number of pixels to move right
    if (newPosition <= sliderRef.current.scrollWidth - sliderRef.current.clientWidth) {
      sliderRef.current.scrollLeft = newPosition;
    }
  };



  return (
    <>
      <button className="placeList-btn" onClick={handleMoveLeft}>&lt;</button>
      <div className="placeList"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
        style={{
          transform: `translate${window.innerWidth <= BREAKPOINT ? "X" : "Y"
            }(${position}px)`,
        }}
      >


        {/* {console.log(placeType)} */}
        {placeType === 'Attractions' ? (
          attractionLoading ? (
            <div><Loader /></div>

          ) : attractionError ? (
            <div className="error">{attractionError}</div>
          ) :
            attraction && <AttractionList attraction={attraction} setActiveAttraction={setActiveCard} activeAttraction={activeCard} />

        ) : (
          <Fragment>
            {allPlacesLoading ? (
              <div><Loader /></div>

            ) : allPlacesError ? (
              <div className="error">{allPlacesError}</div>
            ) :
              data && data.map((place) => (
                <PlaceCard key={place._id} place={place} placeType={placeType} setActivePlace={setActiveCard} activePlace={activeCard} />
              ))
            }
          </Fragment>
        )}

      </div>
      <button className="placeList-btn" onClick={handleMoveRight}>&gt;</button>
    </>
  );
}

export default PlaceList; 