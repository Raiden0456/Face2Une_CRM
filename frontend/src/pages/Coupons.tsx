import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained, ButtonOutlined } from '../components/base/Button';
import { Input } from '../components/base/Input';
import NavBar from '../components/Navbar';
import { CouponsService } from '../service/CouponsService';
import DataTable from 'react-data-table-component';
import Moment from 'moment';
import { ModalStore } from '../store/Modal.store';

import s from './Coupons.scss';

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

// Delete Coupon
const deleteHandler = async (id: number) => {
  ModalStore.setDeleteItem({ deleteType: 'coupon', id });
  ModalStore.setModalStatus({ open: true, action: 'deleteItem' });
};

const columns = [
  { name: 'ID', selector: (row: any) => row.id, sortable: true },
  { name: 'Name', selector: (row: any) => row.name, sortable: true },
  { name: 'Code', selector: (row: any) => row.code, sortable: true },
  { name: 'Discount', selector: (row: any) => row.discount, sortable: true },
  {
    name: 'Procedures',
    cell: (row: { procedure_names: any[] }) => (
      <div>
        {row.procedure_names.map((names, i) => (
          <div key={i}>{names}</div>
        ))}
      </div>
    ),
    sortable: false,
  },
  { name: 'Expiry date', selector: (row: any) => Moment(row.expiry_date).format('MMMM d, yyyy HH:mm'), sortable: true },
  {
    name: '',
    selector: (row: any) => (
      <ButtonContained
        width="100%"
        style={{ backgroundColor: 'rgba(119, 119, 119, 0.511)' }}
        onClick={() => console.log('Edit')}
      >
        Edit
      </ButtonContained>
    ),
    sortable: false,
  },
  {
    name: '',
    selector: (row: any) => (
      <ButtonOutlined width="100%" onClick={() => deleteHandler(row.id)}>
        Delete
      </ButtonOutlined>
    ),
    sortable: false,
  },
];

const paginationComponentOptions = {
  noRowsPerPage: true,
};

export const Coupons = () => {
  const couponService = new CouponsService();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [filterLike, setFilterLike] = useState('');

  const fetchCoupons = async (page: number) => {
    setLoading(true);

    couponService.getCoupons(page, ROWS_PER_PAGE, filterLike).then((r) => {
      if (r.success) {
        console.log(r);
        setData(r.data);
        setTotalRows(r.total);
        setLoading(false);
      }
    });
  };

  const handlePageChange = (page: number) => {
    fetchCoupons(page);
  };

  const handleSearch = () => {
    fetchCoupons(1);
  };

  useEffect(() => {
    fetchCoupons(1);
  }, []);

  // Add Coupon
  const addHandler = async () => {
    ModalStore.setAddItem({ addType: 'coupon' });
    ModalStore.setModalStatus({ open: true, action: 'addItem' });
  };

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div className={s.Coupons}>
            <div className={s.Coupons__header}>
              <h2>Coupons</h2>
            </div>
            <div className={s.Coupons__table_searchFieldWrapper}>
              <Input
                label="Search for a coupon:"
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
                Add Coupon
              </ButtonContained>
            </div>
            <div className={s.Coupons__table}>
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
