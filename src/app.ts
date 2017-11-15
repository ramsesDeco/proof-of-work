import * as hash from 'js-sha256';
import Data from './input-data';

export class App {

    proofOfWorkHash: string;
    nonce: number;
    text: string;

    constructor() {
        this.init();
    }

    init() {
        this.nonce = 0;

        console.time('Finished after');

        this.loop();

        console.timeEnd('Finished after')
        console.log(`PoW Hash: ${this.proofOfWorkHash}`);
        console.log(`Nonce used: ${this.nonce}`);
        console.log(`text: ${this.text}`);
    }

    loop() {
        while (!this.checkZerosAtLeft(this.proofOfWorkHash, Data.difficulty)) {
            this.text = Data.message + this.nonce;
            this.proofOfWorkHash = this.hash(this.text);
            this.nonce++;
        }
        this.nonce--;
    }

    hash(message:string): string {
        return hash.sha256(message)
    }

    checkZerosAtLeft(message: string, difficulty: number): boolean {
        let zeros = String(message).substring(0, difficulty);
        let shouldBe = '';
        for (let i = 0; i < difficulty; i++) {
            shouldBe += '0';
        }

        return zeros == shouldBe;
    }
}