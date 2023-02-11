import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import NavBar from '../components/Navbar';
import BookingBox from '../components/BookingBox';
import { ProceduresService } from '../service/ProceduresService';
import { TailSpinFixed } from '../components/TailSpin';
import { ProceduresStore } from '../store/Procedures.store';
import { ClientService } from '../service/ClientService';
import DataTable from 'react-data-table-component';

import s from './Clients.scss';

const customTableStyles = {
  headCells: {
    style: {
      fontWeight: 'bold',
      backgroundColor: '#f2f2f2',
    },
  },
  cells: {
    style: {
      padding: '12px',
    },
  },
  pagination: {
    style: {
      borderRadius: '0 0 16px 16px',
    },
  },
};

const data = [
  { id: 1, user_id: 1, fullName: 'Doe', email: 'johndoe@example.com', phone: '+79147777777' },
  { id: 2, user_id: 2, fullName: 'Aoe', email: 'aohndoe@example.com', phone: '+79147777777' },
  { id: 3, user_id: 3, fullName: 'Doe', email: 'johndoe@example.com', phone: '+79147777777' },
  { id: 4, user_id: 4, fullName: 'Boe', email: 'bohndoe@example.com', phone: '+79147777777' },
  { id: 5, user_id: 5, fullName: 'Doe', email: 'johndoe@example.com', phone: '+79147777777' },
  { id: 6, user_id: 6, fullName: 'Doe', email: 'johndoe@example.com', phone: '+79147777777' },
  { id: 7, user_id: 7, fullName: 'Coe', email: 'cohndoe@example.com', phone: '+79147777777' },
  { id: 8, user_id: 8, fullName: 'Doe', email: 'johndoe@example.com', phone: '+79147777777' },
  { id: 9, user_id: 9, fullName: 'Doe', email: 'johndoe@example.com', phone: '+79147777777' },
  { id: 10, user_id: 10, fullName: 'Doe', email: 'johndoe@example.com', phone: '+79147777777' },
  { id: 10, user_id: 10, fullName: 'Doe', email: 'johndoe@example.com', phone: '+79147777777' },
];

const columns = [
  { name: 'ID', selector: (row: any) => row.user_id, sortable: true },
  { name: 'Full Name', selector: (row: any) => row.fullName, sortable: true },
  { name: 'Email', selector: (row: any) => row.email, sortable: true },
  { name: 'Phone', selector: (row: any) => row.phone, sortable: false },
];

const paginationComponentOptions = {
  noRowsPerPage: true,
};

export const Clients = () => {
  const clientService = new ClientService();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          {loading ? (
            <TailSpinFixed />
          ) : (
            <>
              <div className={s.Clients}>
                <div className={s.Clients__header}>
                  <h2>Clients</h2>
                </div>
                <div className={s.Clients__table_searchFieldWrapper}>
                  <Input label='Search for a client:' type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                  <ButtonContained width='auto' onClick={() => console.log(search)}>Search</ButtonContained>
                </div>
                <div className={s.Clients__table}>
                  <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customTableStyles}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                  />
                </div>
              </div>
            </>
          )}
        </>
      }
    />
  );
};
