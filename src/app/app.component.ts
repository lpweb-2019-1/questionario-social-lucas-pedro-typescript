import { Component, OnInit } from "@angular/core";
import { PessoaManagerService } from "./controller/pessoa-manager.service";
import { PesquisaManagerService } from "./pesquisa-manager.service";

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
  selecionaCidade: string = null;

  tela: string = "home";
  constructor(private pesquisa: PesquisaManagerService) {}

  ngOnInit() {}

  cadastrar = (form: any): void => {
    const dados = {
      nome: this.nome,
      sexo: this.sexo,
      idade: this.idade,
      cidade: this.selecionaCidade
    };
    this.pesquisa.salvar(dados);
    form.reset();
  };

  apresentarTela = (tela: string): string => (this.tela = tela);
}
