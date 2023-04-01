import { ButtonContained, ButtonDelete, ButtonEdit, ButtonOutlined } from '../components/base/Button';
import React, { useEffect, useState } from 'react';
import { Container } from '../components/base/Container';
import { ModalStore } from '../store/Modal.store';
import NavBar from '../components/Navbar';
import { AppointmentService } from '../service/AppointmentService';
import { renameAndDeleteArrayObjects } from '../utils/funcs';
import { Button, Typography } from '@mui/material';
import { LocationOnRounded, PersonRounded, PaymentsRounded, FaceRetouchingNaturalRounded } from '@mui/icons-material';
import { formatPhoneNumber } from '../utils/formatPhone';
import { saloon_ids } from '../utils/staticData';
import { Radio } from '../components/base/Checkbox';
import { SelectField } from '../components/base/SelectField';
import { UserService } from '../service/UserService';
import { TailSpinFixed } from '../components/TailSpin';
import DatePicker from 'react-datepicker';
import DataTable from 'react-data-table-component';

import s from './Scheduling.scss';

function generateFakeData(delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employees = [
        {
          employee_id: 1,
          employee_name: 'Alice',
          work_date: `${new Date()}`,
          lunch_time: `${new Date()}`,
          saloon_id: 1,
        },
        {
          employee_id: 2,
          employee_name: 'Bob',
          work_date: `${new Date()}`,
          lunch_time: `${new Date()}`,
          saloon_id: 2,
        },
        {
          employee_id: 3,
          employee_name: 'Carol',
          work_date: null,
          lunch_time: null,
          saloon_id: null,
        },
        {
          employee_id: 4,
          employee_name: 'David',
          work_date: `${new Date()}`,
          lunch_time: `${new Date()}`,
          saloon_id: 1,
        },
        {
          employee_id: 5,
          employee_name: 'Eve',
          work_date: null,
          lunch_time: null,
          saloon_id: null,
        },
      ];

      resolve(employees);
    }, delay);
  });
}

const ROWS_PER_PAGE = 10;

const columns = [
  { name: 'ID', selector: (row: any) => row.employee_id, sortable: true },
  { name: 'Full Name', selector: (row: any) => `${row.employee_name} ${row.employee_name}`, sortable: true },
  {
    name: 'Work Date',
    selector: (row: any) => row.work_date,
    sortable: true,
    cell: (row: any) => <div style={{ backgroundColor: row.work_date ? 'green' : 'none' }}>{row.work_date}</div>,
  },
  { name: 'Lunch Time', selector: (row: any) => row.lunch_time, sortable: true },
  { name: 'Saloon', selector: (row: any) => row.saloon_id, sortable: true },
  {
    name: '',
    selector: (row: any) => (
      <ButtonDelete width="100%" onClick={() => console.log('delete')}>
        Delete
      </ButtonDelete>
    ),
    sortable: false,
  },
];

const paginationComponentOptions = {
  noRowsPerPage: true,
};

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
      width: '150px',
    },
  },
  pagination: {
    style: {
      borderRadius: '0 0 16px 16px',
    },
  },
};

export const Scheduling = () => {
  const appointmentService = new AppointmentService();
  const userService = new UserService();
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [saloonId, setSaloonId] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  /* useEffect(() => {
    setLoading(true);
    userService.getSources().then((r) => {
      if (r.success) {
        setSources(r.data);
      }
      setLoading(false);
    });
  }, []); */

  // Change Saloon
  /* const sallonHandler = async (sallonId: number | null) => {
    triggerLoading(true);
    appointmentService.getAppointments(sallonId).then((r: any) => {
      if (r.success) {
        const result = renameAndDeleteArrayObjects(r.data, calendarNamings);
        setEvents(result);
        triggerLoading(false);
      }
    });
  }; */

  const fetchEmployees = async (page: number) => {
    setLoading(true);

    generateFakeData(2000).then((serverResponse: any) => {
      console.log(serverResponse);
      setData(serverResponse);
      setTotalRows(serverResponse.length);
      setLoading(false);
    });
  };

  const handlePageChange = (page: number) => {
    fetchEmployees(page);
  };

  const handleSearch = () => {
    fetchEmployees(1);
  };

  useEffect(() => {
    fetchEmployees(1);
  }, []);

  // Add working Days Employee
  const addWorkingDaysHandler = async () => {
    ModalStore.setScheduling({ schedulingType: 'workDays', edit: false });
    ModalStore.setModalStatus({ open: true, action: 'scheduling' });
  };

  // Add working Days Employee
  const addLunchTimeHandler = async () => {
    ModalStore.setScheduling({ schedulingType: 'launchTime', edit: false });
    ModalStore.setModalStatus({ open: true, action: 'scheduling' });
  };

  return (
    <Container
      header={<NavBar />}
      width="100%"
      content={
        <>
          <div className={s.Scheduling__header}>
            <div>
              <h3>Scheduling</h3>
              <div className={s.Scheduling__datepicker}>
                <p style={{ marginBottom: '5px' }}>Choose Date:</p>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  dateFormat="MMMM d, yyyy"
                  withPortal
                />
              </div>
            </div>

            <div className={s.Scheduling__header_right}>
              <div className={s.Salloon__switcher}>
                <h3>Available Saloons:</h3>

                {saloon_ids.map((saloon) => (
                  <Radio
                    required
                    name="saloons"
                    onChange={(e) => {
                      setSaloonId(Number(e));
                    }}
                    defaultChecked={saloon.id === saloonId}
                    key={saloon.id}
                    value={saloon.id}
                  >
                    {saloon.text}
                  </Radio>
                ))}
              </div>

              <ButtonContained onClick={addWorkingDaysHandler}>Add working days</ButtonContained>
              <ButtonContained onClick={addLunchTimeHandler}>Add lunch time</ButtonContained>
            </div>
          </div>

          <div className={s.Scheduling__table}>
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
        </>
      }
    />
  );
};
