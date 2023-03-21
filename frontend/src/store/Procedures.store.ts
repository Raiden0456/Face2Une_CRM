import { observable } from 'mobx';

export type ProcedureData = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  additional: number;
  price_gbp?: number;
  saloon_ids?: number[];
};

export type PackageData = {
  id?: number;
  name: string;
  price: number;
  price_gbp?: number;
  amount: number;
  procedure_id: number;
};

export type CertificatesData = {
  id: number;
  name: string;
  price: number;
  price_gbp?: number;
};

interface IProceduresStatus {
  proceduresData?: ProcedureData[] | null;
  optionalProceduresData?: ProcedureData[] | null;
  packagesData?: PackageData[] | null;
  certificatesData?: CertificatesData[] | null;
}

export interface IProceduresStore {
  proceduresStatus: IProceduresStatus;
  setProceduresStatus: (status: IProceduresStatus) => void;
}

export const ProceduresStore = observable<IProceduresStore>({
  proceduresStatus: {
    proceduresData: null,
    optionalProceduresData: null,
    packagesData: null,
    certificatesData: null,
  },
  setProceduresStatus({ proceduresData, optionalProceduresData, packagesData, certificatesData }) {
    this.proceduresStatus = {
      proceduresData,
      optionalProceduresData,
      packagesData,
      certificatesData,
    };
  },
});
