import React from 'react'
import '../styles/home.css'
import NavBar from '../components/NavBar';
import MetaData from './MetaData';
import userImg from '../Images/teja.jpeg'
function HomePage() {
  return (
    <div className='home'>
      {/*adds title */}
      <MetaData title="CityScape"/>   
      <NavBar/>
      <div className="heading">
        <h1>Welcome to CityScape</h1>
        <figcaption>"Your Ultimate Guide to Exploring the Vibrant Cities of India!"</figcaption>
      </div>

      <main>
        <div className="section left">
          <img src="https://static.toiimg.com/thumb/msid-82042028,width-748,height-499,resizemode=4,imgsize-1496533/.jpg" alt="" />
          <div className="content">
            <h3>Everything in one place.</h3>
            <p>Discover the rich history, diverse culture, and stunning landmarks of India's most iconic cities, including Delhi, Mumbai, Jaipur, and more! Explore the best of India's bustling metropolises and experience the magic of these vibrant destinations.</p>
          </div>
        </div>

        <div className="section right">
          <img src="https://img.traveltriangle.com/blog/wp-content/uploads/2017/12/shutterstock_702408349.jpg" alt="" />
          <div className="content">
            <h3>Get insider knowledge</h3>
            <p>Get insider tips on must-visit landmarks, hidden gems, and local experiences. Indulge in the authentic flavors of Indian cuisine, witness colorful festivals, and immerse yourself in the rich heritage of these incredible cities.</p>
          </div>
        </div>

        <div className="section left">
          <img src="https://travelogyindia.b-cdn.net/blog/wp-content/uploads/2019/07/tincha-fall-indore.jpg" alt="" />
          <div className="content">
            <h3>Plan your itinerary</h3>
            <p>With CityScape, you can easily plan your day with suggested routes and directions. Never waste another moment deciding what to do.</p>
          </div>
        </div>

        <div className="section right">
          <img src="https://media.easemytrip.com/media/Blog/India/636930188375829142/636930188375829142BW8yzr.jpg" alt="" />
          <div className="content">
            <h3>Wanderlust!</h3>
            <p>Start Your Journey Now! Explore our city guides, plan your itinerary, and embark on an unforgettable adventure in the cities of India.</p>
          </div>
        </div>

        <div className="testimonial">
          <p>"As a new resident, CityScape has been a lifesaver in helping me get acclimated to my new city."</p>
          <div className="profile">
            <img src={userImg} alt="" />
            <p>Teja Kiran</p>
          </div>
        </div>

      </main>

      <div className="footer">
        <h2>Download CityScape today and discover your city like a local.</h2>
      </div>
    </div>
  )
}

export default HomePage;