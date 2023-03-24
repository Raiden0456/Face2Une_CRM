import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained, ButtonDelete, ButtonEdit, ButtonOutlined } from '../components/base/Button';
import { Input } from '../components/base/Input';
import NavBar from '../components/Navbar';
import { UserService } from '../service/UserService';
import DataTable from 'react-data-table-component';
import { saloon_ids } from '../utils/staticData';
import { findElementById } from '../utils/funcs';
import { ModalStore } from '../store/Modal.store';
import { formatPhoneNumber } from '../utils/formatPhone';
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

// Delete Employee
const deleteHandler = async (id: number) => {
  ModalStore.setDeleteItem({ deleteType: 'employee', id });
  ModalStore.setModalStatus({ open: true, action: 'deleteItem' });
};

// Edit Employee
const addHandler = async (id: number | null) => {
  ModalStore.setAddItem({ addType: 'employee', edit: true, id });
  ModalStore.setModalStatus({ open: true, action: 'addItem' });
};

const columns = [
  { name: 'ID', selector: (row: any) => row.id, sortable: true },
  { name: 'Full Name', selector: (row: any) => `${row.first_name} ${row.last_name}`, sortable: true },
  { name: 'Email', selector: (row: any) => row.email, sortable: true },
  { name: 'Phone', selector: (row: any) => formatPhoneNumber(row.phone), sortable: false },
  {
    name: '',
    selector: (row: any) => (
      <ButtonEdit width="85px" onClick={() => addHandler(row.id)}>
        Edit
      </ButtonEdit>
    ),
    sortable: false,
  },
  {
    name: '',
    selector: (row: any) => (
      <ButtonDelete width="100%" onClick={() => deleteHandler(row.id)}>
        Delete
      </ButtonDelete>
    ),
    sortable: false,
  },
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

  // Add Employee
  const addHandler = async () => {
    ModalStore.setAddItem({ addType: 'employee', edit: false, id: null });
    ModalStore.setModalStatus({ open: true, action: 'addItem' });
  };

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
            <div>
              <ButtonContained width="auto" onClick={addHandler}>
                Add Employee
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
