import React, { useEffect, useState } from 'react';
import '../styles/cityInfoPage.css';
import CityDesc from '../components/cityinfo/CityDesc';
import ImageSlideshow from '../components/cityinfo/ImageSlideShow';
import Weather from '../components/cityinfo/Weather';
import MapBox from '../components/MapBox';
import NavBar from '../components/NavBar'
import PlaceList from '../components/cityinfo/PlaceList';
import { Link, useLocation } from 'react-router-dom';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaceType } from '../redux/actions/placeTypeAction';
import { getCity } from '../redux/actions/cityAction';
import CityNotFound from '../components/cityinfo/CityNotFound';
import Loader from '../components/Loader';
import SOSPhoneNumbers from '../components/SOSPhoneNumbers';
import MetaData from './MetaData';

function CityInfoPage() {
  const cityName = useLocation().pathname.split('/').pop();
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
      <MetaData title={`CityScape  |  ${cityName}`} />
      <NavBar />
      <SOSPhoneNumbers />
      {loading ? (
        <div><Loader /></div>

      ) : error ? (
        error === "City Not Found" ? <><CityNotFound /></> : <div>{error}</div>
      ) : (!loading && city && city.data && (
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
                  <div>
                    <Link to={`/city/${cityName}/bus`}>Bus</Link>
                    <Link to={`/city/${cityName}/train`}>Train</Link>
                  </div>
                </div>
              </div>
              <div className="cityInfo-second-box">
                <div className="cityImages">
                  <ImageSlideshow cityName={cityName} />
                </div>
                <div className="cityWeather">
                  <Weather />
                </div>
              </div>
            </div>
            <h2 className='cityInfo-placeList-header'><span style={{ color: '#777575' }}>{placeType}</span> in {cityName}</h2>
            <div className="cityInfo-bottom-section">

              <div className="cityInfo-list-box">
                {console.log(placeType, 'placeType')}
                <PlaceList placeType={placeType} cityName={cityName} setMapData={setMapData} activeCard={activeCard} setActiveCard={setActiveCard} />
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