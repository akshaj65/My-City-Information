import React from 'react'
import NavBar from '../components/NavBar';
import Team from '../components/TeamMember';

function AboutPage() {
  return (
    <div className='main-about' style={{"display":"flex","flexDirection":"column"}}>
      <NavBar/>
      <h2>Our Team</h2>
      <Team/>  
    </div>
  )
}

export default AboutPage;