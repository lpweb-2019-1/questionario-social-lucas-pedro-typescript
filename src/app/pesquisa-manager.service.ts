import { Injectable } from "@angular/core";
import { Pessoa } from "./pessoa/pessoa";

@Injectable({
  providedIn: "root"
})
export class PesquisaManagerService {
  private listaCidades: Array<string> = ["Palmas", "Paraíso", "Porto Nacional"];
  private listaPessoas: Array<Pessoa> =
    JSON.parse(localStorage.getItem("Pessoas")) || [];

  constructor() {
    this.pessoaMaisNova();
    this.pessoaMaisVelha();
    this.mediaIdadeHomemMulher();
    this.mediaIdadePessoaCidade();
    this.porcentagemHomemMulher();
  }

  /**
   * @method salvar(pessoa) salva uma instância de Pessoa() no Array listaPessoas e
   */
  salvar = (pessoa: DadosPessoa) => {
    this.getListaPessoas().push(
      new Pessoa(pessoa.nome, pessoa.sexo, pessoa.idade, pessoa.cidade)
    );
    this.pessoaMaisNova();
    this.pessoaMaisVelha();
    this.salvarLocalStorage();
    this.mediaIdadeHomemMulher();
    this.mediaIdadePessoaCidade();
    this.porcentagemHomemMulher();
  };

  /**
   * @method getListaPessoas() retorn a lista de pessoas cadastradas.
   */
  getListaPessoas = (): Array<Pessoa> => this.listaPessoas;

  /**
   * @method getListaCidades() return a lista de cidades
   */
  getListaCidades = (): Array<string> => this.listaCidades;

  /**
   * @method salvarLocalStorage() salva o array de lista de pessoas no localStorage()
   */
  salvarLocalStorage = async () => {
    localStorage.setItem(
      "Pessoas",
      await JSON.stringify(this.getListaPessoas())
    );
  };

  /**
   * @function pessoaMaisVelha() Retorna pessoa de idade mais avançada.
   */
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

  /**
   * @function pessoaMaisNova() Retorna a pessoa de menor idade.
   */
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

  /**
   * @function mediaIdadeHomemMulher() Retorna média de idade de homens e mulheres.
   */
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

  /**
   * @function mediaIdadePessoaCidade() Retorna a média da idade de Homens e Mulheres por cidade.
   */
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

  /**
   * @function porcentagemHomemMulher() retorna a porcetagem de homens e mulheres por cidade.
   */
  porcentagemHomemMulher = (): object | {} => {
    /**
     * @description Caso a lista de pessoas esteja vazia retorna null
     */
    if (!this.getListaPessoas().length) return null;

    let qntHomemPalmas: number = 0;
    let qntHomemParaiso: number = 0;
    let qntHomemPorto: number = 0;

    let qntMulherPalmas: number = 0;
    let qntMulherParaiso: number = 0;
    let qntMulherPorto: number = 0;

    for (let i = 0; i < this.getListaPessoas().length; i++) {
      if (
        this.getListaPessoas()[i].sexo === "Masculino" ||
        this.getListaPessoas()[i].sexo === "masculino"
      ) {
        switch (this.getListaPessoas()[i].cidade) {
          case "Palmas": {
            qntHomemPalmas++;
            break;
          }
          case "Paraíso": {
            qntHomemParaiso++;
            break;
          }
          case "Porto Nacional": {
            qntHomemPorto++;
            break;
          }
        }
      } else if (
        this.getListaPessoas()[i].sexo === "Feminino" ||
        this.getListaPessoas()[i].sexo === "feminino"
      ) {
        switch (this.getListaPessoas()[i].cidade) {
          case "Palmas": {
            qntMulherPalmas++;
            break;
          }
          case "Paraíso": {
            qntMulherParaiso++;
            break;
          }
          case "Porto Nacional": {
            qntMulherPorto++;
            break;
          }
        }
      }
    }

    /**
     * @description Cálculo da porcentagem de Homens por cidades.
     */
    const porcentoHomem = {
      palmas: Math.round(
        (qntHomemPalmas * 100) / (qntHomemPalmas + qntMulherPalmas)
      ),
      paraiso: Math.round(
        (qntHomemParaiso * 100) / (qntHomemParaiso + qntMulherParaiso)
      ),
      porto: Math.round(
        (qntHomemPorto * 100) / (qntHomemPorto + qntMulherPorto)
      )
    };

    /**
     * @description Cálculo da porcentagem de Mulheres por cidades.
     */
    const porcentoMulher = {
      palmas: Math.round(
        (qntMulherPalmas * 100) / (qntMulherPalmas + qntHomemPalmas)
      ),
      paraiso: Math.round(
        (qntMulherParaiso * 100) / (qntMulherParaiso + qntHomemParaiso)
      ),
      porto: Math.round(
        (qntMulherPorto * 100) / (qntMulherPorto + qntHomemPorto)
      )
    };

    /**
     * @return object com dois atributo.
     */
    return { porcentoHomem, porcentoMulher };
  };
}

/**
 * @interface DadosPessoa {} Defino uma interface de dados para cada pessoa.
 */
interface DadosPessoa {
  nome: string;
  sexo: string;
  idade: number;
  cidade: string;
}
