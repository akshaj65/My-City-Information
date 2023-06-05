import React from 'react';
import styled from 'styled-components';
import CityNotFoundImg from '../../Images/city-not-found.jpg';
import MetaData from '../../pages/MetaData';

const CityNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  background-color: rgb(249, 249, 249);
  @media (max-width: 867px) {
    height: calc(-60px + 100vh);
   }
`;

const CityNotFoundImage = styled.img`
  width: 50%;
  margin-bottom: 2rem;
  @media (max-width: 867px) {
    width: 82%;
  }
`;

const CityNotFoundText = styled.p`
  font-size: 1.5rem;
  text-align: center;
  @media (max-width: 867px) {
    font-size: 1.2rem;
  }
`;

function CityNotFound() {
  return (
    <CityNotFoundContainer>
      <MetaData title="CityScape | 404 City Not Found"/>   
      <CityNotFoundImage src={CityNotFoundImg} alt="City not found" />
      <CityNotFoundText>Sorry, the city you are looking for could not be found.</CityNotFoundText>
    </CityNotFoundContainer>
  );
}

export default CityNotFound;
