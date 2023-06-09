import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/search.css";
import { cities_cards, hillStation_cards, beach_cards } from './cardsArray';


const Search = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggetions, setShowSuggetions] = useState(false);

    const items = [...cities_cards, ...hillStation_cards, ...beach_cards];
    const array2 = items.map(({ image, ...keepAttrs }) => keepAttrs);
    const suggestions = array2.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);

    const handleInputChange = (event) => {

        setSearchQuery(event.target.value);
        setShowSuggetions(true);
        if (event.key === "Enter") {
            navigate(`/city/${searchQuery}`);
        }
    }
    const handleSuggestionClick = (suggestionName) => {
        setSearchQuery(suggestionName);
        setShowSuggetions(false);
    }

    return (
        <div className="flexSearchContainer">
            <div className="container-input">
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Search for city"
                    name="text"
                    className="SearchInput"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggetions(true)}
                    onBlur={() => setShowSuggetions(false)}
                    onKeyDown={handleInputChange} />

                <SearchIcon navigate={navigate} searchQuery={searchQuery} />
                <GpsIcon />
            </div>
            {showSuggetions &&
                <ul className="suggestions-list animatedUl">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSuggestionClick(suggestion.name);
                                inputRef.current.focus();
                            }} //The onClick event handler calls e.preventDefault() to prevent   //the default behavior (input losing focus) when clicking on the list item.
                        >
                            {suggestion.name}
                        </li>

                    ))}
                </ul>
            }
        </div>
    );
}

const SearchIcon = ({ navigate, searchQuery }) => {

    return (
        <div>
            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" className="searchIcon"  onClick={() => { navigate(`/city/${searchQuery}`)}}>
                <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd" ></path>
            </svg>
        </div>
    )
}

const GpsIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="#0B2447" width="18" height="18" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="gps">
            <title>current-location</title>
            <path d="M13.58 10c0 1.977-1.603 3.58-3.58 3.58s-3.58-1.603-3.58-3.58c0-1.977 1.603-3.58 3.58-3.58v0c1.977 0 3.58 1.603 3.58 3.58v0zM20 9.52v0.96c0 0.265-0.215 0.48-0.48 0.48v0h-1.72c-0.447 3.584-3.256 6.393-6.802 6.836l-0.038 0.004v1.72c0 0.265-0.215 0.48-0.48 0.48v0h-0.96c-0.265 0-0.48-0.215-0.48-0.48v0-1.72c-3.575-0.455-6.375-3.262-6.816-6.802l-0.004-0.038h-1.74c-0.265 0-0.48-0.215-0.48-0.48v0-0.96c0-0.265 0.215-0.48 0.48-0.48v0h1.74c0.445-3.578 3.245-6.385 6.781-6.836l0.039-0.004v-1.72c0-0.265 0.215-0.48 0.48-0.48v0h0.96c0.265 0 0.48 0.215 0.48 0.48v0 1.72c3.584 0.447 6.393 3.256 6.836 6.802l0.004 0.038h1.72c0.265 0 0.48 0.215 0.48 0.48v0zM15.96 10c0-3.292-2.668-5.96-5.96-5.96s-5.96 2.668-5.96 5.96c0 3.292 2.668 5.96 5.96 5.96v0c3.292 0 5.96-2.668 5.96-5.96v0z"></path>
        </svg>
    )
}

export default Search;

