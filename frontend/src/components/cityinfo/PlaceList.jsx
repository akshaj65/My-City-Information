import React, { useEffect, useRef, useState } from "react";
import './placelist.css'
import AttractionCard from "./AttractionCard";
import { getAttraction } from "../../actions/attractionAction";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaces } from "../../actions/allPlacesAction";
import PlaceCard from "./PlaceCard";
import AttractionList from "./AttractionList";


function PlaceList({ placeType ,setMapData,activeCard,setActiveCard}) {
  const dispatch = useDispatch();
  const { loading, error, attraction } = useSelector(state => state.attractions)
  const { data } = useSelector(state => state.places)


  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef();


  useEffect(() => {

    if (placeType === 'Attractions') {
      console.log(placeType);
      dispatch(getAttraction('Bengaluru'));

    } else {
      dispatch(fetchPlaces(placeType, 'Bengaluru'));
    }

  }, [dispatch, placeType])

  useEffect(() => {
    if (placeType === 'Attractions') {
      setMapData(attraction);
    }else{
      setMapData(data);
    }
  }, [attraction, data,setMapData]);


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
      {/* {console.log(placeType)} */}
      {placeType === 'Attractions' ? (
        attraction && <AttractionList attraction={attraction} setActiveAttraction={setActiveCard} activeAttraction={activeCard}/>
      ) : (
        data && data.map((place) => (
          <PlaceCard key={place._id}place={place} />
        ))
      )}

    </div>
  );
}

export default PlaceList;