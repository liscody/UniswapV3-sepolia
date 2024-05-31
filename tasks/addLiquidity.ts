// import * as dotenv from "dotenv";
// dotenv.config();

// import { task, types } from "hardhat/config";
// import type { MyToken } from "../typechain-types";

// import type { BigNumber, BigNumberish } from "ethers";

// import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { deploy } from "@openzeppelin/hardhat-upgrades/dist/utils";

// import BigNumberJS from 'bignumber.js';

// BigNumberJS.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

// function encodePriceSqrt(reserve1: BigNumberish, reserve0: BigNumberish): string {
//     // Convert reserves to BigNumberJS instances
//     const bnReserve1 = new BigNumberJS(reserve1.toString());
//     const bnReserve0 = new BigNumberJS(reserve0.toString());
    
//     // Calculate the square root of the division and scale by 2^96
//     const sqrtPrice = bnReserve1.div(bnReserve0).sqrt()
//         .multipliedBy(new BigNumberJS(2).pow(96))
//         .integerValue(BigNumberJS.ROUND_DOWN);
    
//     // Convert to a string and return as Ethers BigNumber
//     return BigNumber.from(sqrtPrice.toFixed(0)).toString();
// }
// // Example usage
// const sqrtPriceX96 = "1533986336806160992173892185949834";

// const deployerAddress = "0x0345f396705808CC580Cf9A2D3EcB59B23bcaA28";

// const token0Address = "0xF8A0d2451089cCA71d9F8B169adD969154da4Cf7";
// const token1Address = "0x1157D683F9bEB496CcaD202b5036F0B051842cAe";

// // (0.05, 0.3, 1, 0.01)
// var fee = 0.3 * 10000;
// var token0Decimals = 18;
// var token1Decimals = 18;

// // function encodePriceSqrt(reserve1: any, reserve0: any) {
// //     return BigNumber.from(
// //         new bn(reserve1.toString())
// //             .div(reserve0.toString())
// //             .sqrt()
// //             .multipliedBy(new bn(2).pow(96))
// //             .integerValue(3)
// //             .toString()
// //     ).toString();
// // }

// // //
// // // ----------------- Step 1. Deployment of all contracts. --------------------
// // //
// task("deployAllContracts", "Deploy new contract").setAction(async (taskArgs, { ethers, upgrades, network, run }) => {
//     const deployer = await ethers.getSigner(deployerAddress);

//     console.log("Deploying contracts with the account:", deployer.address);
//     console.log("Start deploy Token 1 ...");
//     // get balance of deployer
//     const balance = await deployer.getBalance();
//     console.log("Balance: ", balance.toString());

//     const MyToken = await ethers.getContractFactory("MyToken");

//     let token1: MyToken = await MyToken.deploy("MyToken-1", "MT1");
//     await token1.deployed();

//     console.log("Token 1 deployed to : ", token1.address);

//     // check if  local network
//     if (network.name != "localhost") {
//         console.log("Slip 100 sec before verification...");
//         await new Promise((resolve) => setTimeout(resolve, 100000)); // 100 seconds.
//         console.log("Start verify USDC contract");

//         try {
//             await run("verify:verify", { address: token1.address, constructorArguments: ["MyToken-1", "MT1"] }).then(
//                 () => {
//                     console.log("Successfully verified.\n");
//                 },
//                 (error) => {
//                     const reason = new Error(JSON.stringify(error)).message;
//                     if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
//                     else
//                         console.log(
//                             `Error. The verification is failed for a contract with the address ${token1.address}.\n` +
//                                 `Reason: ${reason}\n`
//                         );
//                 }
//             );
//         } catch (error) {
//             console.log(
//                 `Error after verification of a contract with the address ${token1.address}.\n` +
//                     `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
//             );
//         }
//     }

//     console.log("Start deploy Token 2 ...");

//     let token2: MyToken = await MyToken.deploy("MyToken-2", "MT2");
//     await token2.deployed();

//     console.log("Token 1 deployed to : ", token2.address);

//     // check if  local network
//     if (network.name != "localhost") {
//         console.log("Slip 100 sec before verification...");
//         await new Promise((resolve) => setTimeout(resolve, 100000)); // 100 seconds.
//         console.log("Start verify USDC contract");

