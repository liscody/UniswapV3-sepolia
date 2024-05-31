// This is a script for deployment and automatically verification of all the contracts (`contracts/`).

import hre from "hardhat";
const ethers = hre.ethers;

import type { UniswapPoolSepolia } from "../../typechain-types";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy token 0
    const UniswapPoolSepolia = (await ethers.getContractFactory("UniswapPoolSepolia")).connect(deployer);
    const instance: UniswapPoolSepolia = await UniswapPoolSepolia.deploy();
    await instance.deployed();

    console.log("Token deployed to : ", instance.address);
    console.log("");

    // Verification of the deployed contract.
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("Sleeping before verification...");
        await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 seconds.

        await hre.run("verify:verify", { address: instance.address, constructorArguments: [] });
    }
    return instance;
}

// This pattern is recommended to be able to use async/await everywhere and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// New deployment
// npx hardhat run scripts/deployment/deployUniswapPoolSepolia.ts --network sepolia
// addr = 0x0345f396705808CC580Cf9A2D3EcB59B23bcaA28