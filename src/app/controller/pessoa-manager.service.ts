import { Injectable } from "@angular/core";
import { Pessoa } from "../pessoa/pessoa";

/**
 *
 * @author ***< Lucas Pedro Lopes >***
 * @tutorial Pessoa{} as instância de Pessoa são criada aqui no service PessoaManageService.
 * @variation lista_pessoas ***<Pessoa>*** A lista de pessoas armazena instâncias da class Pessoa{}.
 * @description ***Controlle** Toda lógica do app.componente.ts é de responsábilidade de PessoaManage{}.
 */

@Injectable({
  providedIn: "root"
})
export class PessoaManagerService {
  lista_pessoas: Array<object | any> =
    JSON.parse(localStorage.getItem("Pessoas")) || [];

  constructor() {}

  salvar(pessoa: Q_Pessoa) {
    this.getListarPessoa().push(
      new Pessoa(pessoa.nome, pessoa.sexo, pessoa.idade, pessoa.cidade)
    );
    this.isSalvar();
  }

  getListarPessoa = (): Array<object | any> => this.lista_pessoas;

  isSalvar = async () =>
    localStorage.setItem(
      "Pessoas",
      JSON.stringify(await this.getListarPessoa())
    );
}
interface Q_Pessoa {
  nome: string;
  sexo: string;
  idade: number;
  cidade: string;
}
