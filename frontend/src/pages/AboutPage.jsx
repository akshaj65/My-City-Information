import React from 'react'
import Events from '../components/cityinfo/Events';
import NavBar from '../components/NavBar';
import SOSPhoneNumbers from '../components/SOSPhoneNumbers';
import Team from '../components/TeamMember';

function AboutPage() {
  return (
    <div className='main-about' style={{"display":"flex","flexDirection":"column"}}>
      <NavBar/>
      <SOSPhoneNumbers/>
      <h2>Our Team</h2>
      <Team/>  
      <Events place={"kochi"}/>
    </div>
  )
}

export default AboutPage;