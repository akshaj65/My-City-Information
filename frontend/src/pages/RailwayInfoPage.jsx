import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import MetaData from './MetaData'
import '../styles/railwayInfoPage.css';
import { BiTrain } from 'react-icons/bi';
import StationSchedule from '../components/StationSchedule';
import TrainSchedule from '../components/TrainSchedule';
import { useDispatch } from 'react-redux';
import { getTrains } from '../redux/actions/trainAction';
import Autocomplete from '../components/AutoComplete';
import { Navigate } from 'react-router-dom';
// import { GrTrain } from 'react-icons/gr';

const RailwayInfoPage = () => {
  const dispatch = useDispatch();
  const [schedule, setSchedule] = useState(false);
  const [stationSuggestions, setStationSuggestions] = useState([])
  const [stationNameSuggestions, setStationNameSuggestions] = useState([])
  const [stationName, setStationName] = useState('')
  
  const renderScheduleForm = () => {
    if (schedule) {
      return (
        <div className='partb partb-tbws'>
          <input type="text" placeholder="Enter Source Name" />
          <input type="text" placeholder="Enter Destination Name" />
          <input type="date" />
          <button>Find Train</button>
        </div>
      );
    } else {
      const handleFindStations=(defaultValue)=>{
        console.log(defaultValue);
        const stnCode= stationSuggestions.find(station=>station.stationName=== stationName)?.["stationCode"]
        if(stnCode){
          dispatch(getTrains(stnCode));
        }
      }
      return (
        <div className='partb'>
          <Autocomplete defaultValue={stationName} onEnter={setStationName} suggestions={stationNameSuggestions}
            placeholder="Enter station name" />
          {/* <input type="text" placeholder="Enter station name" /> */}
          <button onClick={handleFindStations}>Find Stations</button>
        </div>
      );
    }
  };
  useEffect(() => {
    // console.log(stationNameSuggestions);
    if(stationNameSuggestions ){
      setStationNameSuggestions(stationSuggestions.map((station) => station.stationName));
    }
  }, [stationSuggestions])
  useEffect(() => {
  }, [stationNameSuggestions])
  
  
  return (
    <div>
      <MetaData title="CityScape | Railway Schedules" />
      <NavBar />
      <div className='railwayInfo-container'>
        <div className='railwayInfo-header'>
          <span><BiTrain /></span>
          
          {/* <GrTrain/> */}
          <div className='parta'>
            <button onClick={() => setSchedule(false)} className={!schedule ? 'parta-active' : ''}>Station Schedule</button>
            <button onClick={() => setSchedule(true)} className={schedule ? 'parta-active' : ''}>Trains Between Stations</button>
          </div>
         
            {renderScheduleForm()}
       
        </div>
        {
          schedule ?
            <div className='railwayInfo-content'>
              {/* <TrainSchedule /> */}
              <Navigate to={'/under-construction'} /> {/* under construction */}

            </div> :
            <div className='railwayInfo-content'>
              <StationSchedule stationNameSuggestions={stationNameSuggestions} setStationName={setStationName} setStationSuggestions={setStationSuggestions}  />
            </div>
        }

      </div>
    </div>
  )
}

export default RailwayInfoPage;