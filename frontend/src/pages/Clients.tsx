import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import NavBar from '../components/Navbar';
import { ClientService } from '../service/ClientService';
import DataTable from 'react-data-table-component';
import { formatPhoneNumber } from '../utils/formatPhone';
import { customTableStyles } from '../utils/customTableStyles';
import { ModalStore } from '../store/Modal.store';

import s from './Clients.scss';

// Add Client Order
const addHandler = async (clientId: number, email: string) => {
  ModalStore.setClientOrder({ clientId, email });
  ModalStore.setModalStatus({ open: true, action: 'clientOrder' });
};

const ROWS_PER_PAGE = 10;

const columns = [
  { name: 'ID', selector: (row: any) => row.id, sortable: true },
  { name: 'Full Name', selector: (row: any) => row.full_name, sortable: true },
  { name: 'Email', selector: (row: any) => row.email, sortable: true },
  { name: 'Phone', selector: (row: any) => formatPhoneNumber(row.phone), sortable: false },
  {
    name: '',
    selector: (row: any) => (
      <ButtonContained width="85px" onClick={() => addHandler(row.id, row.email)}>
        Add order
      </ButtonContained>
    ),
    sortable: false,
  },
];

const paginationComponentOptions = {
  noRowsPerPage: true,
};

export const Clients = () => {
  const clientService = new ClientService();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [filterLike, setFilterLike] = useState('');

  const fetchClients = async (page: number) => {
    setLoading(true);

    clientService.getClients(page, ROWS_PER_PAGE, filterLike).then((r) => {
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
              <h3>Clients</h3>
            </div>
            <div className={s.Clients__table_searchFieldWrapper}>
              <Input
                label="Search for a client:"
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
