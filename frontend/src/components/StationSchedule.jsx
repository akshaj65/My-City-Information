import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from './Loader';
import { API_URL } from '../config/env';

const stationData = [
  {
    "trainNumber": "20655",
    "trainName": "YPR-UBL SF EXPRESS",
    "trainRoute": "Yasvantpur Jn (YPR) - Hubli Jn (UBL)",
    "trainType": "Superfast",
    "trainClass": "2S,2A,3A,SL",
    "dayOfRun": "Fri",
    "schedule": {
      "arrival": "SRC",
      "departure": "23:50"
    }
  },
  {
    "trainNumber": "06563",
    "trainName": "YPR-MRDW EXP SPL",
    "trainRoute": "Yasvantpur Jn (YPR) - Murdeshwar (MRDW)",
    "trainType": "Train On Demand",
    "trainClass": "GEN,2A,3A,SL",
    "dayOfRun": "Sat",
    "schedule": {
      "arrival": "SRC",
      "departure": "23:55"
    }
  },
  {
    "trainNumber": "16565",
    "trainName": "YPR-MAQ EXPRESS",
    "trainRoute": "Yasvantpur Jn (YPR) - Mangalore Central (MAQ)",
    "trainType": "Mail/express",
    "trainClass": "2S,SL,3A,2A,GEN",
    "dayOfRun": "Daily",
    "schedule": {
      "arrival": "SRC",
      "departure": "23:55"
    }
  }]



const Station = styled.li`
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  background-color: #f2f2f2; /* updated background color */
  border-radius: 5px;
  padding: 1em 1.5em;
  margin: 1em;
  width: 60vw;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
  transition: all .2s ease;
  &:hover {
    box-shadow: 0 2px 15px 0 rgba(0,0,0,.3);
  }
  @media (max-width: 867px) {
    width:unset;
  }
`;

const TrainHead = styled.div`
  display: flex;
  width: 30%;
  align-items:center;
  justify-content: space-around;
  @media (max-width: 867px) {
    flex-direction:column;
  align-items:unset;

  }
`;

const TrainNumber = styled.h2`
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 0.5em;
  @media (max-width: 867px) {
    font-size:1em;
    }
`;

const TrainName = styled.p`
  font-size: 1.1em;
  margin-bottom: 0.5em;
  font-weight: bold;
  letter-spacing: 1.7px;
  @media (max-width: 867px) {
    font-size:0.8em;
    width:400px
    }
`;

const TrainClass = styled.p`
  font-size: 0.9em;
  margin-bottom: 0.5em;
  font-weight: bold;
  text-transform: uppercase;
  color: #333;
  @media (max-width: 867px) {
    font-size:0.7em;
    }
`;

const TrainType = styled.p`
  font-size: 1.1em;
  margin-right: 0.7em;
  font-size: 0.9em;
  @media (max-width: 867px) {
    font-size:0.7em;
    }
  
`;
const StationRow2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ArrivalTime = styled.p`
  font-size: 1.1em;
  margin-bottom: 0.5em;
  color: rgba(19, 33, 52, 0.7);
  letter-spacing: 0.8px;
  @media (max-width: 867px) {
    font-size:0.8em;
    }
`;

const DepartureTime = styled.p`
  font-size: 1.1em;
  margin-bottom: 0.5em;
  color: rgba(19, 33, 52, 0.7);
  letter-spacing: 0.8px;
  @media (max-width: 867px) {
    font-size:0.8em;
    }
`;


const ScheduleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  align-items: center;
  margin-bottom: 16px;
  font-size:0.9em;
  span{
    padding-right: 0.7em;
    font-weight: bold;
    color: #5d5a5a;
  }
  @media (max-width: 867px) {
    font-size: 0.7em;
    align-items: flex-start;
    height:40px
    }
`;

const ScheduleDay = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 2em;
  // border-radius: 50%;
  // background-color: ${({ active }) => active ? 'black' : 'gray'};
  color: ${({ active }) => active ? '#1b2e4d' : 'gray'};
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  margin-right: 0.5em;
  @media (max-width: 867px) {
   height:unset;
  }
`;
const StationRow1 = styled.div`
  display:flex;
  align-content: center;
  justify-content: space-between;
 
`;
const Arrow = styled.div`
  position: relative;
  border-top: 1px solid #d8d8d8;
  width: 330px;
  margin: 17px;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-left: 6px solid rgb(130, 127, 127);
    border-bottom: 3px solid transparent;
    position: absolute;
    right: -5px;
    top: -3.5px;
  }
  &::before {
    display: block;
    content: "";
    width: 6px;
    height: 6px;
    background-color: rgb(137, 135, 135);
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: -3px;
  }
  span{
    padding: 0 14px;
    font-size: 14px;
    line-height: 16.41px;
    color: rgb(133, 129, 129);
    font-family: roboto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #f2f2f2;
    font-weight: 400;
  }
`;

