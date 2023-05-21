import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiBus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Autocomplete from '../components/AutoComplete';
import BusCard from '../components/BusCard';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import { getBuses } from '../redux/actions/busAction';
import '../styles/busSchedulePage.css';
import MetaData from './MetaData';


const DestAvailableCard = ({ toCity,fromCity }) => {
  const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: rgb(209, 209, 209);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  margin: 18px 20px;
  text-transform: capitalize;

  &:hover{
    box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px;
  }
`;

  const CityLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
  return (
    <CardContainer>
      <CityLabel>{toCity}</CityLabel>
    </CardContainer>
  );
};



const BusSchedulePage = () => {
  const { city: cityName } = useParams();
  const dispatch = useDispatch();
  const { error, loading, buses: busData } = useSelector(state => state.busData);
  // const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  const [fromValue, setFromValue] = useState(cityName || '');
  const [toValue, setToValue] = useState('');


  const [fromOptions, setFromOptions] = useState([
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
  ].filter((city) => city !== cityName));
  const handleFromChange = (selectedCity) => {
    const updatedOptions = fromOptions.filter((city) => city !== selectedCity);
    setToOptions(updatedOptions);
  };

  const handleSearchBuses = () => {
    if (fromValue && toValue) {
      dispatch(getBuses(fromValue, toValue));
    }
  }
  
  useEffect(() => {
    if (cityName || fromValue) {
      axios.get(`/api/v1/bus-destinations?srcStn=${fromValue || cityName}`)
        .then(response => {
          setToOptions(response.data.data)
        })
        .catch(error => {
          console.log(error.response.data.message);
        }
        );
    }

  }, [cityName, fromValue]);

  return (
    <div>
      <MetaData title="Bus Schedules" />
      <NavBar />
      <div className='busSchedule-container'>
        <div className='busSchedule-header'>
          <BiBus className='busIcon' />
          <div className='fromToLayout'>
            <Autocomplete defultValue={cityName} onEnter={setFromValue} suggestions={fromOptions}
              onChange={handleFromChange} placeholder="From" />
            <span>&rarr;</span>
            <Autocomplete onEnter={setToValue} suggestions={toOptions} placeholder="To" />

          </div>
          <div className="busSchedule-search">
            <button onClick={handleSearchBuses}>Find Buses</button>
          </div>

        </div>
        <div className='busSchedule-destAvailable'>
          <h4>Bus Route Available</h4>

          <div className='destCities'>
            {toOptions.map((dest) => {
              return <DestAvailableCard key={dest} fromCity={cityName} toCity={dest}
                 />

            })}
          </div>

        </div>
        {loading ? (

          <div><Loader />{console.log(loading)}</div>

        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {busData && busData.srcStn && <div className="buses">Depart from {busData.srcStn}&nbsp;&nbsp;-&gt;&nbsp;&nbsp;Arrival at {busData.destStn}</div>}
            {busData && busData.results && <div>{busData.results.length} results</div>}
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