import { JSONFetch, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

interface NewAppointment {
  id?: number | string;
  proc_id: number;
  opt_proc_id: number[];
  date: Date;
  client_id: number;
  saloon_id?: number;
}

interface NewPack {
  client_id: number;
  package_id: number;
  amount: number;
}

interface NewCertificate {
  client_id: number;
  certificate_id: number;
}

export class AppointmentService {
  async createAppointment(
    { proc_id, opt_proc_id, date, client_id, saloon_id = 1 }: NewAppointment,
    redirectUrl = '/confirmation',
  ) {
    const r = await JSONFetch('create_appoint', {
      procedure_id: proc_id,
      additional_ids: opt_proc_id,
      reservation_date_time: date,
      client_id,
      saloon_id,
    });

    if (r?.id) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl });
    }
  }

  async updateAppointment(updateAppointment: NewAppointment) {
    const r = await JSONFetch('update_appoint', updateAppointment);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/calendar' });
    }
  }

  async getAppointments(sallonId?: number | string | null) {
    const r = await JSONFetchGet(`appoint?${sallonId ? `column=saloon_id&value=${sallonId}&` : ''}details=true`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/calendar' });
    }
  }

  async getAppointment(id: string | number) {
    const r = await JSONFetchGet(`appoint/${id}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/calendar' });
    }
  }

  async buyPack({ client_id, package_id, amount }: NewPack) {
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
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/confirmation-package' });
    }
  }

  async buyCertificate(buyCertificate: NewCertificate) {
    const r = await JSONFetch('buy_cert', buyCertificate);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/confirmation-certificate' });
    }
  }
}
