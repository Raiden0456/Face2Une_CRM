import { observable } from 'mobx';

export type ProcedureData = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  additional: number;
  saloon_ids?: number[];
};

interface IProceduresStatus {
  proceduresData?: ProcedureData[] | null;
  optionalProceduresData?: ProcedureData[] | null;
}

export interface IProceduresStore {
  proceduresStatus: IProceduresStatus;
  setProceduresStatus: (status: IProceduresStatus) => void;
}

export const ProceduresStore = observable<IProceduresStore>({
  proceduresStatus: {
    proceduresData: null,
    optionalProceduresData: null,
  },
  setProceduresStatus({ proceduresData, optionalProceduresData }) {
    this.proceduresStatus = {
      proceduresData,
      optionalProceduresData,
    };
  },
});
