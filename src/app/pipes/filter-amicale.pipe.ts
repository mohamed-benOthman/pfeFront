import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Amicale } from '../models /amicale';

@Pipe({
  name: 'filterAmicale',
})
export class FilterAmicalePipe implements PipeTransform {
  transform(amicales: Amicale[], searchString: string): Amicale[] {
    if (!searchString) {
      console.log('no search');
      return amicales;
    }
    return amicales.filter(
      (amicale) =>
        amicale.nom.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
  }
}
