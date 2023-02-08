import * as ethers from "ethers";
import { getsign } from './globals';
import { getLocal } from "../helpers/local";
export class Wallet extends ethers.Signer {
    public static loadWallet(index: number): Wallet {
        const localdata = getLocal('__fakewallet__') as string[];
        const account = localdata[index];
        switch (true) {
            case ethers.utils.isAddress(account):
                return new Wallet(account, undefined);
            default:
                throw new Error('account not exist');
        }
    }
    public readonly address: string;
    public readonly provider: ethers.providers.Provider;
    public readonly _signingKey: () => ethers.utils.SigningKey;
    public readonly _mnemonic: () => ethers.utils.Mnemonic;
    constructor(address: string, provider?: ethers.providers.Provider) {
        super()
        if (provider) { this.provider = provider; }
        if (ethers.utils.isAddress(address)) { this.address = ethers.utils.getAddress(address); }
    }
    public getAddress(): Promise<string> {
        return Promise.resolve(this.address);
    }
    public signMessage(message: string | ethers.ethers.utils.Bytes): Promise<string> {
        // TODO
        throw new Error("Method not implemented.");
        // return Promise.resolve("");
    }
    public signTransaction(transaction: ethers.ethers.utils.Deferrable<ethers.ethers.providers.TransactionRequest>): Promise<string> {
        // TODO
        const [state, setState]:any = getsign()
        console.log(state)
        setState({show:false, val:"signTransaction"});
        // throw new Error("Method not implemented.");
        return Promise.resolve("");
    }
    public connect(provider: ethers.ethers.providers.Provider): Wallet {
        return new Wallet(this.address, provider);
    }
    get mnemonic(): ethers.utils.Mnemonic {
        throw new Error("Method not implemented.");
    }
    get privateKey(): string {
        throw new Error("Method not implemented.");
    }
    get publicKey(): string {
        throw new Error("Method not implemented.");
    }
    public encrypt(password: ethers.utils.Bytes | string, options?: any, progressCallback?: ethers.utils.ProgressCallback): Promise<string> {
        throw new Error("Method not implemented.");
    }
}