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
  masculino: boolean = null;
  feminino: boolean = null;

  questionario_social: Array<object> = [];

  constructor() {}

  salvar() {
    console.log(this.sexo);
    const pessoa = {
      nome: this.nome,
      sexo: this.sexo,
      idade: this.idade,
      cidade: this.cidade
    };

    this.questionario_social.push(pessoa);
  }
}
