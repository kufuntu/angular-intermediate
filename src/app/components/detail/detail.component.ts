import { Component, OnInit } from "@angular/core";
import { User } from "../../types/user";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  user: User;

  constructor() {}

  ngOnInit() {
    // TODO: load user data dynamically
    this.user = {
      id: "87a7f25e-4a56-4530-b3a6-a9779fd3ad96",
      firstName: "Rosa",
      lastName: "Itt",
      address: "056 Pusch Parks",
      zip: "33867",
      city: "Jarosscheid",
      image: "https://s3.amazonaws.com/uifaces/faces/twitter/jcubic/128.jpg",
      phone: "8088 4803490",
      email: "Rosa87@gmail.com",
      interests: [
        "qui",
        "vitae",
        "minus",
        "vitae",
        "excepturi",
        "est",
        "eos",
        "veritatis",
        "earum",
        "vero",
      ],
    };
  }
}
