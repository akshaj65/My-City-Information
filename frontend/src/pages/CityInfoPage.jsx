import React, { useState } from 'react'
import { Fragment } from 'react';
import CityDesc from '../components/cityinfo/CityDesc';
import ImageSlideshow from '../components/cityinfo/ImageSlideShow';
import Weather from '../components/cityinfo/Weather';
import MapBox from '../components/MapBox';
import NavBar from '../components/NavBar'
import '../styles/cityInfoPage.css'
import Bangalore from '../components/cityinfo/loadImages.js'
import PlaceList from '../components/cityinfo/PlaceList';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaceType } from '../actions/placeTypeAction';

function CityInfoPage() {
  const images = Object.entries(Bangalore);
  const dispatch = useDispatch();
  const placeType = useSelector(state => state.placeType.placeType);
  const [mapData, setMapData] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const handlePlaceTypeChange = (event) => {
    dispatch(setPlaceType(event.target.value));
  };
  return (
    <Fragment>
      <NavBar />
      <div className="cityInfo-header">
        <div className="cityInfo-header-leftSide">
          <div className="cityInfo-header-city">
            <Link to={'/city'}>city</Link> &gt; <Link>bengaluru</Link>
          </div>
          <div className="cityInfo-header-city-name">
            <h3>Bengaluru</h3> 
          </div>
        </div>
        <div className="cityInfo-header-rightSide">
          <Search/>
        </div>
      </div>
      <div className="cityInfo-container">
        <div className="cityInfo-top-section">
          <div className="cityInfo-first-box">
            <CityDesc />

          </div>
          <div className="cityInfo-second-box">
            <div className="cityImages">
              <ImageSlideshow images={images} />
            </div>
            <div className="cityWeather">
              <Weather />
            </div>
          </div>
        </div>
        <div className="cityInfo-bottom-section">
          <div className="cityInfo-list-box">
            <h2 style={{ padding: '10px 3px', marginBottom: '13px', borderBottom: '3px solid' }}><span style={{ color: '#777575' }}>{placeType}</span> in Bengaluru</h2>
            <PlaceList placeType={placeType} setMapData={setMapData} activeCard={activeCard} setActiveCard={setActiveCard}/>
          </div>
          <div className="cityInfo-map-box">
            <div className="cityInfo-filterBox">
              <label>Filters</label>
              <select name="places" id="places" value={placeType} onChange={handlePlaceTypeChange}>
                <option value="Attractions">Attraction</option>
                <option value="Hospitals">Hospital</option>
                <option value="Colleges">College</option>
                <option value="Schools">School</option>
                <option value="PoliceStations">Police Station</option>
                <option value="OldAgeHomes">Old Age Home</option>
              </select>
            </div>
            <MapBox mapData={mapData} activeCard={activeCard} setActiveCard={setActiveCard}/>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CityInfoPage;