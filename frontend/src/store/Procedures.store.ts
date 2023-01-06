import { observable } from 'mobx';

export type ProcedureData = { id: number; name: string; description: string; price: number; duration: number };
export type OptionalProcedureData = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  additional: number;
};

interface IProceduresStatus {
  proceduresData?: ProcedureData[] | null;
  optionalProceduresData?: OptionalProcedureData[] | null;
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
