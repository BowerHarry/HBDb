import React from 'react';
import "./NavigationBar.css";
import {FaList, FaSearch, FaFilm, FaTv, FaStarHalfAlt} from "react-icons/fa"
import { FaClockRotateLeft } from 'react-icons/fa6';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


export const NavigationBar = ({ tabValue, setTabValue }) => {

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={tabValue} onChange={handleChange}>
      <BottomNavigationAction label="Watch List" value="watch list" icon={<FaList className='icon'/>} />
      <BottomNavigationAction label="History" value="history" icon={<FaStarHalfAlt className='icon'/>} />
      <BottomNavigationAction label="Films" value="films" icon={<FaFilm className='icon'/>} />
      <BottomNavigationAction label="TV" value="tv" icon={<FaTv className='icon'/>} />
      <BottomNavigationAction label="Search" value="search" icon={<FaSearch className='icon'/>} />
    </BottomNavigation>
  );}
