import { observable } from 'mobx';

export type PromocodeData = {
  id: number;
  name: string;
  code: string;
  procedure_ids: number[];
  discount: number;
  expiry_date: Date;
};

interface IPromocodesStatus {
  promocodesData?: PromocodeData[] | null;
}

export interface IPromocodesStore {
  promocodesStatus: IPromocodesStatus;
  setPromocodesStatus: (status: IPromocodesStatus) => void;
}

export const PromocodesStore = observable<IPromocodesStore>({
  promocodesStatus: {
    promocodesData: null,
  },
  setPromocodesStatus({ promocodesData }) {
    this.promocodesStatus = {
      promocodesData
    };
  },
});
