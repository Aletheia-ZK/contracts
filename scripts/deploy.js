// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.

    const [deployer] = await hre.ethers.getSigners()

    console.log('Deploying contracts with the account:', deployer.address)

    console.log('Account balance:', (await deployer.getBalance()).toString())

    // Deploy ZKU NFT contract
    const NFT1Contract = await hre.ethers.getContractFactory('ZKUCohort2SupporterToken')
    const nft1ContractDeployed = await NFT1Contract.deploy("100")
    await nft1ContractDeployed.deployed()

	// Deploy ZKU NFT contract
	const NFT2Contract = await hre.ethers.getContractFactory('OrcaToken')
	const nft2ContractDeployed = await NFT2Contract.deploy("100")
	await nft2ContractDeployed.deployed()

		// Deploy Aletheia contract
	const Aletheia = await hre.ethers.getContractFactory('Aletheia')
    const aletheia = await Aletheia.deploy()
    await aletheia.deployed()

    console.log('Aletheia deployed to:', aletheia.address)
    console.log('NFT ZKU contract deployed to:', nft1ContractDeployed.address)
    console.log('NFT Orca contract deployed to:', nft2ContractDeployed.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
