import React from 'react'
import { Fragment } from 'react';
import CityDesc from '../components/cityinfo/CityDesc';
import ImageSlideshow from '../components/cityinfo/ImageSlideShow';
import Weather from '../components/cityinfo/Weather';
import MapBox from '../components/MapBox';
import NavBar from '../components/NavBar'
import '../styles/cityInfoPage.css'
import Bangalore from '../components/cityinfo/loadImages.js'
import PlaceList from '../components/cityinfo/PlaceList';

function CityInfoPage() {
  const images = Object.entries(Bangalore);
  return (
    <Fragment>
      <NavBar />
      <div className="cityInfo-header"><h2>Header</h2></div>
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
            <h2 style={{ padding: '10px 3px', marginBottom: '13px', borderBottom: '3px solid' }}><span style={{ color: '#777575' }}>Attractions</span> in Bengaluru</h2>
            <PlaceList />
          </div>
          <div className="cityInfo-map-box">
            <div className="cityInfo-filterBox">
              <label for="place">Filters</label>
              <select name="places" id="places">
                <option value="attraction">Attraction</option>
                <option value="hospital">Hospital</option>
                <option value="college">College</option>
                <option value="school">School</option>
                <option value="police">Police Station</option>
                <option value="oldage">Old Age Home</option>
              </select>
            </div>
            <MapBox />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CityInfoPage;