//         try {
//             await run("verify:verify", { address: token2.address, constructorArguments: ["MyToken-2", "MT2"] }).then(
//                 () => {
//                     console.log("Successfully verified.\n");
//                 },
//                 (error) => {
//                     const reason = new Error(JSON.stringify(error)).message;
//                     if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
//                     else
//                         console.log(
//                             `Error. The verification is failed for a contract with the address ${token2.address}.\n` +
//                                 `Reason: ${reason}\n`
//                         );
//                 }
//             );
//         } catch (error) {
//             console.log(
//                 `Error after verification of a contract with the address ${token2.address}.\n` +
//                     `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
//             );
//         }
//     }

//     console.log('const token1Addr = "' + token1.address.trim() + '";');
//     console.log('const token2Addr = "' + token2.address.trim() + '";');

//     console.log("");
//     console.log("");
//     console.log("🚀 ~ Congrats --- Contracts successfully deployed and verified");
// });
// // npx hardhat deployAllContracts --network sepolia

// //
// // ----------------- Step 2. Set addresses. ---------------------------------
// //
// task("createPool", "Create liquidity pool").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log(" 🛸 ~ task ~ Set addresses started ...");
//     let tx;

//     const token0 = (await ethers.getContractAt("MyToken", token0Address)) as MyToken;
//     const token1 = (await ethers.getContractAt("MyToken", token1Address)) as MyToken;

//     console.log(" 🔍 Received all necessary contract instances.");
//     // $2000 $1
//     var price = encodePriceSqrt(1, 1);
//     console.log("price: ", price);

//     // const meta = (await ethers.getContractAt("NFTMetadata", metadataAddr)) as NFTMetadata;
//     // const controller = (await ethers.getContractAt("MintController", controllerAddr)) as MintController;
//     // const market = (await ethers.getContractAt("InnovoMarket", marketAddr)) as InnovoMarket;
//     // const nft = (await ethers.getContractAt("InnovoNFT", nftAddr)) as InnovoNFT;

//     // console.log(" 🔍 Received all necessary contract instances.");
//     // console.log(" 🔨 Start set addresses.");

//     // // ___________________ setNFTAddress ___________________
//     // console.log(" 🔨 Set certificate address.");
//     // tx = await market.setNFTAddress(nftAddr);
//     // await tx.wait();
//     // // check certificate address
//     // const certificateAddressMarket = await market.nftContract();
//     // console.log("certificateAddressMarket: ", certificateAddressMarket);

//     // // ___________________ setNFTMetadataAddress ___________________
//     // console.log(" 🔨 Set certificate metadata address.");
//     // tx = await market.setNFTMetadataAddress(metadataAddr);
//     // await tx.wait();
//     // // check certificate metadata address
//     // const certificateMetadataAddress = await market.nftMetadata();
//     // console.log("certificateMetadataAddress: ", certificateMetadataAddress);

//     // //___________________ setMintControllerAddress ___________________
//     // console.log(" 🔨 Set mint controller address.");
//     // tx = await market.setMintControllerAddress(controllerAddr);
//     // await tx.wait();
//     // // check mint controller address
//     // const mintControllerAddress = await market.controller();
//     // console.log("mintControllerAddress: ", mintControllerAddress);

//     // // ___________________ setNFTAddress ___________________
//     // console.log(" 🔨 Set certificate address.");
//     // tx = await controller.setNFTAddress(nftAddr);
//     // await tx.wait();
//     // // check certificate address
//     // const certificateAddress = await controller.nftMetadata();
//     // console.log("certificateAddress: ", certificateAddress);

//     // // ___________________ setSignatory ___________________
//     // console.log(" 🔨 Set signatory address.");
//     // tx = await controller.setSignatory(signatoryAddress);
//     // await tx.wait();
//     // // check signatory address
//     // const signatory = await controller.signatory();
//     // console.log("signatory: ", signatory);

//     // // ___________________ setAllowlistStatus ___________________
//     // console.log(" 🔨 Set allowlist status.")
//     // tx = await controller.setAllowlistStatus(minterAddress, true);
//     // await tx.wait();
//     // // check allowlist status
//     // const isAllow = await controller.allowlist(minterAddress);
//     // console.log("isAllow: ", isAllow);

//     // console.log("🚧 Congratulations! All addresses are set.");
// });
// // npx hardhat createPool --network sepolia

