import { Conta } from "./Conta.ts";

export class ContaCorrente extends Conta {
    readonly #limite: number;

    constructor(titular: string, saldo: number) {
        super(titular, saldo);
        this.#limite = 700; 
    }

    getLimite() {
        return this.#limite;
    }

    saldo(){
        console.log("Olá Sr./Sra. " + this.getTitular() + ", seu saldo é: " + this.getSaldo() + " e seu limite é: " + this.#limite);
    }
}

const contaCorrente1 = new ContaCorrente("Myllena Medeiros", 850);
contaCorrente1.saldo();