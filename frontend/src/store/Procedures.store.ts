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
  id: number;
  name: string;
  price: number;
  amount: number;
  procedure_id: number;
};

interface IProceduresStatus {
  proceduresData?: ProcedureData[] | null;
  optionalProceduresData?: ProcedureData[] | null;
  packagesData?: PackageData[] | null;
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
  },
  setProceduresStatus({ proceduresData, optionalProceduresData, packagesData }) {
    this.proceduresStatus = {
      proceduresData,
      optionalProceduresData,
      packagesData
    };
  },
});