// // //
// // // ----------------- Step 3. Set new fees version. --------------------------
// // //
// // task("setFeeVersion", "Set fee version ").setAction(async (taskArgs, { ethers, upgrades, run }) => {
// //     console.log(" 🛸 ~ task ~ Set addresses started ...");
// //     let tx;

// //     const meta = (await ethers.getContractAt("NFTMetadata", metadataAddr)) as NFTMetadata;
// //     const controller = (await ethers.getContractAt("MintController", controllerAddr)) as MintController;
// //     const market = (await ethers.getContractAt("InnovoMarket", marketAddr)) as InnovoMarket;
// //     const nft = (await ethers.getContractAt("InnovoNFT", nftAddr)) as InnovoNFT;

// //     console.log(" 🔍 Received all necessary contract instances.");
// //     console.log(" 🔨 Set new fees version.");

// //     const newBuyerFee = 250;
// //     const newSellerFee = 350;

// //     tx = await market.setFeeVersion(newBuyerFee, newSellerFee);
// //     await tx.wait();
// //     // check new fees version
// //     const feeVersion = await market.feeVersions(1);
// //     console.log("feeVersion: ", feeVersion);

// //     console.log("🚧 Congratulations! New fees version is set.");
// // });

// // // npx hardhat setFeeVersion --network mumbai
// // // npx hardhat setFeeVersion --network localhost

// // //
// // // ----------------- Step 4. Grant roles. ----------------------------------
// // //
// // task("grantRoles", "Grant roles").setAction(async (taskArgs, { ethers, upgrades, run }) => {
// //     console.log("");
// //     console.log("🚀 Grant roles started ...");

// //     // back end address
// //     const minterAddr = signatoryAddress;
// //     let tx;

// //     const meta = (await ethers.getContractAt("NFTMetadata", metadataAddr)) as NFTMetadata;
// //     const controller = (await ethers.getContractAt("MintController", controllerAddr)) as MintController;
// //     const market = (await ethers.getContractAt("InnovoMarket", marketAddr)) as InnovoMarket;
// //     const nft = (await ethers.getContractAt("InnovoNFT", nftAddr)) as InnovoNFT;
// //     console.log(" 🔍 Received all necessary contract instances.");
// //     console.log(" 🔨 Grant roles.");

// //     console.log(" 🔍 Receive MINT_CONTROLLER_ROLE.");
// //     const controllerRole = await meta.MINT_CONTROLLER_ROLE();
// //     console.log(" 🔍 Receive MARKET_SPLITTER_ROLE.");
// //     const splitterRole = await controller.MARKET_SPLITTER_ROLE();
// //     console.log(" 🔍 Role received.");

// //     console.log(" 🔨 Grant roles.");
// //     // grant roles
// //     tx = await meta.grantRole(controllerRole, controller.address);
// //     await tx.wait();
// //     // check if role is granted
// //     const hasRole = await meta.hasRole(controllerRole, controller.address);
// //     console.log("controller: ", hasRole);

// //     // grant roles
// //     tx = await controller.grantRole(splitterRole, market.address);
// //     await tx.wait();
// //     // check if role is granted
// //     const hasRole1 = await controller.hasRole(splitterRole, market.address);
// //     console.log("market: ", hasRole1);

// //     const role = await meta.WORKER_ROLE();
// //     const tx2 = await meta.grantRole(role, signatoryAddress);
// //     await tx2.wait();

// //     const hasRole2 = await meta.hasRole(role, signatoryAddress);
// //     console.log("signatory: ", hasRole2);

// //     console.log("🚧 Congratulations! Roles are granted.");
// // });
// // // npx hardhat grantRoles --network mumbai
// // // npx hardhat grantRoles --network localhost

// // //
// // // ----------------- Step 5. Set allowlist. ---------------------------------
// // //
// // task("allowlist", "Set allow list and add balances to each.").setAction(async (taskArgs, { ethers, upgrades, run }) => {
// //     console.log("");
// //     console.log("Set addresses started ...");

// //     const deployer = await ethers.getSigner(deployerAddress);

// //     const meta = (await ethers.getContractAt("NFTMetadata", metadataAddr)) as NFTMetadata;
// //     const controller = (await ethers.getContractAt("MintController", controllerAddr)) as MintController;
// //     const market = (await ethers.getContractAt("InnovoMarket", marketAddr)) as InnovoMarket;
// //     const nft = (await ethers.getContractAt("InnovoNFT", nftAddr)) as InnovoNFT;

