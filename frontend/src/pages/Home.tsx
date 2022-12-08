import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import s from './Home.scss';
import NavBar from '../components/Navbar';

export const Home = () => {
  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div style={{ color: 'black' }}>Home (Logged In)</div>
        </>
      }
    />
  );
};