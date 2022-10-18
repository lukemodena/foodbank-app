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
    <form className='participation-searchBar' onSubmit={handleSubmit}>
      <input 
            style={{borderRight: "0px"}}
            type="text" 
            className='participation-searchBarInput' 
            value={innerValue} 
            onChange={(e) => setInnerValue(e.target.value)} 
            placeholder="Search..."
        />
        <Button variant="secondary" className='participation-searchBarSubmit' type="submit" ><BsArrowRightShort className="participation-searchButton-Icon"/></Button>
    </form>
  )
}

export default SearchBar