// //     const addrs = [
// //         "0x9FCbBc76EDD680b4073345C36a8B6880352363e8",
// //         "0x1695F2867a4D92AA3b694DD14006E1f0595460Bb",
// //         "0x7193AE09206b15701306d3A0E0b70224Ce6F33cB",
// //         "0x4326E8938f6f6C48E0Ffb189232f3462E3B76e08",
// //         "0x4A0B367d0b7279B6C18266c4AD24A0b3a313B6c0",
// //         "0x05fed8fce63589b3C9C05F356b08B1A5a14A6403",
// //         "0xD305A833C35C634e4e1BB6Fe7dA15160c911eC20",
// //         "0xA294391DaBAAC5fC9ebAF24aC5E430d192025e63",
// //         "0x90b9fB61e9987395Ac6EE240630A0BAB876C1130",
// //         "0x771Cb44B5DC32af55705e99c59c1016E154f6E27",
// //         "0xbEd479387Bf4E25a9B6A320B612835e0a8CaeC6a",
// //         "0x6E616BdebF0044e0e071df03E480F063a6c139FC",
// //         "0x7a9554D9871cC06679d26eFbC20366bC4e6ec694",
// //         "0xcF243366567e1defd45445fD25E9d1297a5181f1",
// //         "0x29a74D7F2c84bf8Ad67FC04A36b3f21A75449183",
// //         "0x4f52E1B02F2A294a9E85C27A71B4045444BD5318",
// //         "0x3350589A1638973e3309A6C340715Ea8FD599306",
// //         "0xE4F72dD489F424acb80d5b6766cD5e63D459270C",
// //         "0xFD0309c67482804a4dF77e7B6739F1cA733eC2B4",
// //         "0x03F2dA5859BA2991Bc243540004793F2b646B296",
// //         "0xB78Cc9E2b7D00e42884Ae3dC16863f6F93550031",
// //         "0x048A40fb05AD327774C84f59c2fA0398DcF9763c",
// //         "0x0DCe824aC8423f6f3642dB1A3e460dB2D79465F7",
// //         "0x36f6AcCBAB8967a4989389b05Ce10B591f79dec7",
// //         "0x2e451228C5Ac69AFAAB68743cf5C2BadfDbC9F5f",
// //         "0x0053ddf07D437386CE42519cFFeD85CBEA94De09",
// //         "0x45c57e99191D955b0B13e60a253Dd3D1B95Ed3E2",
// //         "0x16F80b66A8f6Fe1a389d005cBDA8eb36006e80d2",
// //         "0xB719D276f9A2eD29E3E582193EC94594d07Ad6e6",
// //         "0x3628F18aA1d9230E3F30E6D48056123e989dd398"
// //     ];

// //     for (let i = 0; i < addrs.length; i++) {
// //         const tx = await market.setAllowlistStatus(addrs[i], true);
// //         await tx.wait();

// //         // check  list
// //         const isAllow = await market.allowlist(addrs[i]);
// //         console.log("addrs[i]: ", addrs[i], " isAllow: ", isAllow);

// //         // ___________________ setAllowlistStatus ___________________
// //         console.log(" 🔨 Set minter status.");
// //         const tx2 = await controller.setAllowlistStatus(addrs[i], true);
// //         await tx2.wait();
// //         // check allowlist status
// //         const isAllow2 = await controller.allowlist(addrs[i]);
// //         console.log("isAllow: ", isAllow2);
// //     }
// //     console.log("🚧 Congratulations! All addresses are set.");
// //     console.log("Successfully set allowlist");

// //     // mint usdc
// //     console.log("mint usdc");
// //     const usdc = (await ethers.getContractAt("UChildERC20", usdcAddr)) as UChildERC20;
// //     // add data bytes to mint

// //     const data = ethers.utils.defaultAbiCoder.encode(
// //         ["address", "uint256"],
// //         [deployerAddress, ethers.utils.parseEther("1000000000000000000000000000")]
// //     );

// //     const tx1 = await usdc.deposit(deployer.address, data);

// //     await tx1.wait();
// //     console.log("Successfully mint usdc");

// //     // transfer usdc to addrs
// //     console.log("transfer usdc to addrs");

