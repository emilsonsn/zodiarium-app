import { Payment } from "./payment";

export interface Sale {
  id: number;
  stats: SaleStatus;
  client_id: number;
  payments: Payment[]
}

export enum SaleStatus {
  Pending = "Pending",
  Rejected = "Rejected",
  Finished = "Finished",
}