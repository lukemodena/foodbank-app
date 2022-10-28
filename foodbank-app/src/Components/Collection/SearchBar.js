import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import { BsArrowRightShort } from 'react-icons/bs';
import {Row} from 'react-bootstrap';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const SearchBar = ({callback}) => {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);;

    const handleSubmit = e => {
        e.preventDefault()
        callback(startDate, endDate)
    }
  return (
  
    <form className='date-searchBar' onSubmit={handleSubmit}>
      <Row>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            className='date-searchBarInput-start'
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ height: '27.07px', width: '40.25px' }}>
                <input className='date-searchBarInput-start' ref={inputRef} {...inputProps} placeholder='Start Date' />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
          <MobileDatePicker
            className='date-searchBarInput-end'
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ height: '27.07px', width: '40.25px' }}>
                <input className='date-searchBarInput-end' ref={inputRef} {...inputProps} placeholder='End Date' />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
      </LocalizationProvider>
      
      <Button variant="secondary" className='date-searchBarSubmit' type="submit" ><BsArrowRightShort className="date-searchButton-Icon"/></Button>
      </Row>
    </form>
  )
}

export default SearchBar