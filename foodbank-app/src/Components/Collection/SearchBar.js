import React,{useState} from 'react'

const SearchBar = ({callback}) => {
    const [innerValue, setInnerValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault()
        callback(innerValue)
    }
  return (
    <form className='date-searchBar' onSubmit={handleSubmit}>
      <input 
            type="date" 
            className='date-searchBarInput' 
            value={innerValue} 
            onChange={(e) => setInnerValue(e.target.value)} 
        />
        <input className='date-searchBarSubmit' type="submit" value="Search" />
    </form>
  )
}

export default SearchBar