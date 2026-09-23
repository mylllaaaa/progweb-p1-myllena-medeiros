class Conta {
    #titular: string;
    #saldo: number;

    constructor(titular: string, saldo: number) {
        this.#titular = titular;
        this.#saldo = saldo;
    }

    getNome() {
        return this.#titular;
    }

    getSaldo() {
        return this.#saldo;
    } 
    
    setNome(titular: string) {
        this.#titular = titular;
    }

    setSaldo(saldo: number) {
        this.#saldo = saldo;
    }

    saldo() {
        console.log("Olá Sr./Sra. " + this.#titular + ", seu saldo é: " + this.#saldo);
    }

}

const conta1 = new Conta("Myllena Medeiros", 1000);
conta1.saldo();