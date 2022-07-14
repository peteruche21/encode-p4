import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployNFTContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  log("deploying NFT Contract");
  const receipt = await deploy("EncodeNFT", {
    from: deployer,
    args: [],
    log: true,
  });
  log("deployed NFT contract at " + receipt.address);
};
export default deployNFTContract;
deployNFTContract.tags = ["all", "EncodeNFT"];
