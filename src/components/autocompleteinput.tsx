"use client"
import React, { useEffect, useState } from 'react'
import getPlaces from './getplace';

const AutoCompleteInput = ({setPlace, handleManualInput, places}:any) => {
    const [suggestions, setSuggestions] = useState([]);
    
    useEffect(()=>{
        const handleInputChange = async (query:any)=>{
        const suggesions = await getPlaces(query);
        setSuggestions(suggesions);
    }
    handleInputChange(suggestions);
    },[suggestions])

    const handleSuggestionClick = (suggestion:any) =>{
    const place = suggestion.place_name.split(",")[0];
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];
    
    const location = {
        place,
        latitude,
        longitude,
    }

     suggestion.context.forEach((element: any) => {
      const identifier = element.id.split(".")[0];

      location[identifier as keyof typeof location] = element.text;
    });

    setPlace(location);
    setSuggestions([]);
  };


    const handleChange = (event:any)=>{
        handleManualInput(event, "places")
    }
  return (
    <div>
      <input
      type='text'
      id="place"
      placeholder='places'
      value={places}
      onChange={handleChange}
      />
      <ul>
        {suggestions?.map((suggest:any, index)=>(
            <li key={index} onClick={()=>handleSuggestionClick(suggest)}>
                {suggest.place}
            </li>
        ))}
      </ul>
    </div>
  )
}

export default AutoCompleteInput
