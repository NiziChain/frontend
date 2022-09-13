import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Signer } from "ethers";

const connectWallet = async(): Promise<Signer|false|null> => {
	const provider = await detectEthereumProvider();
	if (provider) {
		// MetaMask検出時の処理
		let ethereum = window.ethereum!;

		// @ts-ignore ごめんね。これをつけないと怒られちゃうの。
		const currentNetworkId = ethereum.chainId;

		const targetNetworkId = '0x5' // Goerli Testnet: 0x5

		// 異なるネットワークの場合は切り替えを提案する
		if (currentNetworkId != targetNetworkId) {
			// @ts-ignore ごめんね。これをつけないと怒られちゃうの2。
			await ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{chainId: targetNetworkId}],
			})
		}

		const provider = new ethers.providers.Web3Provider(
			ethereum
		)

		let _signer = await provider.getSigner();

		try {
			const _userAddress = await _signer?.getAddress();
			console.log("接続中のアドレス:", _userAddress);
		} catch (e) {
			alert("MetaMaskのロックを解除してください");
		}

		return _signer;
	} else {
		// TODO: MetaMaskが検出されない時の処理があるとよき。優先度低め
		alert("MetaMaskをインストールをしてください");
		return false;
	}
}

export default connectWallet;