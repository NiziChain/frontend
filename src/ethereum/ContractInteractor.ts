import { BigNumber, ethers, Signer } from "ethers";
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

	public async checkRight(childId: number|string|BigNumber) {
		return await this.nizi.checkRight(childId);
	}

	public async getRoyalty(contentId: number|string|BigNumber) {
		let royalty = (await this.nizi.functions.getRoyalty(contentId))[0];
		return royalty;
	}

	public async getRoyaltyAsString(contentId: number|string|BigNumber) {
		let royalty = (await this.nizi.functions.getRoyalty(contentId))[0];
		return royalty.toString();
	}

	public async getAuthor(contentId: number|string|BigNumber) {
		return (await this.nizi.getAuthor(1));
	}

	public async getContentsList(address: string) {
		return await this.nizi.getContentsList(address);
	}

	// あるauthorの作ったコンテンツのリストを全て返す
	public async getContentsListAsStrings(address: string) {
		return (await this.nizi.getContentsList(address)).map((x)=>x.toString());
	}

	public async getParent(contentId: number|string|BigNumber) {
		return await this.nizi.getParent(contentId);
	}

	public async getParentAsString(contentId: number|string|BigNumber) {
		return (await this.nizi.getParent(contentId)).toString();
	}

	public async registerOriginal(royalty: string|number|BigNumber) {
		return await this.nizi.registerOriginal(royalty);
	}

	public async getNextContentId() {
		return (await this.nizi.getNumberOfContents()).add(1);
	}

	public async registerSecondary(parentId: string|number|BigNumber) {
		let royalty = await this.getRoyalty(parentId);
		return await this.nizi.registerSecondary(parentId, {value: royalty.toString()});
	}

	public async setRoyalty(contentId: number|string|BigNumber, royalty: number|string|BigNumber) {
		return await this.nizi.setRoyalty(contentId, royalty);
	}
}

export default ContractInteractor;