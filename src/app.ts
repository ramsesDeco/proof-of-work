import * as hash from 'js-sha256';
import Data from './input-data';

export class App {

    proofOfWorkHash: string;
    nonce: number;

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
    }

    loop() {
        this.proofOfWorkHash = this.hash(Data.message);
        this.nonce++;
        while (!this.checkZerosAtLeft(this.proofOfWorkHash, Data.difficulty)) {
            this.proofOfWorkHash = this.hash(this.proofOfWorkHash);
            this.nonce++;
        }
    }

    hash(message: string): string {
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