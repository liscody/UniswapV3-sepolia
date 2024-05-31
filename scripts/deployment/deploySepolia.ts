// This is a script for deployment and automatically verification of all the contracts (`contracts/`).

import hre from "hardhat";
const ethers = hre.ethers;

import type { MyToken } from "../../typechain-types";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy token 0
    const MyToken = (await ethers.getContractFactory("MyToken")).connect(deployer);
    const token: MyToken = await MyToken.deploy("MyToken-2", "MT2");
    await token.deployed();

    console.log("Token deployed to : ", token.address);
    console.log("");

    // Verification of the deployed contract.
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("Sleeping before verification...");
        await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 seconds.

        await hre.run("verify:verify", { address: token.address, constructorArguments: ["MyToken-2", "MT2"] });
    }
    return token;
}

// This pattern is recommended to be able to use async/await everywhere and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// New deployment
// npx hardhat run scripts/deployment/deploySepolia.ts --network sepolia
// 
// addr 0 = 0xF8A0d2451089cCA71d9F8B169adD969154da4Cf7
// addr 1 = 0x1157D683F9bEB496CcaD202b5036F0B051842cAe
//
// Successfully verified contract MyToken on Etherscan.
// https://sepolia.etherscan.io/address/0xF8A0d2451089cCA71d9F8B169adD969154da4Cf7#code
// 
// Steps for add liquidity
// 1. Deploy the token 1
