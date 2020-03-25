import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {User} from '../models /user';
import { Amicale } from '../models /amicale';
import { AmicalesService } from './amicales.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private listAmicale:Amicale[];
  private listAmicaleSource=new BehaviorSubject<Amicale[]>(this.listAmicale);
   currentAmicaleList=this.listAmicaleSource.asObservable();
  private oldUser = new User(localStorage.getItem('email'), localStorage.getItem('cin'), localStorage.getItem('nom'), localStorage.getItem('prenom'), localStorage.getItem('token'), localStorage.getItem('refresh_token'));
  private userSource = new BehaviorSubject<User>(this.oldUser);
  currentUser = this.userSource.asObservable();
  // private amicalesSource=new BehaviorSubject<Amicale[]>
  constructor(private amicaleService: AmicalesService) {
    this.amicaleService.getAmicales()
      .subscribe(
        (res:Amicale[])=>
        {this.listAmicale=res;
        this.listAmicaleSource.next(res);
        }
      )
  }
  public getUser(): User {
    return this.userSource.value;
  }
  changeUser(user: User) {

    this.userSource.next(user);
  }
  addAmicale(amicale:Amicale){
    this.listAmicale.push(amicale);
  }
  getListAmicales(){
    return this.listAmicaleSource.value;
  }

}
