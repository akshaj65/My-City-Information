import React from 'react';
import styled from 'styled-components';

const PlaceBox = styled.div`
  background-color: rgb(255, 255, 255);
  color: rgb(26, 34, 56);
  // padding: 20px;
  padding:43px;
  border-radius: 25px;
  margin-bottom: 20px;
  box-shadow: rgba(128, 128, 128, 0.38) 0px 0px 22px; 
`;

const PlaceTitle = styled.h2`
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 10px;
`;

const PlaceDescription = styled.p`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 20px;
`;

const PlaceInfo = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 27px;
`;

const PlaceInfoItem = styled.li`
  margin-bottom: 5px;
`;

const PlaceLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlaceLink = styled.a`
  // color: #fff;
  color: rgb(11, 36, 71);
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    // color: #87b6e7;
    color:  rgb(103, 103, 103);
  }
  }
`;

const CityDesc = () => {
  return (
    <PlaceBox>
      <PlaceTitle></PlaceTitle>
      <PlaceDescription>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Bengaluru</strong>, also known as Bangalore, is the capital of the Indian state of Karnataka. It is known as the "Silicon Valley of India" due to its prominent role in the country's information technology industry. It is also famous for its street food and shopping destinations. With a population of over 10 million people, Bengaluru is a cosmopolitan city that blends modernity with traditional Indian culture.</PlaceDescription>
      <PlaceInfo>
        <PlaceInfoItem><strong>Main Language:</strong> Kannada</PlaceInfoItem>
        <PlaceInfoItem><strong>Population:</strong> 65,000</PlaceInfoItem>
        <PlaceInfoItem><strong>Area code:</strong> +91-(0)80</PlaceInfoItem>
        <PlaceInfoItem><strong>Pincode(s):</strong> 560 xxx</PlaceInfoItem>
        <PlaceInfoItem><strong>Famous for:</strong> IT industry, gardens, pleasant climate</PlaceInfoItem>
      </PlaceInfo>
      <PlaceLinks>
        <PlaceLink href="https://www.bbmp.gov.in" target="_blank" rel="noopener noreferrer">Official Website</PlaceLink>
        <PlaceLink href="https://en.wikipedia.org/wiki/Bangalore" target="_blank" rel="noopener noreferrer">Wikipedia</PlaceLink>
      </PlaceLinks>
    </PlaceBox>
  );
};

export default CityDesc;