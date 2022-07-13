import { Contract, ethers } from "ethers";
import { deployments } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain-types";

const PROPOSALS = ["proposal-1", "proposal-2", "proposal-3"];

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY as string);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("goerli");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  const ballotAddress = await (await deployments.get("Ballot")).address;
  const ballotInterface = await (await deployments.get("Ballot")).abi;

  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );

  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotInterface,
    signer
  ) as Ballot;

  console.log(`fetching winning proposals`);
  const tx = await ballotContract.winningProposal();
  console.log(`winner is #${tx} "${PROPOSALS[Number(tx)]}"`);
  console.log(`Completed.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
