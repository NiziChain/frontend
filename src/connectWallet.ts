import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Signer } from "ethers";

export default {
	async connectWallet (): Promise<Signer|false|null> {
		const provider = await detectEthereumProvider();
		if(provider) {
			// MetaMask検出時の処理
			let ethereum = window.ethereum!;

			// @ts-ignore ごめんね。これをつけないと怒られちゃうの。
			const currentNetworkId = ethereum.chainId;

			const targetNetworkId = '0x5' // Goerli Testnet: 0x5

			// 異なるネットワークの場合は切り替えを提案する
			if(currentNetworkId != targetNetworkId) {
				// @ts-ignore ごめんね。これをつけないと怒られちゃうの2。
				await ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{chainId: targetNetworkId}],
				})
			}

			const provider = new ethers.providers.Web3Provider(
				ethereum
			)

			return provider.getSigner();
		} else {
			// TODO: MetaMaskが検出されない時の処理があるとよき。優先度低め
			console.log("Please install MetaMask");
			return false;
		}
		return null;
	},
}