const StationRow3 = styled.div`
display:flex;
justify-content: center;
`;
const LinkContainer = styled.div`
display: flex;
justify-content: flex-end;
`;
const Link = styled.a`
color: rgb(11, 36, 71);
text-decoration: none;
transition: color 0.2s;
text-align: right;
margin-top: -22px;
&:hover {
  cursor: pointer;
  color:  rgb(103, 103, 103);
}
@media (max-width: 867px) {
  font-size: 0.8em;
}
`;

const dayMap = {
  'Mon': 'M',
  'Tue': 'T',
  'Wed': 'W',
  'Thu': 'T',
  'Fri': 'F',
  'Sat': 'S',
  'Sun': 'S'
};
const dayMapValues = Object.values(dayMap);
const dayMapKeys = Object.keys(dayMap);

function StationSchedule({ stationNameSuggestions, setStationSuggestions, setStationName }) {
  const { city: cityName } = useParams();
  const { error, loading, trains: trainData } = useSelector(state => state.trainData);

  useEffect(() => {

    axios.get(`${API_URL}/api/v1/city-stations?city=${cityName}`)
      .then(response => {
        setStationSuggestions(response.data.data)
        // console.log(stationNameSuggestions);
      })
      .catch(error => {
        console.log(error.response.data.message);
      }
      );
  }, [cityName]);
  return (
    <>
      {loading ? (
        <div> <Loader />{console.log(loading)}</div >)
        : error ? (
          <div className="error">{error}</div>)
          : (
            <ul>
              <div className='busSchedule-destAvailable'>
                <h4>Stations Available</h4>

                <div className='destCities'>
                  {stationNameSuggestions && stationNameSuggestions.length !== 0 && stationNameSuggestions.map((stn) => {
                    return (
                      <div key={stn} className='destCities-cardContainer' style={{ width: 'unset' }} onClick={() => {
                        setStationName(stn);
                      }}>
                        <div className='cityLabel'>{stn}</div>
                      </div>
                    )
                  })}
                </div>

              </div>
              {trainData && trainData.stationData && <h3 style={{ padding: '12px 26px', fontSize : '17px' }}>{trainData.stationName} </h3>}
              {trainData && trainData.stationData && <div style={{ paddingLeft: '19px' }}>{trainData.stationData.length} results</div>}
              {trainData && trainData.stationData && trainData.stationData.map((station, index) => {

                const days = station.dayOfRun.split(',')
                const route = station.trainRoute.split(' - ')

                return (

                  <Station key={index}>
                    <StationRow1>
                      <TrainHead>
                        <TrainNumber>{station.trainNumber}</TrainNumber>
                        <TrainName>{station.trainName}</TrainName>
                      </TrainHead>
                      <ScheduleList>
                        <span>Runs on:</span>
                        {station.dayOfRun === 'Daily' ? (
                          dayMapValues.map((day, index) => (
                            <ScheduleDay key={index} active={true}>
                              {day}
                            </ScheduleDay>
                          ))
                        ) : (
                          dayMapKeys.map((day, index) => (
                            <ScheduleDay key={index} active={days.includes(day)}>
                              {dayMap[day]}
                            </ScheduleDay>
                          ))
                        )}
                      </ScheduleList>
                    </StationRow1>

                    <StationRow2>
                      <ArrivalTime>{route[0]}&nbsp;&nbsp;{station.schedule.arrival}</ArrivalTime>
                      <Arrow ><span></span></Arrow>
                      <DepartureTime>{station.schedule.departure}&nbsp;&nbsp;{route[1]}</DepartureTime>
                    </StationRow2>
                    {/* <Route>{route[0]}-----&gt;{route[1]}</Route> */}
                    <StationRow3>
                      <TrainType>{station.trainType}</TrainType>
                      <TrainClass>{station.trainClass}</TrainClass>
                    </StationRow3>
                    <LinkContainer><Link>Route</Link></LinkContainer>
                  </Station>
                )
              })}
            </ul>
          )
      }
    </>
  );
}

export default StationSchedule;
