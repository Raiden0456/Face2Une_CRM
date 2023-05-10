import React, { useState, useEffect } from 'react';
import { Container } from '../components/base/Container';
import { ButtonContained } from '../components/base/Button';
import { Input } from '../components/base/Input';
import NavBar from '../components/Navbar';
import { ClientService } from '../service/ClientService';
import DataTable from 'react-data-table-component';
import { customTableStyles } from '../utils/customTableStyles';
import Moment from 'moment';
import { SelectField } from '../components/base/SelectField';
import { formatPhoneNumber } from '../utils/formatPhone';
import { ModalStore } from '../store/Modal.store';

import s from './Summary.scss';

// Add Client Order
const addHandler = async (clientId: number, email: string) => {
  ModalStore.setClientOrder({ clientId, email });
  ModalStore.setModalStatus({ open: true, action: 'clientOrder' });
};

const expandedFilters = [
  { label: 'Appointments', value: 'Appointments' },
  { label: 'Certificates', value: 'Certificates' },
  { label: 'Packages', value: 'Packages' },
];

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

export const Summary = () => {
  const clientService = new ClientService();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [filterLike, setFilterLike] = useState('');
  const [expandedFilter, setExpandedFilter] = useState({ label: 'Appointments', value: 'Appointments' });

  const fetchClients = async (page: number) => {
    setLoading(true);

    clientService.getClients(page, ROWS_PER_PAGE, filterLike).then((r) => {
      if (r.success) {
        setData(r.data);
        setTotalRows(r.total);
        setLoading(false);
      }
    });
  };

  const ExpandedComponent = ({ data }: any) => {
    const { appointments, track_certificates, client_packages } = data;
    const appointmentColumns = [
      { name: 'Total Price', selector: (row: any) => row.total_price, sortable: true },
      {
        name: 'Reservation Date',
        selector: (row: any) => Moment(row.reservation_date_time).format('MMMM DD, YYYY HH:mm'),
        sortable: true,
        wrap: true,
      },
      {
        name: 'Payment Date',
        selector: (row: any) => Moment(row.bought_on).format('MMMM DD, YYYY HH:mm'),
        sortable: true,
        wrap: true,
      },
      { name: 'Procedure', selector: (row: any) => row.procedures.name, sortable: false },
      { name: 'Studio', selector: (row: any) => row.saloons.address, sortable: true },
    ];

    const certificatesColumns = [
      { name: 'ID', selector: (row: any) => row.certificate_id, sortable: true },
      {
        name: 'Discount Left',
        selector: (row: any) => row.discount_left,
        sortable: true,
      },
      {
        name: 'Discount Left (GBP)',
        selector: (row: any) => row.discount_left_gbp,
        sortable: true,
      },
      {
        name: 'Expiration Date',
        selector: (row: any) => Moment(row.expiry_date).format('MMMM DD, YYYY HH:mm'),
        sortable: false,
        wrap: true,
      },
      {
        name: 'Payment Date',
        selector: (row: any) => Moment(row.bought_on).format('MMMM DD, YYYY HH:mm'),
        sortable: true,
        wrap: true,
      },
    ];

    const packagesColumns = [
      { name: 'Amount Left', selector: (row: any) => row.amount_left_in, sortable: true },
      {
        name: 'Expiration Date',
        selector: (row: any) => Moment(row.expiry_date).format('MMMM DD, YYYY HH:mm'),
        sortable: true,
        wrap: true,
      },
      {
        name: 'Payment Date',
        selector: (row: any) => Moment(row.bought_on).format('MMMM DD, YYYY HH:mm'),
        sortable: true,
        wrap: true,
      },
      { name: 'Package', selector: (row: any) => row.packages.name, sortable: false },
    ];

    return (
      <pre>
        {appointments?.length > 0 && expandedFilter.value === 'Appointments' && (
          <div style={{ margin: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Appointments:</h3>
            <DataTable className={s.Appointments__table} columns={appointmentColumns} data={appointments} />
          </div>
        )}
        {track_certificates?.length > 0 && expandedFilter.value === 'Certificates' && (
          <div style={{ margin: '2rem' }}>
            <h3>Certificates:</h3>
            <DataTable className={s.Appointments__table} columns={certificatesColumns} data={track_certificates} />
          </div>
        )}
        {client_packages?.length > 0 && expandedFilter.value === 'Packages' && (
          <div style={{ margin: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Packages:</h3>
            <DataTable className={s.Appointments__table} columns={packagesColumns} data={client_packages} />
          </div>
        )}
      </pre>
    );
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
          <div className={s.Summary}>
            <div className={s.Summary__header}>
              <h3>Clients Summary</h3>
            </div>
            <div className={s.Summary__table_searchFieldWrapper}>
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
            <SelectField
              style={{ width: '200px' }}
              label={'Order type:'}
              options={expandedFilters.map((cert) => ({
                label: cert.label,
                value: cert.value,
              }))}
              onChange={(e) => setExpandedFilter(e)}
              value={expandedFilter}
            />
            <div className={s.Summary__table}>
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
                //
                expandableRows
                expandableRowsComponent={ExpandedComponent}
              />
            </div>
          </div>
        </>
      }
    />
  );
};
