import { Component } from "@angular/core";
import { async } from "@angular/core/testing";

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

  questionario_social: Array<object> =
    JSON.parse(localStorage.getItem("Pessoa")) || [];

  constructor() {}

  cadastrar = (form: any): void => {
    const pessoa = {
      nome: this.nome,
      sexo: this.sexo,
      idade: this.idade,
      cidade: this.cidade
    };
    this.questionario_social.push(pessoa);
    this.isSalvar();
    form.reset();
    console.log(this.questionario_social);
  };

  apresentarTela = (tela: string): string => (this.tela = tela);
  isSalvar = async () =>
    localStorage.setItem(
      "Pessoas",
      JSON.stringify(await this.questionario_social)
    );
}
