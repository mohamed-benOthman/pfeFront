import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DataService } from "src/app/services/data.service";
import { MatStepper } from "@angular/material/stepper";
import { Adresse } from "src/app/models /adresse";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdresseService } from "src/app/services/adresse.service";
import { AdherentsService } from "src/app/services/adherents.service";
import { Adherent } from "src/app/models /adherent";

@Component({
  selector: "app-add-something",
  templateUrl: "./add-something.component.html",
  styleUrls: ["./add-something.component.css"],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
})
export class AddSomethingComponent implements OnInit {
  constructor(
    private adresseService: AdresseService,
    private adherentService: AdherentsService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<AddSomethingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataservice: DataService
  ) {}
  idAmicale;
  completed = false;
  width: number = window.innerWidth;

  optimalWidth = 1200;
  gouvernorats = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kébili",
    "Le Kef",
    "Mahdia",
    "La Manouba",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];

  muncipalites = [
    [
      "Ariana Ville",
      "Ettadhamen",
      "Kalâat el-Andalous",
      "La Soukra",
      "Mnihla",
      "Raoued",
      "Sidi Thabet",
    ],
    [
      "Amdoun",
      "Béja Nord",
      "Béja Sud",
      "Goubellat",
      "Medjez el-Bab",
      "Nefza",
      "Téboursouk",
      "Testour",
      "Thibar",
    ],
    [
      "Ben Arous",
      "Bou Mhel el-Bassatine",
      "El Mourouj",
      "Ezzahra",
      "Fouchana",
      "Hammam Chott",
      "Hammam Lif",
      "Mohamedia",
      "Medina Jedida",
      "Mégrine",
      "Mornag",
      "Radès",
    ],
    [
      "Bizerte Nord",
      "Bizerte Sud",
      "El Alia",
      "Ghar El Melh",
      "Ghezala",
      "Joumine",
      "Mateur",
      "Menzel Bourguiba",
      "Menzel Jemil",
      "Ras Jebel",
      "Sejnane",
      "Tinja",
      "Utique",
      "Zarzouna",
    ],
    [
      "Gabès Médina",
      "Gabès Ouest ",
      "Gabès Sud",
      "Ghannouch",
      "El Hamma",
      "Matmata",
      "Mareth",
      "Menzel",
      "Métouia",
      "Nouvelle Matmata",
    ],
    [
      "Belkhir",
      "El Guettar ",
      "El Ksar",
      "Gafsa Nord",
      "Gafsa Sud",
      "Mdhilla",
      "Métlaoui",
      "Moularès",
      "Redeyef",
      "Sened",
      "Sidi Aïch",
    ],
    [
      "Aïn Draham",
      "Balta-Bou Aouane",
      "Bou Salem",
      "Fernana",
      "Ghardimaou",
      "Jendouba Sud",
      "Jendouba Nord",
      "Oued Meliz",
      "Tabarka",
    ],

    [
      "Bou Hajla",
      "Chebika",
      "Echrarda",
      "El Alâa",
      "Haffouz",
      "Hajeb El Ayoun",
      "Kairouan Nord",
      "Kairouan Sud",
      "Nasrallah",
      "Oueslatia",
      "Sbikha",
    ],
    [
      "El Ayoun",
      "Ezzouhour",
      "Fériana",
      "Foussana",
      "Haïdra",
      "Hassi El Ferid",
      "Jedelienne",
      "Kasserine Nord",
      "Kasserine Sud",
      "Majel Bel Abbès",
      "Sbeïtla",
      "Sbiba",
      "Thala",
    ],
    [
      "Douz Nord",
      "Douz Sud",
      "Faouar",
      "Kébili Nord",
      "Kébili Sud",
      "Souk Lahad",
    ],
    [
      "Borj El Amri",
      "Djedeida",
      "Douar Hicher",
      "El Batan",
      "La Manouba",
      "Mornaguia",
      "Oued Ellil",
      "Tebourba",
    ],
    [
      "Dahmani",
      "Jérissa",
      "El Ksour",
      "Sers",
      "Kalâat Khasba",
      "Kalaat Senan",
      "Kef Est",
      "Kef Ouest",
      "Nebeur",
      "Sakiet Sidi Youssef",
      "Tajerouine",
    ],
    [
      "Bou Merdes",
      "Chebba",
      "Chorbane",
      "El Jem",
      "Essouassi",
      "Hebira",
      "Ksour Essef",
      "Mahdia",
      "Melloulèche",
      "Ouled Chamekh",
      "Sidi Alouane",
    ],
    [
      "Ben Gardane",
      "Beni Khedache",
      "Djerba - Ajim",
      "Djerba - Houmt Souk",
      "Djerba - Midoun",
      "Médenine Nord",
      "Médenine Sud",
      "Sidi Makhlouf",
      "Zarzis",
    ],
    [
      "Bekalta",
      "Bembla",
      "Beni Hassen",
      "Jemmal",
      "Ksar Hellal",
      "Ksibet el-Médiouni",
      "Moknine",
      "Monastir",
      "Ouerdanine",
      "Sahline",
      "Sayada-Lamta-Bou Hajar",
      "Téboulba",
      "Zéramdine",
    ],
    [
      "Béni Khalled",
      "Béni Khiar",
      "Bou Argoub",
      "Dar Chaâbane El Fehri",
      "El Haouaria",
      "El Mida",
      "Grombalia",
      "Hammam Ghezèze",
      "Hammamet",
      "Kélibia",
      "Korba",
      "Menzel Bouzelfa",
      "Menzel Temime",
      "Nabeul",
      "Soliman",
      "Takelsa",
    ],
    [
      "Agareb",
      "Bir Ali Ben Khalifa",
      "El Amra",
      "El Hencha",
      "Graïba",
      "Jebiniana",
      "Kerkennah",
      "Mahrès",
      "Menzel Chaker",
      "Sakiet Eddaïer",
      "Sakiet Ezzit",
      "Sfax Ouest",
      "Sfax Sud",
      "Sfax Ville",
      "Skhira",
      "Thyna",
    ],
    [
      "Bir El Hafey",
      "Cebbala Ouled Asker",
      "Jilma",
      "Meknassy",
      "Menzel Bouzaiane",
      "Mezzouna",
      "Ouled Haffouz",
      "Regueb",
      "Sidi Ali Ben Aoun",
      "Sidi Bouzid Est",
      "Sidi Bouzid Ouest",
      "Souk Jedid",
    ],
    [
      "Bargou",
      "Bou Arada",
      "El Aroussa",
      "El Krib",
      "Gaâfour",
      "Kesra",
      "Makthar",
      "Rouhia",
      "Sidi Bou Rouis",
      "Siliana Nord",
      "Siliana Sud",
    ],
    [
      "Akouda",
      "Bouficha",
      "Chott Meriem",
      "Enfida",
      "Hammam Sousse",
      "Hergla",
      "Kalâa Kebira",
      "Kalâa Seghira",
      "Kondar",
      "M'saken",
      "Sidi Bou Ali",
      "Sidi El Hani",
      "Sousse Jawhara",
      "Sousse Médina",
      "Sousse Riadh",
      "Sousse Sidi Abdelhamid",
    ],
    [
      "Bir Lahmar",
      "Dehiba",
      "Ghomrassen",
      "Remada",
      "Smâr",
      "Tataouine Nord",
      "Tataouine Sud",
    ],
    ["Degache", "Hazoua", "Nefta", "Tameghza", "Tozeur"],
    [
      "Bab El Bhar",
      "Bab Souika",
      "Carthage",
      "Cité El Khadra",
      "Djebel Jelloud",
      "El Kabaria",
      "El Menzah",
      "El Omrane",
      "El Omrane supérieur",
      "El Ouardia",
      "Ettahrir",
      "Ezzouhour",
      "Hraïria",
      "La Goulette",
      "La Marsa",
      "Le Bardo",
      "Le Kram",
      "Médina",
      "Séjoumi",
      "Sidi El Béchir",
      "Sidi Hassine",
    ],
    ["Bir Mcherga", "El Fahs", "Nadhour", "Saouaf", "Zaghouan", "Zriba"],
  ];
  municpalite;
  gouvernoratNumber = -1;
  nom = "";
  prenom = "";
  cin = "";
  codeUtecom = "";
  numCarte = "";
  num1 = "";
  num2 = "";
  email = "";
  exist = false;
  completed2 = false;
  ngOnInit() {
    this.idAmicale = this.data.idAmicale;
  }
  onWindowResize(event) {
    this.width = event.target.innerWidth;
  }
  selectGouvernorat(index: number) {
    this.gouvernoratNumber = index;
  }
  selectMunicipalite(municipalte: String) {
    this.municpalite = municipalte;
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit(form: NgForm, stepper: MatStepper) {
    this.nom = form.value.nom;
    this.prenom = form.value.prenom;
    this.cin = form.value.cin;
    this.codeUtecom = form.value.codeUtecom;
    this.numCarte = form.value.numCarte;
    this.num1 = form.value.num1;
    this.num2 = form.value.num2;
    this.email = form.value.email;
    if (this.dataservice.searchAdherent(this.cin)) {
      this.exist = true;
    } else {
      this.completed = true;
      stepper.next();
    }
  }
  onSubmit2(form: NgForm, stepper: MatStepper) {
    const adresse = new Adresse(
      form.value.rue,
      form.value.codePostale,
      this.municpalite,
      this.gouvernorats[this.gouvernoratNumber]
    );
    this.adresseService.addAdresse(adresse).subscribe((res) => {
      const adherent = new Adherent(
        this.email,
        this.prenom,
        this.nom,
        this.num1,
        this.num2,
        this.numCarte,
        this.idAmicale,
        this.cin,
        this.codeUtecom,
        "",
        res
      );
      this.adherentService.addAdherent(adherent).subscribe((res) => {
        stepper.next();

        this.dataService.addAdherent(adherent);
      });
    });
  }
}
