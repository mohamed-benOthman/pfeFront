import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models /user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  email: String;
  nom: String;
  prenom: String;
  cin: String;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentUser.subscribe((res: User) => {
      this.user = res;
      this.email = res.email;
      this.cin = res.cin;
      this.nom = res.nom;
      this.prenom = res.prenom;
    });
  }
}
