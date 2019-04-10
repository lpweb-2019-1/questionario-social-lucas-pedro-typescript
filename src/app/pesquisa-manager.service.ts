import { Injectable } from "@angular/core";
import { Pessoa } from "./pessoa/pessoa";

@Injectable({
  providedIn: "root"
})
export class PesquisaManagerService {
  private listaCidades: Array<string> = ["Palmas", "Paraíso", "Porto Nacional"];
  private listaPessoas: Array<Pessoa> =
    JSON.parse(localStorage.getItem("Pessoas")) || [];

  constructor() {}

  salvar = (pessoa: DadosPessoa) => {
    this.getListaPessoas().push(
      new Pessoa(pessoa.nome, pessoa.sexo, pessoa.idade, pessoa.cidade)
    );
    this.salvarLocalStorage();
  };

  getListaPessoas = (): Array<Pessoa> => this.listaPessoas;
  getListaCidades = (): Array<string> => this.listaCidades;
  salvarLocalStorage = async () => {
    localStorage.setItem(
      "Pessoas",
      await JSON.stringify(this.getListaPessoas())
    );
  };

  pessoaMaisVelha = (): string => {
    let maiorIdade = 0;
    let pessoaMaisVelha: string;
    for (let i = 0; i < this.getListaPessoas().length; i++) {
      if (this.getListaPessoas()[i].idade > maiorIdade) {
        maiorIdade = this.getListaPessoas()[i].idade;
        pessoaMaisVelha = this.getListaPessoas()[i].nome;
      }
    }
    return pessoaMaisVelha;
  };
}
interface DadosPessoa {
  nome: string;
  sexo: string;
  idade: number;
  cidade: string;
}
