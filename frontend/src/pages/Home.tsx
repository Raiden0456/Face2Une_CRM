import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import s from './Home.scss';
import NavBar from '../components/Navbar';
import BookingBox from '../components/base/BookingBox';

export const Home = () => {
  return (
    <Container
      /* header={<NavBar />} */
      width="100%"
      content={
        <>
          <div style={{ color: 'black' }}>Home (Logged In)</div>

          <BookingBox />
          <BookingBox />
          <BookingBox />
          <BookingBox />
        </>
      }
    />
  );
};
