import { Conta } from "./Conta.ts";

export class ContaPoupanca extends Conta {
    readonly #taxaRendimento: number;

    constructor(titular: string, saldo: number) {
        super(titular, saldo);
        this.#taxaRendimento = 0.05; 
    }

    getTaxaRendimento() {
        return (this.#taxaRendimento * 100);
    }

    saldo(){
        console.log("Olá Sr./Sra. " + this.getTitular() + ", seu saldo é: " + this.getSaldo() + " e sua taxa de rendimento é: " + this.getTaxaRendimento() + "%");
    }
}

const contaPoupanca1 = new ContaPoupanca("Myllena Medeiros", 850);
contaPoupanca1.saldo();