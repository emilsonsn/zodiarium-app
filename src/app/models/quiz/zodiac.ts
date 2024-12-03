export interface ZodiacSignDetail {
  icon: string;
  short_description: string;
  description: string;
}

export interface ZodiacSignData {
  zodiacSign: string;
  zodiacSignDetail: ZodiacSignDetail;
}


export interface ZodiacData {
  day: string;
  month: string;
  year: string;
  zodiacSign: ZodiacSignData;
  address: any;
  birth_hour: string;
  sex: string;
  email: string;
  phone: string;
  name: string;
}
