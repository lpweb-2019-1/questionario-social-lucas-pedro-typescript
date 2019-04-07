import { Component } from "@angular/core";

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

  questionario_social: Array<object> =
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
    form.reset();
  };

  apresentarTela = (tela: string): string => (this.tela = tela);
  isSalvar = async () =>
    localStorage.setItem(
      "Pessoas",
      JSON.stringify(await this.questionario_social)
    );

  getListaQuestionario = (): Array<object> => this.questionario_social;

  mediaIdadeHomemMulher() {
    let soma_idade_m = 0;
    let soma_idade_h = 0;

    let qnt_m = 0;
    let qnt_h = 0;

    for (let pessoa of this.questionario_social) {
      if (pessoa.sexo === "masculino" || pessoa.sexo === "Masculino") {
        soma_idade_h += pessoa.idade;
        qnt_h++;
      } else if (pessoa.sexo == "feminino" || pessoa.sexo === "Feminino") {
        qnt_m++;
        soma_idade_m += pessoa.idade;
      }
    }

    this.setMediaIdadeH(Math.round(soma_idade_h / qnt_h));
    this.setMediaIdadeM(Math.round(soma_idade_m / qnt_m));
    // soma_idade_h.toFixed(1) || paserFloat(x)
  }

  public getMediaIdadeM = () => this.media_idade_m;
  public setMediaIdadeM = (media: number) => (this.media_idade_m = media);

  public getMediaIdadeH = () => this.media_idade_h;
  public setMediaIdadeH = (media: number) => (this.media_idade_h = media);
}
