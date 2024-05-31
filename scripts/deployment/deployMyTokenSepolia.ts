// This is a script for deployment and automatically verification of all the contracts (`contracts/`).

import hre from "hardhat";
const ethers = hre.ethers;

import type { MyTokenSepolia } from "../../typechain-types";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const name = "MyToken-2";
    const symbol = "MT2";

    // Deploy token 0
    const MyTokenSepolia = (await ethers.getContractFactory("MyTokenSepolia")).connect(deployer);
    const instance: MyTokenSepolia = await MyTokenSepolia.deploy(name, symbol);
    await instance.deployed();

    console.log("Token deployed to : ", instance.address);
    console.log("");

    // Verification of the deployed contract.
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("Sleeping before verification...");
        await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 seconds.

        await hre.run("verify:verify", { address: instance.address, constructorArguments: [name, symbol] });
    }
    return instance;
}

// This pattern is recommended to be able to use async/await everywhere and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// New deployment
// npx hardhat run scripts/deployment/deployMyTokenSepolia.ts --network sepolia

// addr 0 = 0xCf2697aD632DE47427947bc357DeDbd5fBc1171D
// addr 1 = 0x8cf4B9805ED32E8C852985993F8199B45Bff6169

// verify
// npx hardhat verify --contract contracts/MyTokenSepolia.sol:MyTokenSepolia --network sepolia 0xCf2697aD632DE47427947bc357DeDbd5fBc1171D "MyToken-1" "MT1"
// npx hardhat verify --contract contracts/MyTokenSepolia.sol:MyTokenSepolia --network sepolia 0x8cf4B9805ED32E8C852985993F8199B45Bff6169 "MyToken-2" "MT2"    