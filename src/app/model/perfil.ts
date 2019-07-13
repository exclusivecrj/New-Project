export class Perfil{

    id: string;
    nome: string;
    telefone: string;
    email: string;
    endereco: string;
    cep: string;
    bairro: string;
    complemento: string;
    cpf: string;
    numero: string;
    
    constructor(){
    }

    // Dados do firebase
    setDados(obj : any){
        this.nome = obj.nome;
        this.telefone = obj.telefone;
        this.email = obj.email;
        this.endereco = obj.endereco;
        this.cep = obj.cep;
        this.bairro = obj.bairro;
        this.complemento = obj.complemento;
        this.cpf = obj.cpf;
        this.numero = obj.numero;
    }
}
