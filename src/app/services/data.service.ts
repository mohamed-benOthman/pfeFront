import { Injectable, ɵConsole } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models /user";
import { Amicale } from "../models /amicale";
import { AmicalesService } from "./amicales.service";
import { Adherent } from "../models /adherent";
import { AdherentsService } from "./adherents.service";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private listAmicale: Amicale[] = [];
  private listAmicaleSource = new BehaviorSubject<Amicale[]>(this.listAmicale);
  currentAmicaleList = this.listAmicaleSource.asObservable();

  private listAdherent: Adherent[];
  private listAdherentSource = new BehaviorSubject<Adherent[]>(
    this.listAdherent
  );
  currentAdherentList = this.listAdherentSource.asObservable();
  private oldUser = new User("", "", "", "", "");
  private userSource = new BehaviorSubject<User>(this.oldUser);

  currentUser = this.userSource.asObservable();
  // private amicalesSource=new BehaviorSubject<Amicale[]>
  constructor(
    private amicaleService: AmicalesService,
    private adherentService: AdherentsService
  ) {
    this.amicaleService.getAmicales().subscribe((res: Amicale[]) => {
      this.listAmicale = res;
      this.listAmicaleSource.next(res);
    });
  }
  public getUser(): User {
    return this.userSource.value;
  }
  changeUser(user: User) {
    this.userSource.next(user);
  }
  addAmicale(amicale: any) {
    this.listAmicale.push(amicale);
  }
  deleteAmicale(nom: String) {
    for (let i = 0; i < this.listAmicale.length; i++) {
      if (this.listAmicale[i].nom === nom) {
        this.listAmicale.splice(i, 1);
        console.log(nom);
      }
    }
  }
  getListAmicales() {
    return this.listAmicaleSource.value;
  }
  searchAmicale(nom: String) {
    let result = false;
    for (let i = 0; i < this.listAmicaleSource.value.length; i++) {
      if (this.listAmicaleSource.value[i].nom === nom) {
        result = true;
        break;
      }
    }
    return result;
  }
  editAmicale(amicale: Amicale) {
    for (let i = 0; i < this.listAmicaleSource.value.length; i++) {
      if (this.listAmicaleSource.value[i].nom === amicale.nom) {
        this.listAmicaleSource.value[i] = amicale;
      }
    }
  }
  searchAmicale2(nom: String) {
    for (let i = 0; i < this.listAmicaleSource.value.length; i++) {
      if (this.listAmicaleSource.value[i].nom === nom) {
        return this.listAmicaleSource.value[i];
      }
    }
    return null;
  }
  addListAdherent(listAdherent: Adherent[]) {
    this.listAdherentSource.next(listAdherent);
  }
  addAdherent(adherent: Adherent) {
    this.listAdherentSource.value.push(adherent);
  }
  deleteAdherent(id: String) {
    for (let i = 0; i < this.listAdherentSource.value.length; i++) {
      if (this.listAdherentSource.value[i].id === id) {
        this.listAdherentSource.value.splice(i, 1);
      }
    }
    console.log(this.listAdherentSource.value);
  }
  searchAdherent(cin) {
    let result = false;
    for (let i = 0; i < this.listAdherentSource.value.length; i++) {
      if (this.listAdherentSource.value[i].cin === cin) {
        result = true;
        break;
      }
    }
    return result;
  }
  searchAdherent2(cin): Adherent {
    for (let i = 0; i < this.listAdherentSource.value.length; i++) {
      if (this.listAdherentSource.value[i].cin === cin) {
        return this.listAdherentSource.value[i];
      }
    }
    return null;
  }
  editAdherent(adherent: Adherent) {
    for (let i = 0; i < this.listAdherentSource.value.length; i++) {
      if (this.listAdherentSource.value[i].cin === adherent.cin) {
        return (this.listAdherentSource.value[i] = adherent);
      }
    }
  }
  getListAdherent() {
    return this.listAdherentSource.value;
  }
  adherentsActifs() {
    let nb = 0;
    for (let i = 0; i < this.listAdherentSource.value.length; i++) {
      if (this.listAdherentSource.value[i].statut == "actif") {
        nb++;
      }
    }
    return nb;
  }
}
