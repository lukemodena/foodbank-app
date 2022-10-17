import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import { BsArrowRightShort } from 'react-icons/bs';

const SearchBar = ({callback}) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = e => {
        e.preventDefault()
        callback(startDate, endDate)
    }
  return (
    <form className='date-searchBar' onSubmit={handleSubmit}>
      <input 
            type='text'
            name='startDate'
            placeholder='Start Date'
            className='date-searchBarInput-start' 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
        />
        <input 
            type='text'
            name='endDate'
            placeholder='End Date'
            className='date-searchBarInput-end' 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
        />
        <Button variant="secondary" className='date-searchBarSubmit' type="submit" ><BsArrowRightShort className="date-searchButton-Icon"/></Button>
    </form>
  )
}

export default SearchBar