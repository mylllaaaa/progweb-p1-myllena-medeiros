class Conta {
    #titular: string;
    #saldo: number;

    constructor(titular: string, saldo: number) {
        this.#titular = titular;
        this.#saldo = saldo;
    }

    getTitular() {
        return this.#titular;
    }

    getSaldo() {
        return this.#saldo;
    } 
    
    setTitular(titular: string) {
        this.#titular = titular;
    }

    setSaldo(saldo: number) {
        this.#saldo = saldo;
    }

    saldo() {
        console.log("Olá Sr./Sra. " + this.getTitular() + ", seu saldo é: " + this.getSaldo());
    }

}

const conta1 = new Conta("Myllena Medeiros", 1000);
conta1.saldo();