import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import s from './Home.scss';
import NavBar from '../components/Navbar';
import BookingBox from '../components/base/BookingBox';

export const Home = () => {
  const [displayInput, setDisplayInput] = useState(false);
  const [input, setInput] = useState('');
  const [procedures, setProcedures] = useState({ data: [] });
  useEffect(() => {
    fetch("http://localhost:3000/main_proc")
      .then((res) => res.json())
      .then((procedures) => setProcedures(procedures));
  }, []);
  let proceduresList = procedures.data;
  return (
    <Container
      /* header={<NavBar />} */
      width="100%"
      content={
        <>
          <div style={{ color: 'black' }}>Home (Logged In)</div>
          <div style={{ margin: '25px 0', alignSelf: 'start', width: '25%' }}>
            <ButtonContained
              onClick={() => {
                setDisplayInput(!displayInput);
              }}
            >
              Use My Code
            </ButtonContained>
            {displayInput && (
              <Input
                value={input}
                onChange={(value) => {
                  setInput(value);
                }}
              />
            )}
          </div>
          {proceduresList.map((procedure)=>{
            return <BookingBox procedure={procedure} />
          })
          }
          
        </>
      }
    />
  );
};
