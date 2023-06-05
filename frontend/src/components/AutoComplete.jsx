import React, { useEffect, useRef, useState } from "react";
import "../styles/autocomplete.css";
// function useDebounce(value, delay) {
//     const [debouncedValue, setDebouncedValue] = useState(value);
  
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setDebouncedValue(value);
//       }, delay);
  
//       return () => {
//         clearTimeout(timer);
//       };
//     }, [value, delay]);
  
//     return debouncedValue;
//   }
const Autocomplete = ({ defaultValue, onEnter,suggestions, placeholder, onChange }) => {
   
    const inputRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userInput, setUserInput] = useState(defaultValue || "");
    const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions || []);

    const handleInputChange = (event) => {
        event.preventDefault();
        const input = event.target.value.toLowerCase();
        const filtered = suggestions.filter((suggestion) =>
            //   suggestion.toLowerCase().startsWith(input.toLowerCase())
            suggestion.toLowerCase().startsWith(input)
        );
        console.log(filtered);
        setUserInput(input);
        setFilteredSuggestions(filtered);
        if(onEnter){
            onEnter(input);
        }
        if (onChange && filtered.indexOf(input)!==-1) {
            onChange(input);
            console.log(input,'handleInputChange');
        }

       
    };
    const handleEnterPress = (event)=>{
        if (event.key === 'Enter') {
            setShowDropdown(false);
            onEnter(userInput)
        }
    }
    const handleSuggestionClick = (suggestion) => {
        setUserInput(suggestion);
        setFilteredSuggestions([]);
        setShowDropdown(false);
        if(onEnter){
            onEnter(suggestion)
        }
        if (onChange) {
            onChange(suggestion);
        }
    };

    useEffect(() => {
        setFilteredSuggestions(suggestions || [])
    }, [suggestions])


    useEffect(() => {
        // Get the input element
        const inputElement = inputRef.current;

        const handleFocus = () => setShowDropdown(true);
        const handleBlur = () => setShowDropdown(false);
        // Add event listeners

        inputElement.addEventListener("focus", handleFocus);
        inputElement.addEventListener("blur", handleBlur);
        //clean up listeners
        return () => {
            inputElement.removeEventListener("focus", handleFocus);
            inputElement.removeEventListener("blur", handleBlur);
        };
    }, []);

    useEffect(() => {
        if( suggestions.indexOf(defaultValue)!==-1 || defaultValue ===''){
        setUserInput(defaultValue);
    }
    }, [defaultValue,suggestions])
    
    return (
        <div className="autocomplete-wrapper">

            <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
                placeholder={placeholder}
            />
            {showDropdown && filteredSuggestions.length > 0 && (
                <div className="dropdown">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="item"
                            onMouseDown={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Autocomplete;
