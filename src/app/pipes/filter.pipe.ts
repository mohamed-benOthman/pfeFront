import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchString: string) {
    if (!searchString) {
      console.log('no search');
      return value;
    }

    return value.filter((it) => {
      const codeUtecom = it.codeUtecom.includes(searchString);
      const prenom = it.prenom
        .toLowerCase()
        .includes(searchString.toLowerCase());
      const nom = it.nom.toLowerCase().includes(searchString.toLowerCase());
      const email = it.email.toLowerCase().includes(searchString.toLowerCase());
      const numCarte = it.numCarte.includes(searchString);
      const cin = it.cin.includes(searchString);

      console.log(codeUtecom);
      return codeUtecom + prenom + nom + email + numCarte + cin;
    });
  }
}
