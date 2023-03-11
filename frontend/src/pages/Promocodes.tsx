import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import NavBar from '../components/Navbar';
import { PromocodesService } from '../service/PromocodesService';
import DataTable from 'react-data-table-component';

import s from './Promocodes.scss';

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
  { name: 'Name', selector: (row: any) => row.full_name, sortable: true },
  { name: 'Code', selector: (row: any) => row.email, sortable: true },
  { name: 'Discount', selector: (row: any) => row.phone, sortable: true },
  { name: 'Procedures', selector: (row: any) => row.phone, sortable: false },
  { name: 'Expiry date', selector: (row: any) => row.phone, sortable: true },
];

const paginationComponentOptions = {
  noRowsPerPage: true,
};

export const Promocodes = () => {
  const promocodeService = new PromocodesService();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [filterLike, setFilterLike] = useState('');

  const fetchPromocodes = async (page: number) => {
    setLoading(true);

    promocodeService.getPromocodes(page, ROWS_PER_PAGE, filterLike).then((r) => {
      if (r.success) {
        console.log(r);
        setData(r.data);
        setTotalRows(r.total);
        setLoading(false);
      }
    });
  };

  const handlePageChange = (page: number) => {
    fetchPromocodes(page);
  };

  const handleSearch = () => {
    fetchPromocodes(1);
  };

  useEffect(() => {
    fetchPromocodes(1);
  }, []);

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div className={s.Clients}>
            <div className={s.Clients__header}>
              <h2>Clients</h2>
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
