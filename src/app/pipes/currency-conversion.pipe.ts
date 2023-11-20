import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConversion'
})
export class CurrencyConversionPipe implements PipeTransform {

  api = "https://api.exchangerate-api.com/v4/latest/USD";
  defaultLang = 'english';

  currencies = [
    { code: "PES", name: "peseta", "country": "es", value: 1, currencyRate: 151.182 },
    { code: "TIR", name: "Turkish-lira", "country": "tr", value: 2, currencyRate: 14.84 },
    { code: "IIR", name: "Italian-lira", "country": "it", value: 3, currencyRate: 0 },
    { code: "PTE", name: "Portuguese escudo", "country": "pt", value: 4, currencyRate: 0.91 },
    { code: "DIR", name: "Dirham", "country": "ar", value: 5, currencyRate: 3.67 },
    { code: "YUN", name: "Yuan", "country": "zh", value: 6, currencyRate: 6.37 },
  ];

  constructor() { }

  transform(value: number): number {

    for (let currency of this.currencies) {
      if (this.defaultLang == currency.country) {
        let convertedPrice = (currency.currencyRate * value);
        return convertedPrice;
      }
      else return value;
    }
    return value;
  }

}
