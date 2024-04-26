import React from 'react'
import AutoCompleteInput from './autocompleteinput';

const SearchForm = ({place, setPlace, onSubmit}:any) => {
  const handleManualInput=(event: any, stateProperty: string)=>{
    const newPlace = {...place};
    newPlace[stateProperty] = event.target.value;
    setPlace(newPlace)
  }
  return (
    <form onSubmit={onSubmit}>
      <AutoCompleteInput
      setPlace={setPlace}
      handleManualInput={handleManualInput}
      places={place.places}
      />
       <label htmlFor="place">Search your place</label>
      <input
        type="text"
        id="place"
        placeholder="places"
        value={place.places}
        onChange={(event) => handleManualInput(event, "place")}
      />
      <button type="submit">
          Confirm
        </button>
    </form>
  )
}

export default SearchForm
