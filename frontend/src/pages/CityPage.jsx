import React from "react";
import Search from "../components/Search";
import MultiCarousel from "../components/MultiCarousel";
import Card from "../components/Card";
import { cities_cards, hillStation_cards, beach_cards } from "../components/cardsArray";
import "../styles/cityPage.css";
import NavBar from "../components/NavBar.jsx";
import SOSPhoneNumbers from "../components/SOSPhoneNumbers";



const getCityCards = () => {
  const cards = [];
  cities_cards.forEach((city) => {
    cards.push(<Card image={city.image} key={city.id} name={city.name} />)
  });
  return cards;
};

const getHillStationCards = () => {
  const cards = [];
  hillStation_cards.forEach((hillStation) => {
    cards.push(<Card image={hillStation.image} key={hillStation.id} name={hillStation.name} />)
  });
  return cards;
};

const getBeachCards = () => {
  const cards = [];
  beach_cards.forEach((beach) => {
    cards.push(<Card image={beach.image} key={beach.id} name={beach.name} />)
  });
  return cards;
};

const TestHome = () => {

  return (
    <>
      <NavBar />
      <SOSPhoneNumbers/>
      <div className="flexContainer">
        <div  className="cityHeader-img">
        <header className="cityHeader" >
          <h1 className="cityHeader-h1" >Discover Cities</h1>
          <p className="cityHeader-caption"></p>
        </header></div>
        <Search />
        <MultiCarousel text={"MetroPolitian Cities"} cards={getCityCards()} />
        <MultiCarousel text={"Hill Stations"} cards={getHillStationCards()} />
        <MultiCarousel text={"Beaches"} cards={getBeachCards()} />
      </div>
    </>
  );
};

export default TestHome;
