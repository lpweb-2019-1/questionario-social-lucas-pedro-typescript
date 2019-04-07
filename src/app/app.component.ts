import { Component } from "@angular/core";
import { Pessoa } from "./pessoa/pessoa";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  nome: string = null;
  sexo: string = null;
  idade: number = null;
  cidade: string = null;

  tela: string = "home";

  protected media_idade_m: number = 0;
  protected media_idade_h: number = 0;

  private porcento_homem_palmas: number = 0;
  private porcento_homem_paraiso: number = 0;
  private porcento_homem_porto: number = 0;

  questionario_social: Array<object | any> =
    JSON.parse(localStorage.getItem("Pessoas")) || [];

  constructor() {
    this.mediaIdadeHomemMulher();
  }

  cadastrar = (form: any): void => {
    const pessoa = {
      nome: this.nome,
      sexo: this.sexo,
      idade: this.idade,
      cidade: this.cidade
    };
    this.questionario_social.push(pessoa);
    this.isSalvar();
    this.mediaIdadeHomemMulher();
    form.reset();
  };

  apresentarTela = (tela: string): string => (this.tela = tela);

  isSalvar = async () =>
    localStorage.setItem(
      "Pessoas",
      JSON.stringify(await this.getListarPessoa())
    );

  getListarPessoa = (): Array<object | any> => this.questionario_social;

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

    for (let pessoa of this.getListarPessoa()) {
      if (pessoa.sexo === "masculino" || pessoa.sexo === "Masculino") {
        soma_idade_h += pessoa.idade;
        qnt_h++;
        switch (pessoa.cidade) {
          case "Palmas": {
            qnt_homem_palmas++;
            break;
          }
          case "Paraíso": {
            qnt_homem_paraiso++;
            break;
          }
          case "Porto Nacional": {
            qnt_homem_porto++;
            break;
          }
        }
      } else if (pessoa.sexo == "feminino" || pessoa.sexo === "Feminino") {
        qnt_m++;
        soma_idade_m += pessoa.idade;
        switch (pessoa.cidade) {
          case "Palmas": {
            qnt_mulher_palmas++;
            break;
          }
          case "Paraíso": {
            qnt_mulher_paraiso++;
            break;
          }
          case "Porto Nacional": {
            qnt_mulher_porto++;
            break;
          }
        }
      }
    }

    this.setMediaIdadeHomem(Math.round(soma_idade_h / qnt_h));
    this.setMediaIdadeMulher(Math.round(soma_idade_m / qnt_m));
    // soma_idade_h.toFixed(1) || paserFloat(x)

    this.setPorcetagemHomemPalmas(
      (qnt_homem_palmas * (qnt_homem_palmas + qnt_mulher_palmas)) / 100
    );

    this.setPorcetagemHomemPorto(
      (qnt_homem_porto * (qnt_homem_porto + qnt_mulher_porto)) / 100
    );

    this.setPorcetagemHomemParaiso(
      (qnt_homem_paraiso * (qnt_homem_paraiso + qnt_mulher_paraiso)) / 100
    );
  };

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
}
