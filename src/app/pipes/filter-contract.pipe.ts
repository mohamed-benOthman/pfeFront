import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterContract",
})
export class FilterContractPipe implements PipeTransform {
  transform(value: any[], searchString: string): unknown {
    if (!searchString) {
      console.log("no search");
      return value;
    }
    return value.filter((it) => {
      const numPolice = it.numPolice.includes(searchString);

      return numPolice;
    });
  }
}
