import { ethers, Signer } from "ethers";
import abi from './abi.json';
import contractAddress from './contractAddress.json';
import { Nizi } from "@/ethereum/Nizi";

class ContractInteractor {
	signer: Signer;
	nizi: Nizi;

	constructor(signer: Signer) {
		this.signer = signer;
		this.nizi = new ethers.Contract(contractAddress, abi).connect(this.signer) as Nizi;
	}

	public async checkRight(childId: number) {
		return await this.nizi.checkRight(childId);
	}

	public async getRoyalty(contentId: number) {
		let royalty = (await this.nizi.functions.getRoyalty(contentId))[0];
		return royalty;
	}

	public async getAuthor(contentId: number) {
		return (await this.nizi.getAuthor(1));
	}

	public async getContentsList(address: string) {
		return await this.nizi.getContentsList(address);
	}

	public async getParent(contentId: number) {
		return await this.nizi.getParent(contentId);
	}

	// 大きな数を入れるとオーバーフローが怖いのでstringにしています。
	// BigNumberでもOKなのですが、stringの方が扱いやすそう？
	public async registerOriginal(royalty: string) {
		return await this.nizi.registerOriginal(royalty);
	}

	public async registerSecondary(parentId: number) {
		let royalty = await this.getRoyalty(parentId);
		return await this.nizi.registerSecondary(parentId, {value: royalty.toString()});
	}

	public async setRoyalty(contentId: number, royalty: string) {
		return await this.nizi.setRoyalty(contentId, royalty);
	}
}

export default ContractInteractor;