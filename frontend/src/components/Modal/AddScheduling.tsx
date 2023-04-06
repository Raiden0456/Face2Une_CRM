import React, { useEffect, useState } from 'react';
import { ButtonContained } from '../base/Button';
import { IScheduling } from '../../store/Modal.store';
import { TailSpinFixed } from '../TailSpin';
import { Input } from '../base/Input';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import { Radio } from '../base/Checkbox';
import DatePicker from 'react-datepicker';
import { saloon_ids } from '../../utils/staticData';
import { IEmployee, UserService } from '../../service/UserService';
import { SelectField } from '../base/SelectField';
import { useDebounce } from '../../hooks/debounceSearch';
import { useFilteredEmployees } from '../../hooks/use-filtered-employees';
import { ScheduleService } from '../../service/ScheduleService';

import s from './AddItem.scss';

// Add working Days / Add lunch time
const AddScheduling: React.FC<IScheduling> = ({ schedulingType, edit }) => {
  const userService = new UserService();
  const scheduleService = new ScheduleService();
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [saloonId, setSaloonId] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 300);

  const { filteredEmployees } = useFilteredEmployees(employees, debouncedSearch);

  useEffect(() => {
    setLoading(true);

    userService.getAllEmployees().then((r) => {
      if (r.success) {
        setEmployees(r.data);
        setLoading(false);
      }
    });
  }, []);

  // Add Schedule Handler
  const handleSubmit = async () => {
    setLoading(true);

    if (schedulingType === 'workDays') {
      scheduleService
        .createSchedule({
          employee_id: employeeId!!,
          work_date_start: startDate,
          work_date_end: endDate!!,
          saloon_id: saloonId,
        })
        .then((r) => {
          if (r.success) {
            console.log('Successfully Added!');
            window.location.reload();
          }
        });
    } else {
      scheduleService
        .createLunch({
          employee_id: employeeId!!,
          lunch_time: startDate,
        })
        .then((r) => {
          if (r.success) {
            console.log('Successfully Added!');
            window.location.reload();
          }
        });
    }

    setLoading(false);
  };

  // Date range pick
  const onDateRange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      {loading ? (
        <TailSpinFixed />
      ) : (
        <div className={s.AddItem}>
          {/* Add working Days Employee */}
          <form
            id="AddScheduling"
            onSubmit={(e) => {
              e.preventDefault();
              if (!endDate && schedulingType === 'workDays') return alert('Please select a date range!');
              handleSubmit();
            }}
            className={s.AddItemForm}
          >
            {schedulingType === 'workDays' ? <h2>Add working days</h2> : <h2>Add lunch time</h2>}
            <div className={s.AddItemForm__inputs}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input
                    label="Search for an employee by last name:"
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <SelectField
                  label={'Choose an employee'}
                  options={filteredEmployees?.map((employee: IEmployee) => ({
                    label: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                  }))}
                  required
                  onChange={(e) => setEmployeeId(e.value)}
                />
              </div>
              <div>
                {schedulingType === 'workDays' && (
                  <div className={s.AddItemForm_radios}>
                    <h3>Available Studios:</h3>
                    {saloon_ids.map((saloon) => (
                      <Radio
                        name="saloons"
                        value={saloon.id}
                        style={{ marginRight: '0.5rem' }}
                        onChange={(e) => setSaloonId(Number(e))}
                        key={saloon.id}
                        defaultChecked={saloon.id === saloonId}
                        required
                      >
                        {saloon.text}
                      </Radio>
                    ))}
                  </div>
                )}
                <br />
                <div className={s.AddItem__datepicker}>
                  {schedulingType === 'workDays' ? (
                    <>
                      <p style={{ marginBottom: '5px' }}>Choose Working Days:</p>
                      <DatePicker
                        selected={startDate}
                        onChange={onDateRange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        required
                      />
                    </>
                  ) : (
                    <>
                      <p style={{ marginBottom: '5px' }}>Choose Lunch Time:</p>
                      <DatePicker
                        selected={startDate}
                        showTimeSelect
                        onChange={(date: Date) => setStartDate(date)}
                        timeFormat="HH:mm"
                        minDate={new Date()}
                        minTime={setHours(setMinutes(new Date(), 0), 10)}
                        maxTime={setHours(setMinutes(new Date(), 0), 20)}
                        timeIntervals={5}
                        dateFormat="MMMM d, yyyy HH:mm"
                        inline
                        required
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <ButtonContained disabled={loading} type="submit">
              Add Schedule
            </ButtonContained>
          </form>
        </div>
      )}
    </>
  );
};

export default AddScheduling;
