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
    /**
     * @description Caso a lista de pessoas esteja vazia retorna null
     */
    if (!this.getListaPessoas().length) return null;

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

  pessoaMaisNova = (): string => {
    /**
     * @description Caso a lista de pessoas esteja vazia retorna null
     */
    if (!this.getListaPessoas().length) return null;

    let menorIdade = 999;
    let pessoaMaisNova: string;
    for (let i = 0; i < this.getListaPessoas().length; i++) {
      if (this.getListaPessoas()[i].idade < menorIdade) {
        menorIdade = this.getListaPessoas()[i].idade;
        pessoaMaisNova = this.getListaPessoas()[i].nome;
      }
    }
    return pessoaMaisNova;
  };

  mediaIdadeHomemMulher = (): object | {} | null => {
    /**
     * @description Caso a lista de pessoas esteja vazia retorna null
     */
    if (!this.getListaPessoas().length) return null;

    let qntMulher = 0;
    let somaIdadeMulher = 0;
    let mediaIdadeMulher;

    let qntHomem = 0;
    let somaIdadeHomem = 0;
    let mediaIdadeHomem;

    for (let i = 0; i < this.getListaPessoas().length; i++) {
      if (this.getListaPessoas()[i].sexo === "Feminino") {
        qntMulher++;
        somaIdadeMulher += this.getListaPessoas()[i].idade;
      } else if (this.getListaPessoas()[i].sexo === "Masculino") {
        qntHomem++;
        somaIdadeHomem += this.getListaPessoas()[i].idade;
      }
    }
    /**
     * @description Calculo das médias de idade de Homens e Mulheres.
     */
    mediaIdadeHomem = Math.round(somaIdadeHomem / qntHomem).toFixed(1);
    mediaIdadeMulher = Math.round(somaIdadeMulher / qntMulher).toFixed(1);

    const mediaIdade = {
      mediaIdadeHomem,
      mediaIdadeMulher
    };
    return mediaIdade;
  };

  mediaIdadePessoaCidade = (): object | null => {
    /**
     * @description Caso a lista de pessoas esteja vazia retorna null
     */
    if (!this.getListaPessoas().length) return null;

    let qntPessoaPalmas: number = 0;
    let qntPessoaParaiso: number = 0;
    let qntPessoaPorto: number = 0;

    let somaIdadePalmas: number = 0;
    let somaIdadeParaiso: number = 0;
    let somaIdadePorto: number = 0;

    let mediaIdadePalmas: number = 0;
    let mediaIdadePorto: number = 0;
    let mediaIdadeParaiso: number = 0;

    for (let i = 0; i < this.getListaPessoas().length; i++) {
      switch (this.getListaPessoas()[i].cidade) {
        case "Palmas": {
          qntPessoaPalmas++;
          somaIdadePalmas += this.getListaPessoas()[i].idade;
          break;
        }
        case "Paraíso": {
          qntPessoaParaiso++;
          somaIdadeParaiso += this.getListaPessoas()[i].idade;
          break;
        }
        case "Porto Nacional": {
          qntPessoaPorto++;
          somaIdadePorto += this.getListaPessoas()[i].idade;
          break;
        }
      }
    }

    mediaIdadePalmas = Math.round(somaIdadePalmas / qntPessoaPalmas);
    mediaIdadeParaiso = Math.round(somaIdadeParaiso / qntPessoaParaiso);
    mediaIdadePorto = Math.round(somaIdadePorto / qntPessoaPorto);

    const media = {
      mediaIdadePalmas,
      mediaIdadeParaiso,
      mediaIdadePorto
    };

    return media;
  };
}
interface DadosPessoa {
  nome: string;
  sexo: string;
  idade: number;
  cidade: string;
}
