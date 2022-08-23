import React,{useState} from 'react';

const SearchBar = ({callback}) => {
    const [innerValue, setInnerValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault()
        callback(innerValue)
    }
  return (
    <form className='searchBar' onSubmit={handleSubmit}>
      <input 
            style={{borderRight: "0px"}}
            type="text" 
            className='searchBarInput' 
            value={innerValue} 
            onChange={(e) => setInnerValue(e.target.value)} 
        />
        <input className='searchBarSubmit' type="submit" value="Search" />
    </form>
  )
}

export default SearchBar