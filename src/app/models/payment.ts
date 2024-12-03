import { Sale } from "./sale";

export interface Payment {
  id?: number;
  sale_id: number;
  sale?: Sale;
  status: PaymentStatus;
  identifier: string; 
  reference: string; 
  entity: string;
  transaction_id: string;
  value: number;
}

export enum PaymentStatus {
  Pending = "Pending",
  Error = "Error",
  Successful = "Successful",
}