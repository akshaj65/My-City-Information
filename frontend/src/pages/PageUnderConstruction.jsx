import React from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import MetaData from './MetaData'
import UnderConstructionImg from '../Images/underConstruction.jpeg'

const UnderConstruction = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;
padding: 2rem;
@media (max-width: 867px) {
  height: calc(-60px + 100vh);
 }
`
const Image = styled.img`
  width: 50%;
  filter: grayscale(70%);
  @media (max-width: 867px) {
    // width: 82%;
    width:100vw;
  }
`;
const Text = styled.p`
  font-size: 1.5rem;
  text-align: center;
  @media (max-width: 867px) {
    font-size: 1.2rem;
  }
`;
const PageUnderConstruction = () => {
  return (
    <div>
        <MetaData title='CityScape |Page Under Construction'/>
        <NavBar/>
        <UnderConstruction>
           <Image src={UnderConstructionImg} alt="under construction" />
           <Text>Coming Soon...</Text>
        </UnderConstruction>
    </div>
  )
}

export default PageUnderConstruction