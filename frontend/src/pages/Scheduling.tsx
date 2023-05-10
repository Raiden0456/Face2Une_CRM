import { ButtonContained, ButtonDelete } from '../components/base/Button';
import React, { useEffect, useState } from 'react';
import { Container } from '../components/base/Container';
import { ModalStore } from '../store/Modal.store';
import NavBar from '../components/Navbar';
import { Radio } from '../components/base/Checkbox';
import DatePicker from 'react-datepicker';
import DataTable from 'react-data-table-component';
import { ScheduleService } from '../service/ScheduleService';
import CancelIcon from '@mui/icons-material/Cancel';
import { findElementById } from '../utils/funcs';
import { customTableStyles } from '../utils/customTableStyles';
import { ProceduresStore } from '../store/Procedures.store';


import s from './Scheduling.scss';

// Delete Schedule
const deleteHandler = async (id: number) => {
  ModalStore.setDeleteItem({ deleteType: 'schedule', id });
  ModalStore.setModalStatus({ open: true, action: 'deleteItem' });
};

const ROWS_PER_PAGE = 10;

const columns = [
  { name: 'ID', selector: (row: any) => row.id, sortable: true },
  { name: 'Full Name', selector: (row: any) => row.full_name, sortable: true },
  {
    name: 'Work Date',
    selector: (row: any) => row.work_date,
    sortable: true,
    cell: (row: any) =>
      row.work_date ? (
        <div style={{ color: 'green', fontWeight: '700' }}>{row.work_date}</div>
      ) : (
        <CancelIcon color="warning" />
      ),
  },
  {
    name: 'Lunch Time',
    selector: (row: any) =>
      row.lunch_time ? (
        <div style={{ color: 'green', fontWeight: '700' }}>{row.lunch_time}</div>
      ) : (
        <CancelIcon color="warning" />
      ),
    sortable: true,
  },
  {
    name: 'Saloon',
    selector: (row: any) =>
      row.saloon_id ? (
        findElementById(ProceduresStore.saloonsStatus.saloonsData, row.saloon_id).text
      ) : (
        <CancelIcon color="warning" />
      ),
    sortable: true,
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

export const Scheduling = () => {
  const scheduleService = new ScheduleService();
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [saloonId, setSaloonId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEmployees = async (page: number, workDate: string | Date) => {
    setLoading(true);

    scheduleService.getSchedule({ index: page, perPage: ROWS_PER_PAGE, workDate, saloonId }).then((r) => {
      if (r.success) {
        setData(r.data);
        setTotalRows(r.data.length);
        setLoading(false);
      }
    });
  };

  const handlePageChange = (page: number) => {
    fetchEmployees(page, startDate);
  };

  useEffect(() => {
    fetchEmployees(1, startDate);
  }, [saloonId, startDate, saloonId]);

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
                <h4 style={{ marginBottom: '5px' }}>Choose Date:</h4>
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
                <h3>Available Studios:</h3>

                <Radio
                  required
                  name="saloons"
                  onChange={(e) => {
                    setSaloonId(Number(e));
                  }}
                  defaultChecked
                  value={0}
                >
                  All
                </Radio>
                {ProceduresStore.saloonsStatus.saloonsData?.map((saloon) => (
                  <Radio
                    required
                    name="saloons"
                    onChange={(e) => {
                      setSaloonId(Number(e));
                    }}
                    key={saloon.id}
                    value={saloon.id}
                  >
                    {saloon.address}
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
