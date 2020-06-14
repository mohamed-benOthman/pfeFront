export class User {
  email?: String;
  cin?: String;
  nom?: String;
  prenom?: String;
  // token?: String;
  // refresh_token?: String;
  role?: String;
  id: String;
  password: String;
  constructor(
    email: String,
    cin: String,
    nom: String,
    prenom: String,
    // token: String,
    // refresh_token: String,
    role: String
  ) {
    this.email = email;
    this.cin = cin;
    this.nom = nom;
    this.prenom = prenom;
    // this.token = token;
    // this.refresh_token = refresh_token;
    this.role = role;
  }
}
