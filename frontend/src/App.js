import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import About from "./pages/AboutPage";
import Auth from './pages/Auth/auth';
import CityInfoPage from './pages/CityInfoPage';
import City from './pages/CityPage';
import Home from './pages/HomePage';
import NoPage from './pages/NoPage';
const routes = [
  { path: '/', component: <Home/> },
  { path: '/login', component: <Auth/> },
  { path: '/signup', component: <Auth/> },
  { path: '/about', component: <About/> },
  { path: '/city', component: <City/> },
  { path: '/city/:city', component: <CityInfoPage/> },
  { path: '*', component: <NoPage/> }
];

function App() {
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
