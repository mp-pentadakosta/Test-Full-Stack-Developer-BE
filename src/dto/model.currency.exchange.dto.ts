export interface ModelExchangeRate {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: { [key: string]: number };
}

// Converts JSON strings to/from your types
export class ConvertModelExchangeRate {
  public static toModelExchangeRate(json: string): ModelExchangeRate {
    return JSON.parse(json);
  }

  public static modelExchangeRateToJson(value: ModelExchangeRate): string {
    return JSON.stringify(value);
  }
}
