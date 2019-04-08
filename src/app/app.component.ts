import { Component, OnInit } from "@angular/core";
import { PessoaManagerService } from "./controller/pessoa-manager.service";
import { Pessoa } from "./pessoa/pessoa";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  nome: string = null;
  sexo: string = null;
  idade: number = null;
  cidade: string = null;

  tela: string = "home";

  questionario_social: Array<object | any> =
    JSON.parse(localStorage.getItem("Pessoas")) || [];

  constructor(private pessoa: PessoaManagerService) {}

  ngOnInit() {}

  cadastrar = (form: any): void => {
    const dados = {
      nome: this.nome,
      sexo: this.sexo,
      idade: this.idade,
      cidade: this.cidade
    };

    this.pessoa.salvar(dados);
    form.reset();
  };

  apresentarTela = (tela: string): string => (this.tela = tela);
}
