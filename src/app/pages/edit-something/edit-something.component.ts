import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataService } from "src/app/services/data.service";
import { Adherent } from "src/app/models /adherent";
import { Adresse } from "src/app/models /adresse";
import { NgForm } from "@angular/forms";
import { AdresseService } from "src/app/services/adresse.service";
import { AdherentsService } from "src/app/services/adherents.service";

@Component({
  selector: "app-edit-something",
  templateUrl: "./edit-something.component.html",
  styleUrls: ["./edit-something.component.css"],
})
export class EditSomethingComponent implements OnInit {
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditSomethingComponent>,
    private adresseService: AdresseService,
    private adherentService: AdherentsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  cin: String;
  adherent: Adherent;
  nomAdherent;
  adresse: Adresse;
  ngOnInit(): void {
    this.cin = this.data.idAdherent;

    const adherentAux = this.dataService.searchAdherent2(this.cin);
    this.adherent = new Adherent(
      adherentAux.email,
      adherentAux.prenom,
      adherentAux.nom,
      adherentAux.numTel1,
      adherentAux.numTel2,
      adherentAux.numCarte,
      adherentAux.amId,
      adherentAux.cin,
      adherentAux.codeUtecom,
      adherentAux.statut,
      adherentAux.adrId
    );
    this.adherent.id = adherentAux.id;
    this.adresse = this.dataService.searchAdherent2(this.cin).adresse;
    this.adherent.amId = this.data.idAmicale;
  }
  liste = ["moahemd", "amine"];
  public gouvernorats = [
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
  selectGouvernorat(index: number) {
    this.gouvernoratNumber = index;
    this.municpalite = "";
  }
  selectMunicipalite(municipalte: String) {
    this.municpalite = municipalte;
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    this.adresse.municipalite = this.gouvernorats[this.gouvernoratNumber];
    this.adresse.ville = this.municpalite;
    console.log(this.adresse);

    this.adresseService.addAdresse(this.adresse).subscribe((res: Number) => {
      console.log();
      this.adherent.adrId = res.toString();
      console.log(this.adherent.adrId);
      console.log(this.adherent);
      this.adherentService.editAdherent(this.adherent).subscribe((res) => {
        this.dataService.editAdherent(this.adherent);
      });
    });
  }
}
