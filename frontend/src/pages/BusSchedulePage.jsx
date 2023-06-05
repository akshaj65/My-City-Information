import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { BiBus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Autocomplete from '../components/AutoComplete';
import BusCard from '../components/BusCard';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import { getBuses } from '../redux/actions/busAction';
import '../styles/busSchedulePage.css';
import MetaData from './MetaData';
import { API_URL } from '../config/env';




const BusSchedulePage = () => {
  const { city: cityName } = useParams();
  const dispatch = useDispatch();
  const { error, loading, buses: busData } = useSelector(state => state.busData);
  // const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  const [fromValue, setFromValue] = useState(cityName || '');
  const [toValue, setToValue] = useState('');


  const [fromOptions] = useState([
    "bengaluru",
    "chennai",
    "karwar",
    "hyderabad",
    "panaji",
  ]);
  const [toOptions, setToOptions] = useState([
    "bengaluru",
    "chennai",
    "karwar",
    "hyderabad",
    "panaji",
  ].filter((city) => city !== fromValue));
  const handleFromChange = (selectedCity) => {
    const updatedOptions = fromOptions.filter((city) => city !== selectedCity);
    setToOptions(updatedOptions);
  };

  const handleSearchBuses = () => {
    if (fromValue && toValue) {
      dispatch(getBuses(fromValue, toValue));
    }
  }


  let shouldRunEffect_fromOptions = fromOptions.indexOf(fromValue) !== -1

  useEffect(() => {
    if (shouldRunEffect_fromOptions) {
      setToValue('');
      axios.get(`${API_URL}/api/v1/bus-destinations?srcStn=${fromValue || cityName}`)
        .then(response => {
          setToOptions(response.data.data)
        })
        .catch(error => {
          console.log(error.response.data.message);
        }
        );
    }
  }, [cityName, fromOptions, fromValue, shouldRunEffect_fromOptions]);



  // useEffect(() => {
  //   setToValue(toValue);
  //   setFromValue(fromValue)
  // }, [toValue, fromValue]);
  return (
    <div>
      <MetaData title="Bus Schedules" />
      <NavBar />
      <div className='busSchedule-container'>
        <div className='busSchedule-header'>
          <BiBus className='busIcon' />
          <div className='fromToLayout'>
            <Autocomplete defaultValue={fromValue} onEnter={setFromValue} suggestions={fromOptions}
              onChange={handleFromChange} placeholder="From" />
            <span>&rarr;</span>
            <Autocomplete defaultValue={toValue} onEnter={setToValue} suggestions={toOptions} placeholder="To" />

          </div>
          <div className="busSchedule-search">
            <button onClick={handleSearchBuses}>Find Buses</button>
          </div>

        </div>
        <div className='busSchedule-destAvailable'>
          <h4>Bus Route Available</h4>

          <div className='destCities'>
            {toOptions.map((dest) => {
              return (
                <div key={dest} className='destCities-cardContainer' onClick={() => {
                  setFromValue(fromValue);
                  setToValue(dest);
                }}>
                  <div className='cityLabel'>{dest}</div>
                </div>
              )
            })}
          </div>

        </div>
        {loading ? (

          <div><Loader />{console.log(loading)}</div>

        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {busData && busData.srcStn && <Fragment><div className="buses">
              {busData.srcStn}&nbsp;&nbsp;<span className='line'></span><span className='arrow'>&gt;</span>&nbsp;&nbsp; {busData.destStn}
            </div>
              <div><span>Dep</span><span>Arr</span></div>
            </Fragment>}
            {busData && busData.results && <div style={{ 'padding-left': '19px' }}>{busData.results.length} results</div>}
            <div className="column">
              <div className="busCards">
                {busData && busData.results && busData.results.map((bus, index) => (
                  <BusCard key={index} data={bus} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BusSchedulePage