import React from 'react';
import styled from 'styled-components';
import { BiRupee } from 'react-icons/bi';
const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 1.5em;
  margin: 1em;
  background-color: whitesmoke;
  width: 60vw;  
  justify-content: space-around;
  transition: all .5s ease;
  &:hover{
    box-shadow: 0 2px 15px 0 rgba(0,0,0,.3);
  }
  @media (max-width: 867px) {
    width: unset;
    padding: 1.2em;
    flex-wrap: wrap;  
   }
`;

const Operator = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  @media (max-width: 867px) {
    flex: 1 0 100%;
  // flex-direction: row;
   }
`;

const OperatorName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5em;
  color: rgb(25, 34, 106);
  @media (max-width: 867px) {
    flex-grow: 1;
    padding-right: 5px;
   }
`;

const SeatList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  @media (max-width: 867px) {
    padding: 0px 0px 10px;
    font-size: 13px;
   }
 
`;

const Time = styled.div`
  flex: 1;
  font-size: 1.1em;
  font-weight: bold;
  @media (max-width: 867px) {
    font-size: 0.8em;
   }
`;
const Line = styled.span`
    display: block;
    width: 35px;
    border-bottom: 2px solid #cacaca;
`;
const Arrow = styled.span`
    font-size: 1.3em;
    color: #cacaca;
`;
const DurationBox = styled.div`
  flex: 3;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
const Duration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 0px 7px;
  @media (max-width: 867px) {
    font-size: 14px;
   }
`;

const ArrivalTime = styled.div`
flex: 1;
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
  @media (max-width: 867px) {
    font-size: 0.8em;
   }

`;

const Price = styled.div`
  font-weight: bold;
  text-align: left;
  // padding: 3px;
  padding: 3px 7px;
  margin-left: 47px;
  color: rgb(255, 255, 255);
  background-color: rgb(63, 68, 112);
  border-radius: 7px;
  box-shadow: rgb(0, 0, 0) 0px 0px 2px;
  // color: #0B2447;
  // background-color: #dedede;
  // box-shadow: 0px 0px 2px #0b2447;
  @media (max-width: 867px) {
    // flex-grow: 1;
    margin-left: 21px;
   
  }
`;


const Rupee =styled.span`
  width: 13px;
  display: inline-block;
  @media (max-width: 867px) {
    display:unset;
   }
   svg{
    scale: 1.2;
    margin: -2px;
   }
`
const BusCard = ({ data }) => {
  function convertTo24Hour(time) {
    const [hour, minute, meridiem] = time.match(/(\d+):(\d+)\s*(\w+)/).slice(1);
    let hour24 = parseInt(hour, 10);

    if (meridiem.toLowerCase() === 'pm' && hour24 !== 12) {
      hour24 += 12;
    } else if (meridiem.toLowerCase() === 'am' && hour24 === 12) {
      hour24 = 0;
    }

    return `${hour24.toString().padStart(2, '0')}:${minute}`;
  }

  function calculateDuration(arrivalTime, departureTime) {
    const departureTime24 = convertTo24Hour(departureTime);
    const arrivalTime24 = convertTo24Hour(arrivalTime);
    const departureDate = new Date(`1970-01-01T${departureTime24}`);
    const arrivalDate = new Date(`1970-01-01T${arrivalTime24}`);

    if (departureDate > arrivalDate) {
      arrivalDate.setDate(arrivalDate.getDate() + 1);
    }

    const durationInSeconds = Math.abs((arrivalDate - departureDate) / 1000);
    const durationInMinutes = Math.floor(durationInSeconds / 60);
    const durationInHours = Math.floor(durationInMinutes / 60);

    return `${durationInHours}h ${durationInMinutes % 60}m`;
  }



  return (
    <Card key={data._id}>
      <Operator>
        <OperatorName>{data.operatorName}</OperatorName>
        <SeatList>
          <li>{data.busType}</li>
        </SeatList>
      </Operator>
      <Time>{data.departureTime}</Time>

      <DurationBox>
        <Line></Line>
        <Duration>
          {calculateDuration(data.arrivalTime, data.departureTime)}
        </Duration>
        <Line></Line>
        <Arrow>&gt;</Arrow>
      </DurationBox>

      <ArrivalTime>{data.arrivalTime}</ArrivalTime>
      <Price> <Rupee><BiRupee/></Rupee> {data.fare}</Price>
    </Card>
  );
};

export default BusCard;
