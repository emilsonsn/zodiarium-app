import { ZodiacSignDetail } from "./quiz/zodiac";

export interface Client {
  id: number;
  name: string;
  email: string;
  whatsapp: number;
  zodiacSignDetail?: ZodiacSignDetail;
  singChartBs4?: string;
  created_at: Date;
  updated_at: Date;
}
