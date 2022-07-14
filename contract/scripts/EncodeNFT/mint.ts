import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { EncodeNFT } from "../../typechain-types";

async function main() {
  const signer: SignerWithAddress[] = await ethers.getSigners();
  const nftContract: EncodeNFT = await ethers.getContract(
    "EncodeNFT",
    signer[0]
  );
  for (let i = 0; i < 10; i++) {
    const tx = await nftContract.safeMint(signer[0].address);
    await tx.wait();
    console.log(`minted nft #${i}`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