// //     for (let i = 0; i < addrs.length; i++) {
// //         const tx = await usdc.transfer(addrs[i], ethers.utils.parseEther("1000000000000"));
// //         await tx.wait();

// //         // check balance
// //         const balance = await usdc.balanceOf(addrs[i]);
// //         console.log("addrs[i]: ", addrs[i], " balance: ", balance.toString());
// //     }

// //     console.log("Successfully transfer usdc to addrs");
// // });
// // // npx hardhat allowlist --network mumbai
// // // npx hardhat allowlist --network localhost

// // task("upgNftMetadata", "Upgrade NFTMetadata contract").setAction(
// //     async (taskArgs, { ethers, upgrades, run }) => {
// //         console.log("");
// //         console.log("Start upgrade NFTMetadata contract ...");

// //         const deployer = await ethers.getSigner(deployerAddress);

// //         const NFTMetadata = await ethers.getContractFactory("NFTMetadata", deployer);

// //         console.log(" 🔍 Received all necessary contract instances.");
// //         console.log(" 🔨 Upgrade NFTMetadata contract ...");
// //         const nftMetadata = await upgrades.upgradeProxy(metadataAddr, NFTMetadata);
// //         await nftMetadata.deployed();
// //         console.log("NFTMetadata was deployed at address: ", nftMetadata.address);

// //         console.log(" 🚧 Congratulations! NFTMetadata contract is upgraded.");

// //         // verify
// //         console.log("Start verify NFTMetadata contract");
// //         console.log("slip 100 sec");
// //         console.log("");
// //         await new Promise((resolve) => setTimeout(resolve, 100000)); // 100 seconds.

// //         try {
// //             await run("verify:verify", { address: metadataAddr, constructorArguments: [] }).then(
// //                 () => {
// //                     console.log("Successfully verified.\n");
// //                 },
// //                 (error) => {
// //                     const reason = new Error(JSON.stringify(error)).message;
// //                     if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
// //                     else
// //                         console.log(
// //                             `Error. The verification is failed for a contract with the address ${metadataAddr}.\n` +
// //                                 `Reason: ${reason}\n`
// //                         );
// //                 }
// //             );
// //         } catch (error) {
// //             console.log(
// //                 `Error after verification of a contract with the address ${metadataAddr}.\n` +
// //                     `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
// //             );
// //         }

// //         console.log("🚀 ~ Congrats --- NFTMetadata contract successfully upgraded and verified");
// //     }
// // );
// // // npx hardhat upgNftMetadata --network mumbai
// // // npx hardhat upgNftMetadata --network localhost

// // task("upgMarket", "Upgrade MarketPlace contract").setAction(async (taskArgs, { ethers, upgrades, run }) => {
// //     console.log("");
// //     console.log("Start upgrade MarketPlace contract ...");

// //     const deployer = await ethers.getSigner(deployerAddress);

// //     const InnovoMarket = await ethers.getContractFactory("InnovoMarket", deployer);

// //     console.log(" 🔍 Received all necessary contract instances.");
// //     console.log(" 🔨 Upgrade MarketPlace contract ...");
// //     const market = await upgrades.upgradeProxy(marketAddr, InnovoMarket);
// //     await market.deployed();
// //     console.log("MarketPlace was deployed at address: ", market.address);

// //     console.log(" 🚧 Congratulations! MarketPlace contract is upgraded.")

// //     // verify
// //     console.log("Start verify MarketPlace contract");
// //     console.log("slip 100 sec");
// //     console.log("");
// //     await new Promise((resolve) => setTimeout(resolve, 100000)); // 100 seconds.

// //     try {
// //         await run("verify:verify", { address: marketAddr, constructorArguments: [] }).then(
// //             () => {
// //                 console.log("Successfully verified.\n");
// //             },
// //             (error) => {
// //                 const reason = new Error(JSON.stringify(error)).message;
// //                 if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
// //                 else
// //                     console.log(
// //                         `Error. The verification is failed for a contract with the address ${marketAddr}.\n` +
// //                             `Reason: ${reason}\n`
// //                     );
// //             }
// //         );
// //     } catch (error) {
// //         console.log(
// //             `Error after verification of a contract with the address ${marketAddr}.\n` +
// //                 `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
// //         );
// //     }
// // });
// // // npx hardhat upgMarket --network mumbai
// // // npx hardhat upgMarket --network localhost
