import { JSONFetch, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

interface NewAppointment {
  proc_id: number;
  opt_proc_id: number[];
  date: Date;
  client_id: number;
  total_price: number | null;
}

export class AppointmentService {
  async createAppointment({ proc_id, opt_proc_id, date, client_id, total_price }: NewAppointment) {
    const r = await JSONFetch('create_appoint', {
      procedure_id: proc_id,
      additional_ids: opt_proc_id,
      reservation_date_time: date,
      client_id,
      total_price,
    });

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/confirmation' }); // TBD Set Fallback
    }
  }
}
