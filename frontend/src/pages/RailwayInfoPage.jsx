import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import MetaData from './MetaData'
import '../styles/railwayInfoPage.css';
import { BiTrain } from 'react-icons/bi';
import StationSchedule from '../components/StationSchedule';
import TrainSchedule from '../components/TrainSchedule';
// import { GrTrain } from 'react-icons/gr';

const RailwayInfoPage = () => {
  const [schedule, setSchedule] = useState(false);
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
      return (
        <div className='partb'>
          <input type="text" placeholder="Enter station name" />
          <button>Find Stations</button>
        </div>
      );
    }
  };
  return (
    <div>
      <MetaData title="Railway Schedules" />
      <NavBar />
      <div className='railwayInfo-container'>
        <div className='railwayInfo-header'>
          <BiTrain />
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
              <TrainSchedule />
            </div> :
            <div className='railwayInfo-content'>
              <StationSchedule />
            </div>
        }

      </div>
    </div>
  )
}

export default RailwayInfoPage;