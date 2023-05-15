import { JSONFetch, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';

interface NewAppointment {
  id?: number | string;
  procedure_id: number;
  additional_ids: number[];
  reservation_date_time: Date;
  client_id: number;
  saloon_id: number;
}

interface NewPack {
  client_id: number;
  package_id: number;
  amount: number;
  saloon_id: number;
}

interface NewCertificate {
  client_id: number;
  certificate_id: number;
  saloon_id: number;
}

interface Promocode {
  email: string;
  promocode: string;
}

export class AppointmentService {
  async createAppointment(
    { data, promocode }: { data: NewAppointment[]; promocode?: Promocode },
    redirectUrl = '/confirmation',
  ) {
    const r = await JSONFetch('create_appoint', { data, promocode });

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

  async buyPack({ client_id, package_id, amount, saloon_id }: NewPack) {
    const r = await JSONFetch('buy_pack', {
      client_id,
      saloon_id,
      packages: [
        {
          package_id,
          amount_bought: amount,
        },
      ],
    });

    if (r?.id) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/confirmation-package' });
    }
  }

  async buyCertificate(buyCertificate: NewCertificate) {
    const r = await JSONFetch('buy_cert', buyCertificate);

    if (r?.id) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/confirmation-certificate' });
    }
  }
}
