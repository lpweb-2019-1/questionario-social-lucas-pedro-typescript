import { Injectable } from "@angular/core";
import { Pessoa } from "../pessoa/pessoa";

/**
 *
 * @author ***< Lucas Pedro Lopes >***
 * @tutorial Pessoa{} as instância de Pessoa são criada aqui no service PessoaManageService.
 * @variation lista_pessoas ***<Pessoa>*** A lista de pessoas armazena instâncias da class Pessoa{}.
 * @description **Controlle** Toda lógica do app.componente.ts é de responsábilidade de PessoaManage{}.
 * @description *private* Todos os atributos de private só podem ser acessados por meio de seus métodos de acesso get/set.
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

  private porcento_mulher_palmas: number = 0;
  private porcento_mulher_paraiso: number = 0;
  private porcento_mulher_porto: number = 0;

  private pessoa_mais_velha: string;
  private pessoa_mais_nova: string;

  private idade_media_palmas: number = 0;
  private idade_media_paraiso: number = 0;
  private idade_media_porto: number = 0;

  lista_cidade: Array<string> = ["Palmas", "Paraíso", "Porto Nacional"];

  lista_pessoas: Array<Pessoa> =
    JSON.parse(localStorage.getItem("Pessoas")) || [];

  constructor() {
    this.mediaIdadeHomemMulher();
    this.pessoaMaisVelhaNova();
  }

  salvar = (pessoa: DadosPessoa): void => {
    this.getListarPessoa().push(
      new Pessoa(pessoa.nome, pessoa.sexo, pessoa.idade, pessoa.cidade)
    );
    this.isSalvar();
    console.log(this.getListarCidade());
  };

  getListarPessoa = (): Array<Pessoa> => this.lista_pessoas;
  getListarCidade = (): Array<String> => this.lista_cidade;

  isSalvar = async () =>
    localStorage.setItem(
      "Pessoas",
      JSON.stringify(await this.getListarPessoa())
    );

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

    /**
     *
     *
     * @description *Média de idade das cidades*
     */
    this.setIdadeMediaPalmas(
      Math.round(idade_palmas / (qnt_homem_palmas + qnt_mulher_palmas))
    ).toFixed(1);

    this.setIdadeMediaPorto(
      Math.round(idade_porto / (qnt_homem_porto + qnt_mulher_porto))
    ).toFixed(1);
    this.setIdadeMediaParaiso(
      Math.round(idade_paraiso / (qnt_homem_paraiso + qnt_mulher_paraiso))
    ).toFixed(1);

    /**
     *
     *
     * @description *Média de idade de Homens e Mulheres*
     */

    this.setMediaIdadeHomem(Math.round(soma_idade_h / qnt_h)).toFixed(1);
    this.setMediaIdadeMulher(Math.round(soma_idade_m / qnt_m)).toFixed(1);
    // soma_idade_h.toFixed(1) || paserFloat(x)

    /**
     *
     *
     * @description *Porcentagem Homens e Melheres por cidades*
     */
    this.setPorcetagemHomemPalmas(
      Math.round(
        (qnt_homem_palmas * 100) / (qnt_homem_palmas + qnt_mulher_palmas)
      )
    ).toFixed(1);

    this.setPorcetagemHomemPorto(
      Math.round((qnt_homem_porto * 100) / (qnt_homem_porto + qnt_mulher_porto))
    ).toFixed(1);

    this.setPorcetagemHomemParaiso(
      Math.round(
        (qnt_homem_paraiso * 100) / (qnt_homem_paraiso + qnt_mulher_paraiso)
      )
    ).toFixed(1);

    this.setPorcetagemMulherPalmas(
      Math.round(
        (qnt_mulher_palmas * 100) / (qnt_homem_palmas + qnt_mulher_palmas)
      )
    ).toFixed(1);

    this.setPorcetagemMulherParaiso(
      Math.round(
        (qnt_mulher_paraiso * 100) / (qnt_homem_paraiso + qnt_mulher_paraiso)
      )
    ).toFixed(1);

    this.setPorcetagemMulherPorto(
      Math.round(
        (qnt_mulher_porto * 100) / (qnt_homem_porto + qnt_mulher_porto)
      )
    ).toFixed(1);
  };

  /**
   *
   *
   * @tutorial MetodosDeAcesso()
   * @method getMediaIdadeMulher() retorna média da idade das Mulheres.
   * @method getMediaIdadeHomem() retorna média da idade das Homens.
   * @method getPorcetagemHomemPalmas() retorna porcentagem de Homens em Palmas.
   * @method getPorcetagemHomemPorto() retorna porcentagem de Homens em Porto Nacional.
   * @method getPorcetagemHomemParaiso() retorna porcentagem de Homens em Paraíso.
   * @method getPessoaMaisNova() retorna a pessoa com a *menor idade*.
   * @method getPessoaMaisVelha() retorna a pessoa com a *maior idade*.
   * @method getIdadeMediaPalmas() retorna a média de idade das pessoas em *Palmas*.
   * @method getIdadeMediaParaiso() retorna a média de idade das pessoas em *Paraíso*.
   * @method getIdadeMediaPorto() retorna a média de idade das pessoas em *Porto Nacional*.
   */

  public getMediaIdadeMulher = () => this.media_idade_m;
  public setMediaIdadeMulher = (media: number) => (this.media_idade_m = media);

  public getMediaIdadeHomem = () => this.media_idade_h;
  public setMediaIdadeHomem = (media: number) => (this.media_idade_h = media);

  /**
   *
   * @description *porcentagem de homens e mulheres* Métodos de acesso.
   */

  public getPorcetagemHomemPalmas = (): number => this.porcento_homem_palmas;
  public setPorcetagemHomemPalmas = (media: number): number =>
    (this.porcento_homem_palmas = media);

  public getPorcetagemHomemPorto = (): number => this.porcento_homem_porto;
  public setPorcetagemHomemPorto = (params: number): number =>
    (this.porcento_homem_porto = params);

  public getPorcetagemHomemParaiso = (): number => this.porcento_homem_paraiso;
  public setPorcetagemHomemParaiso = (params: number): number =>
    (this.porcento_homem_paraiso = params);

  public getPorcetagemMulherPalmas = (): number => this.porcento_mulher_palmas;
  public setPorcetagemMulherPalmas = (params: number): number =>
    (this.porcento_mulher_palmas = params);

  public getPorcetagemMulherParaiso = (): number =>
    this.porcento_mulher_paraiso;
  public setPorcetagemMulherParaiso = (params: number): number =>
    (this.porcento_mulher_paraiso = params);

  public getPorcetagemMulherPorto = (): number => this.porcento_mulher_porto;
  public setPorcetagemMulherPorto = (params: number): number =>
    (this.porcento_mulher_porto = params);

  /**
   *
   *
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
 *
 *
 * @interface DadosPessoa{} os tipos do *** paramentro ***
 */
interface DadosPessoa {
  nome: string;
  sexo: string;
  idade: number;
  cidade: string;
}
