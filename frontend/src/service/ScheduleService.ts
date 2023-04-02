import { JSONFetch, JSONFetchDelete, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

interface IGetSchedule {
  index: number;
  perPage: number;
  workDate: string | Date;
}

interface ICreateSchedule {
  employee_id: number;
  work_date_start: string | Date;
  work_date_end: string | Date;
  saloon_id: number;
}

interface ICreateLunch {
  employee_id: number;
  lunch_time: string | Date;
}

export class ScheduleService {
  async getSchedule({ index, perPage, workDate }: IGetSchedule) {
    const r = await JSONFetchGet(`schedule?index=${index}&per_page=${perPage}&work_date=${workDate}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/scheduling' });
    }
  }

  async createSchedule(createSchedule: ICreateSchedule) {
    const r = await JSONFetch('create_schedule', createSchedule);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/scheduling' });
    }
  }

  async createLunch(createLunch: ICreateLunch) {
    const r = await JSONFetch('schedule_lunch', createLunch);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/scheduling' });
    }
  }

  async deleteSchedule(deleteSchedule: number) {
    const r = await JSONFetchDelete(`delete_schedule/${deleteSchedule}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/scheduling' });
    }
  }
}
