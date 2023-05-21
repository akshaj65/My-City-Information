import React from 'react';
import styled from 'styled-components';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
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
`;

const Operator = styled.div`
flex: 3;
  display: flex;
  flex-direction: column;
`;

const OperatorName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const SeatList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Time = styled.div`
  flex: 1;
  font-size: 1.1em;
  font-weight: bold;
`;
const Line = styled.span`
    display: block;
    width: 35px;
    // padding-bottom: .55em;
    border-bottom: 2px solid #cacaca;
`;
const Arrow = styled.span`
    // padding-top: 8px;
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
`;

const ArrivalTime = styled.div`
flex: 1;
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
`;

const Price = styled.div`
  // flex: 1;
  // font-size: 1.1em;
  font-weight: bold;
  text-align: left;
  padding-left: 47px;
  color: #0B2447;
//   width: 13px;
// font-size: 18px;
`;


const Rupee =styled.span`
  width: 13px;
  display: inline-block;
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
    <Card>
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
      <Price> <Rupee><HiOutlineCurrencyRupee/></Rupee> {data.fare}</Price>
    </Card>
  );
};

export default BusCard;
