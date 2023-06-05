import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { loadUser } from './redux/actions/userAction';
import './App.css';
import About from "./pages/AboutPage";
import Auth from './pages/Auth/auth';
import BusSchedulePage from './pages/BusSchedulePage';
import CityInfoPage from './pages/CityInfoPage';
import City from './pages/CityPage';
import Home from './pages/HomePage';
import NoPage from './pages/NoPage';
import RailwayInfoPage from './pages/RailwayInfoPage';
import store from './redux/store';
import PageUnderConstruction from './pages/PageUnderConstruction';
const routes = [
  { path: '/', component: <Home/> },
  { path: '/login', component: <Auth/> },
  { path: '/signup', component: <Auth/> },
  { path: '/about', component: <About/> },
  { path: '/city', component: <City/> },
  { path: '/city/:city', component: <CityInfoPage/> },
  { path: '/city/:city/bus', component: <BusSchedulePage/> },
  { path: '/city/:city/train', component: <RailwayInfoPage/> },
  { path: '/under-construction', component: <PageUnderConstruction/> },
  { path: '*', component: <NoPage/> }
];

function App() {
  React.useEffect(()=>{
    //whenever we load the page Loaduser runs
    store.dispatch(loadUser());
  },[])
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.component}
            exact
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
