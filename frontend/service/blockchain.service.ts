import { providers, utils, getDefaultProvider, Wallet, Contract } from "ethers";
let TokenContractInterface = require("../../contract/deployments/goerli/EncodeNFT.json");

class BlockchainService {
  provider: providers.BaseProvider;
  userWallet: Wallet;
  tokenContractInstance: Contract;
  tokenContractAddress: string;

  constructor() {
    this.tokenContractAddress =
      process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS ||
      TokenContractInterface.address;
    this.provider = this.getProvider();
    this.userWallet = Wallet.createRandom().connect(this.provider);
    this.tokenContractInstance = new Contract(
      this.tokenContractAddress,
      TokenContractInterface.abi
    ).connect(this.userWallet);
  }

  getProvider() {
    return getDefaultProvider(process.env.NEXT_PUBLIC_NETWORK);
  }

  async address() {
    const address = this.userWallet.address;
    return address;
  }

  async etherBalance() {
    const etherBalanceBN = await this.provider.getBalance(
      this.userWallet.address
    );
    const etherBalance = utils.formatEther(etherBalanceBN) + " ETH";
    return etherBalance;
  }

  async networkName() {
    const networkName = process.env.NEXT_PUBLIC_NETWORK;
    return networkName;
  }

  async number() {
    const number = await this.provider.getBlockNumber();
    return number.toFixed(0);
  }

  async tokenAddress() {
    const tokenAddress = this.tokenContractAddress;
    return tokenAddress;
  }

  async tokenName() {
    const tokenName = await this.tokenContractInstance.name();
    return tokenName;
  }

  async symbol() {
    const symbol = await this.tokenContractInstance.symbol();
    return symbol;
  }

  async supply() {
    const supplyBN = await this.tokenContractInstance.totalSupply();
    const supply = utils.formatEther(supplyBN);
    return supply + " Tokens";
  }

  async tokenBalance() {
    const tokenBalanceBN = await this.tokenContractInstance.balanceOf(
      this.userWallet.address
    );
    const tokenBalance = utils.formatEther(tokenBalanceBN);
    return tokenBalance + " Tokens";
  }

  async signTokenRequest(amount: number) {
    const signatureObject = {
      address: this.userWallet.address,
      amount: amount,
    };
    const signatureMessage = JSON.stringify(signatureObject);
    return await this.userWallet.signMessage(signatureMessage);
  }
}

export default new BlockchainService();
