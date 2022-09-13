import connectWallet from "./connectWallet"
import ContractInteractor from "./ContractInteractor"

export const getContractInteractor = async () => {
  let signer = await connectWallet()
  if (signer === false) {
    return
  }
  if (signer === null) {
    return
  }
  let contractInteractor = new ContractInteractor(signer)
  return contractInteractor
}