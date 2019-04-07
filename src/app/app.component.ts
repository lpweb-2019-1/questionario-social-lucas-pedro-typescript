import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  nome: string = null;
  sexo: boolean = null;
  idade: number = null;
  cidade: string = null;

  tela: string = "home";

  questionario_social: Array<object> = [];

  constructor() {}

  cadastrar = (form): void => {
    form.valid;
  };

  apresentarTela = (tela: string): string => (this.tela = tela);
}
