import { JSONFetch, JSONFetchDelete, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';
import { ProcedureData } from '../store/Procedures.store';

interface IPackageData {
  id?: number;
  name: string;
  price: number;
  amount: number;
  procedure_ids: number[];
}

export class ProceduresService {
  async getProcedures() {
    const r = await JSONFetchGet('main_proc');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async getPackages() {
    const r = await JSONFetchGet('pack');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async getProcedure(id: number | string | null) {
    const r = await JSONFetchGet(`proc/${id}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async getOptionalProcedures() {
    const r = await JSONFetchGet('optional_proc');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async updateProcedure(updateProcedure: ProcedureData) {
    const r = await JSONFetch('update_proc', updateProcedure);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async updatePackage(updatePackage: IPackageData) {
    const r = await JSONFetch('update_pack', updatePackage);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async createProcedure(createProcedure: ProcedureData) {
    const r = await JSONFetch('create_proc', createProcedure);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async createPackage(createPackage: IPackageData) {
    const r = await JSONFetch('create_pack', createPackage);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async deleteProcedure(procedureId: number) {
    const r = await JSONFetchDelete(`delete_proc/${procedureId}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async deletePackage(packageId: number) {
    const r = await JSONFetchDelete(`delete_pack/${packageId}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }

  async calcTotal(ids: string) {
    const r = await JSONFetchGet(`proc_total?proc_array=${ids}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' }); // TBD Set Fallback
    }
  }
}
