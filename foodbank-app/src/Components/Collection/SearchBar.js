import React,{useState} from 'react'

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
        <input className='date-searchBarSubmit' type="submit" value="Search" />
    </form>
  )
}

export default SearchBar