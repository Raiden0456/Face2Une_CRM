import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import NavBar from '../components/Navbar';
import { UserService } from '../service/UserService';
import DataTable from 'react-data-table-component';
import { saloon_ids } from '../utils/staticData';
import { findElementById } from '../utils/funcs';

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

const ROWS_PER_PAGE = 10;

const columns = [
  { name: 'ID', selector: (row: any) => row.id, sortable: true },
  { name: 'Full Name', selector: (row: any) => `${row.first_name} ${row.last_name}`, sortable: true },
  { name: 'Email', selector: (row: any) => row.email, sortable: true },
  { name: 'Phone', selector: (row: any) => row.phone, sortable: false },
  { name: 'Saloon', selector: (row: any) => findElementById(saloon_ids, row.saloon_id).text, sortable: false },
];

const paginationComponentOptions = {
  noRowsPerPage: true,
};

export const Employees = () => {
  const userService = new UserService();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [filterLike, setFilterLike] = useState('');

  const fetchClients = async (page: number) => {
    setLoading(true);

    userService.getEmployees({ index: page, perPage: ROWS_PER_PAGE, filterLike }).then((r) => {
      if (r.success) {
        console.log(r);
        setData(r.data);
        setTotalRows(r.total);
        setLoading(false);
      }
    });
  };

  const handlePageChange = (page: number) => {
    fetchClients(page);
  };

  const handleSearch = () => {
    fetchClients(1);
  };

  useEffect(() => {
    fetchClients(1);
  }, []);

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div className={s.Clients}>
            <div className={s.Clients__header}>
              <h3>Employees</h3>
            </div>
            <div className={s.Clients__table_searchFieldWrapper}>
              <Input
                label="Search for an employee:"
                type="text"
                name="search"
                value={filterLike}
                onChange={(e) => setFilterLike(e.target.value)}
              />
              <ButtonContained width="auto" onClick={handleSearch}>
                Search
              </ButtonContained>
            </div>
            <div className={s.Clients__table}>
              <DataTable
                columns={columns}
                data={data}
                customStyles={customTableStyles}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangePage={handlePageChange}
                paginationComponentOptions={paginationComponentOptions}
                paginationPerPage={ROWS_PER_PAGE}
              />
            </div>
          </div>
        </>
      }
    />
  );
};
