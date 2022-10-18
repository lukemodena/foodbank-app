import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import { BsArrowRightShort } from 'react-icons/bs';

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
            placeholder="Search..."
        />
        <Button variant="secondary" className='searchBarSubmit' type="submit" ><BsArrowRightShort className="searchButton-Icon"/></Button>
    </form>
  )
}

export default SearchBar