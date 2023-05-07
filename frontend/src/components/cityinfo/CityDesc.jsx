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
  @media (max-width: 867px) {
    padding: 27px;
  }
`;

// const PlaceTitle = styled.h2`
//   font-size: 24px;
//   margin-top: 0;
//   margin-bottom: 10px;
// `;

const PlaceDescription = styled.p`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 20px;
  @media (max-width: 867px) {
   font-size:13px;
  }
`;

const PlaceInfo = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 27px;
  font-size:14px;
  @media (max-width: 867px) {
    font-size:13px;
   }
`;

const PlaceInfoItem = styled.li`
  margin-bottom: 5px;
`;

const PlaceLinks = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 867px) {
    font-size:13px;
   }
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

const CityDesc = ({ city }) => {
  return (
    <>
      {city && <PlaceBox>
        {/* <PlaceTitle></PlaceTitle> */}
        <PlaceDescription>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{city.description}</PlaceDescription>
        <PlaceInfo>
          <PlaceInfoItem><strong>Main Language:</strong> {city.placeInfo.mainLanguage}</PlaceInfoItem>
          <PlaceInfoItem><strong>Population:</strong> {city.placeInfo.population}</PlaceInfoItem>
          <PlaceInfoItem><strong>Area code:</strong> {city.placeInfo.areaCode}</PlaceInfoItem>
          <PlaceInfoItem><strong>Pincode(s):</strong> {city.placeInfo.pinCode}</PlaceInfoItem>
          <PlaceInfoItem><strong>Famous for:</strong> {city.placeInfo.famousFor}</PlaceInfoItem>
        </PlaceInfo>
        <PlaceLinks>
          <PlaceLink href={city.placeLinks[0].url} target="_blank" rel="noopener noreferrer">{city.placeLinks[0].text}</PlaceLink>
          <PlaceLink href={city.placeLinks[1].url} target="_blank" rel="noopener noreferrer">{city.placeLinks[1].text}</PlaceLink>
        </PlaceLinks>
      </PlaceBox>}
    </>
  );
};

export default CityDesc;