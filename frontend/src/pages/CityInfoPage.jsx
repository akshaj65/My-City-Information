import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import CityDesc from '../components/cityinfo/CityDesc';
import ImageSlideshow from '../components/cityinfo/ImageSlideShow';
import Weather from '../components/cityinfo/Weather';
import MapBox from '../components/MapBox';
import NavBar from '../components/NavBar'
import '../styles/cityInfoPage.css'
import Bangalore from '../components/cityinfo/loadImages.js'
import PlaceList from '../components/cityinfo/PlaceList';
import { Link, useLocation } from 'react-router-dom';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaceType } from '../actions/placeTypeAction';
import { getCity } from '../actions/cityAction';
import CityNotFound from '../components/cityinfo/CityNotFound';
import Loader from '../components/Loader';

function CityInfoPage() {
  const cityName =  useLocation().pathname.split('/').pop();
  const images = Object.entries(Bangalore);
  const dispatch = useDispatch();
  const placeType = useSelector(state => state.placeType.placeType);
  const { error, loading, city } = useSelector(state => state.cityData);
  const [mapData, setMapData] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const handlePlaceTypeChange = (event) => {
    dispatch(setPlaceType(event.target.value));
  };
  useEffect(() => {
    dispatch(getCity(cityName))

  }, [cityName, dispatch])


  return (
    <div>
      <NavBar />
      {loading ? (
        <div><Loader /></div>

      ) : error ? (
        error === "City Not Found" ? <><CityNotFound /></> : <div>{error}</div>
      ) : (!loading && city.data && (
        <div>
          <div className="cityInfo-header">
            <div className="cityInfo-header-leftSide">
              <div className="cityInfo-header-city">
                <Link to={'/city'}>city</Link> &gt; <Link>{city.data.cityName}</Link>
              </div>
              <div className="cityInfo-header-city-name">
                <h3 style={{ "textTransform": "capitalize" }}>{city.data.cityName}</h3>
              </div>
            </div>
            <div className="cityInfo-header-rightSide">
              <Search />
            </div>
          </div>
          <div className="cityInfo-container">
            <div className="cityInfo-top-section">
              <div className="cityInfo-first-box">
                <CityDesc city={city.data} />
                <div className="cityTransport">
                  <h4>Transport</h4>
                  <div style={{ 'margin': '11px 46px' }}>
                    <Link to={`/city/${cityName}/bus`} style={{ 'paddingRight': '18px' }}>Bus</Link>
                    <Link to={`/city/${cityName}/train`}>Train</Link>
                  </div>
                </div>
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
            <h2 className='cityInfo-placeList-header'><span style={{ color: '#777575' }}>{placeType}</span> in Bengaluru</h2>
            <div className="cityInfo-bottom-section">

              <div className="cityInfo-list-box">

                <PlaceList placeType={placeType} setMapData={setMapData} activeCard={activeCard} setActiveCard={setActiveCard} />
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
                <MapBox mapData={mapData} activeCard={activeCard} setActiveCard={setActiveCard} />
              </div>
            </div>
          </div>
        </div>)
      )}
    </div>
  )
}

export default CityInfoPage;