export class Pessoa {
  nome: string = null;
  sexo: string = null;
  idade: number = null;
  cidade: string = null;

  constructor(nome: string, sexo: string, idade: number, cidade: string) {
    this.nome = nome;
    this.sexo = sexo;
    this.idade = idade;
    this.cidade = cidade;
  }
}
