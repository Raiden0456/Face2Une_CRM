import { JSONFetch, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

interface NewAppointment {
  proc_id: number;
  opt_proc_id: number[];
  date: Date;
  client_id: number;
}

interface NewPack {
  client_id: number;
  package_id: number;
  amount: number;
}

export class AppointmentService {
  async createAppointment({ proc_id, opt_proc_id, date, client_id }: NewAppointment) {
    const r = await JSONFetch('create_appoint', {
      procedure_id: proc_id,
      additional_ids: opt_proc_id,
      reservation_date_time: date,
      client_id,
    });

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/confirmation' }); // TBD Set Fallback
    }
  }

  async createPack({ client_id, package_id, amount }: NewPack) {
    const r = await JSONFetch('buy_pack', {
      client_id,
      packages: [
        {
          package_id,
          amount_bought: amount,
        },
      ],
    });

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/confirmation-package' }); // TBD Set Fallback
    }
  }
}