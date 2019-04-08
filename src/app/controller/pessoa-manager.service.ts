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
  protected media_idade_m: number = 0;
  protected media_idade_h: number = 0;

  private porcento_homem_palmas: number = 0;
  private porcento_homem_paraiso: number = 0;
  private porcento_homem_porto: number = 0;

  private pessoa_mais_velha: string;
  private pessoa_mais_nova: string;

  private idade_media_palmas: number = 0;
  private idade_media_paraiso: number = 0;
  private idade_media_porto: number = 0;

  lista_pessoas: Array<object | any> =
    JSON.parse(localStorage.getItem("Pessoas")) || [];

  constructor() {
    this.mediaIdadeHomemMulher();
    this.pessoaMaisVelhaNova();
  }

  salvar(pessoa: Q_Pessoa) {
    this.getListarPessoa().push(
      new Pessoa(pessoa.nome, pessoa.sexo, pessoa.idade, pessoa.cidade)
    );
    this.isSalvar();
  }

  getListarPessoa = (): Array<Pessoa> => this.lista_pessoas;

  isSalvar = async () =>
    localStorage.setItem(
      "Pessoas",
      JSON.stringify(await this.getListarPessoa())
    );

  mediaIdadeHomemMulher = (): void => {
    let soma_idade_m = 0;
    let soma_idade_h = 0;

    let qnt_m = 0;
    let qnt_h = 0;

    let qnt_mulher_palmas = 0;
    let qnt_mulher_paraiso = 0;
    let qnt_mulher_porto = 0;

    let qnt_homem_palmas = 0;
    let qnt_homem_paraiso = 0;
    let qnt_homem_porto = 0;

    let idade_palmas = 0;
    let idade_paraiso = 0;
    let idade_porto = 0;

    for (let pessoa of this.getListarPessoa()) {
      if (pessoa.sexo === "masculino" || pessoa.sexo === "Masculino") {
        soma_idade_h += pessoa.idade;
        qnt_h++;
        switch (pessoa.cidade) {
          case "Palmas": {
            idade_palmas += pessoa.idade;
            qnt_homem_palmas++;
            break;
          }
          case "Paraíso": {
            idade_paraiso += pessoa.idade;
            qnt_homem_paraiso++;
            break;
          }
          case "Porto Nacional": {
            idade_porto += pessoa.idade;
            qnt_homem_porto++;
            break;
          }
        }
      } else if (pessoa.sexo == "feminino" || pessoa.sexo === "Feminino") {
        qnt_m++;
        soma_idade_m += pessoa.idade;
        switch (pessoa.cidade) {
          case "Palmas": {
            idade_palmas += pessoa.idade;
            qnt_mulher_palmas++;
            break;
          }
          case "Paraíso": {
            idade_paraiso += pessoa.idade;
            qnt_mulher_paraiso++;
            break;
          }
          case "Porto Nacional": {
            idade_porto += pessoa.idade;
            qnt_mulher_porto++;
            break;
          }
        }
      }
    }

    this.setIdadeMediaPalmas(
      idade_palmas / (qnt_homem_palmas + qnt_mulher_palmas)
    );

    this.setIdadeMediaPorto(idade_porto / (qnt_homem_porto + qnt_mulher_porto));
    this.setIdadeMediaParaiso(
      idade_paraiso / (qnt_homem_paraiso + qnt_mulher_paraiso)
    );

    this.setMediaIdadeHomem(Math.round(soma_idade_h / qnt_h)).toFixed(1);
    this.setMediaIdadeMulher(Math.round(soma_idade_m / qnt_m)).toFixed(1);
    // soma_idade_h.toFixed(1) || paserFloat(x)

    this.setPorcetagemHomemPalmas(
      (qnt_homem_palmas * 100) / (qnt_homem_palmas + qnt_mulher_palmas)
    ).toFixed();

    this.setPorcetagemHomemPorto(
      (qnt_homem_porto * 100) / (qnt_homem_porto + qnt_mulher_porto)
    ).toFixed(1);

    this.setPorcetagemHomemParaiso(
      (qnt_homem_paraiso * 100) / (qnt_homem_paraiso + qnt_mulher_paraiso)
    ).toFixed(1);
  };

  pessoaMaisVelhaNova(): void {
    let velho: number = 0;
    let novo: number = 999;
    this.getListarPessoa().filter(pessoa => {
      if (pessoa.idade > velho) {
        velho = pessoa.idade;
        this.setPessoaMaisVelha(pessoa.nome);
      } else if (pessoa.idade < novo) {
        novo = pessoa.idade;
        this.setPessoaMaisNova(pessoa.nome);
      }
    });
  }

  /**
   *
   *
   * @tutorial MetodosDeAcesso()
   * @method getMediaIdadeMulher() retorna média da idade das Mulheres.
   * @method getMediaIdadeHomem() retorna média da idade das Homens.
   * @method getPorcetagemHomemPalmas() retorna porcentagem de Homens em Palmas.
   * @method getPorcetagemHomemPorto() retorna porcentagem de Homens em Porto Nacional.
   * @method getPorcetagemHomemParaiso() retorna porcentagem de Homens em Paraíso.
   */

  public getMediaIdadeMulher = () => this.media_idade_m;
  public setMediaIdadeMulher = (media: number) => (this.media_idade_m = media);

  public getMediaIdadeHomem = () => this.media_idade_h;
  public setMediaIdadeHomem = (media: number) => (this.media_idade_h = media);

  public getPorcetagemHomemPalmas = (): number => this.porcento_homem_palmas;
  public setPorcetagemHomemPalmas = (media: number): number =>
    (this.porcento_homem_palmas = media);

  public getPorcetagemHomemPorto = (): number => this.porcento_homem_porto;
  public setPorcetagemHomemPorto = (params: number): number =>
    (this.porcento_homem_porto = params);

  public getPorcetagemHomemParaiso = (): number => this.porcento_homem_paraiso;
  public setPorcetagemHomemParaiso = (params: number): number =>
    (this.porcento_homem_paraiso = params);

  /**
   * @method PessoasMaisNovaVelha() Método de acesso que seta ou busca o nome da pessoa o mais novo e mais velho.
   */

  public getPessoaMaisNova = (): string => this.pessoa_mais_nova;
  public setPessoaMaisNova = (params: string): string =>
    (this.pessoa_mais_nova = params);

  public getPessoaMaisVelha = (): string => this.pessoa_mais_velha;
  public setPessoaMaisVelha = (params: string): string =>
    (this.pessoa_mais_velha = params);

  public getIdadeMediaPalmas = (): number => this.idade_media_palmas;
  public setIdadeMediaPalmas = (params: number): number =>
    (this.idade_media_palmas = params);

  public getIdadeMediaPorto = (): number => this.idade_media_porto;
  public setIdadeMediaPorto = (params: number): number =>
    (this.idade_media_porto = params);

  public getIdadeMediaParaiso = (): number => this.idade_media_paraiso;
  public setIdadeMediaParaiso = (params: number): number =>
    (this.idade_media_paraiso = params);
}

/**
 * @interface Q_Pessoa{} os tipos do *** paramentro ***
 */
interface Q_Pessoa {
  nome: string;
  sexo: string;
  idade: number;
  cidade: string;
}
