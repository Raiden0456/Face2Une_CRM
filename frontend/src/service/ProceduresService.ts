import { JSONFetch, JSONFetchDelete, JSONFetchGet } from '../api/fetchMethod';
import { ModalStore } from '../store/Modal.store';
import { CertificatesData, PackageData, ProcedureData } from '../store/Procedures.store';

export class ProceduresService {
  async getProcedures() {
    const r = await JSONFetchGet('main_proc');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async getPackages() {
    const r = await JSONFetchGet('pack');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async getCertificates() {
    const r = await JSONFetchGet('cert');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async getProcedure(id: number | string | null) {
    const r = await JSONFetchGet(`proc/${id}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async getOptionalProcedures() {
    const r = await JSONFetchGet('optional_proc');

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async updateProcedure(updateProcedure: ProcedureData) {
    const r = await JSONFetch('update_proc', updateProcedure);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async updatePackage(updatePackage: PackageData) {
    const r = await JSONFetch('update_pack', updatePackage);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async updateCertificate(updateCertificate: CertificatesData) {
    const r = await JSONFetch('update_cert', updateCertificate);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async createProcedure(createProcedure: ProcedureData) {
    const r = await JSONFetch('create_proc', createProcedure);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async createPackage(createPackage: PackageData) {
    const r = await JSONFetch('create_pack', createPackage);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async createCertificate(createCertificate: CertificatesData) {
    const r = await JSONFetch('create_cert', createCertificate);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async deleteProcedure(procedureId: number) {
    const r = await JSONFetchDelete(`delete_proc/${procedureId}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async deletePackage(packageId: number) {
    const r = await JSONFetchDelete(`delete_pack/${packageId}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async deleteCertificate(certificateId: number) {
    const r = await JSONFetchDelete(`delete_cert/${certificateId}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }

  async calcTotal(ids: string) {
    const r = await JSONFetchGet(`proc_total?proc_array=${ids}`);

    if (r?.success) {
      return r;
    } else {
      ModalStore.setModalStatus({ open: true, action: 'error', redirectUrl: '/' });
    }
  }
}
