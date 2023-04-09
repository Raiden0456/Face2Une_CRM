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

export type SaloonsData = {
  id: number;
  address: string;
  image_src: string;
  country?: string;
  city?: string;
  index?: string;
};

interface IProceduresStatus {
  proceduresData?: ProcedureData[] | null;
  optionalProceduresData?: ProcedureData[] | null;
  packagesData?: PackageData[] | null;
  certificatesData?: CertificatesData[] | null;
}

interface ISaloonsData {
  saloonsData?: SaloonsData[] | null;
}

export interface IProceduresStore {
  saloonsStatus: ISaloonsData;
  proceduresStatus: IProceduresStatus;
  setProceduresStatus: (status: IProceduresStatus) => void;
  setSaloonsStatus: (status: ISaloonsData) => void;
}

export const ProceduresStore = observable<IProceduresStore>({
  saloonsStatus: {
    saloonsData: /* [
      {
        id: 1,
        address: '46 Rue De Richelieu',
        image_src:
          'https://images.squarespace-cdn.com/content/v1/5e77a8d31f1ca16b984e7d8c/7baecd3b-906a-491a-aed0-4d998fb9aad6/_SEB2784.jpg?format=1500w',
      },
      {
        id: 2,
        address: '61 Rue de Caumartin',
        image_src:
          'https://images.squarespace-cdn.com/content/v1/5e77a8d31f1ca16b984e7d8c/1656929372105-2QI01MJUI3S9MLEMJ0LX/IMG_1516+2.jpg?format=1500w',
      },
    ], */ null,
  },
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
  setSaloonsStatus({ saloonsData }) {
    this.saloonsStatus = {
      saloonsData,
    };
  },
});
