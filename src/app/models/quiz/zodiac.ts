export interface ZodiacSignDetail {
  icon: string;
  short_description: string;
  description: string;
}

export interface ZodiacSignData {
  zodiacSign: string;
  zodiacSignDetail: ZodiacSignDetail;
}
