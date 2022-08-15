import React,{useState} from 'react'

const SearchBar = () => {
    const [innerValue, setInnerValue] = useState("");
    console.log('innerValue', innerValue);
  return (
    <form className='searchBar'>
      <input 
            type="text" 
            className='searchBarInput' 
            value={innerValue} 
            onChange={(e) => setInnerValue(e.target.value)} 
        />
    </form>
  )
}

export default SearchBar