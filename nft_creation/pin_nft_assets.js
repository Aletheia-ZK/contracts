import fs from 'fs'
import path from 'path'
import { NFTStorage, File } from 'nft.storage'
import dotenv from 'dotenv';
dotenv.config();

const NUMBER_OF_TOKENS = 100

async function nft_1() {
  const storage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

  const directory = [];

  for (const id of Array.from(Array(NUMBER_OF_TOKENS).keys())) {
    const fileData = fs.readFileSync(`./assets/zku_logo.png`)
    const imageFile = new File([fileData], `zku-cohort-2-${id}.png`, { type: 'image/png'});
    const image = await storage.storeBlob(imageFile);
    console.log(`Added token ${id}`)

    const metadata = {
			id: `{id}`,
      name: `ZKU Cohort 2 Supporter Token #${id}`,
      description: "This token identifies you as a supporter of ZKU.",
      image: `ipfs://${image}`,
    }

    directory.push(
      new File([JSON.stringify(metadata, null, 2)], `${id}`)
    )
  }

  const pinnedDir = await storage.storeDirectory(directory);
	console.log(pinnedDir)
}

async function nft_2() {
  const storage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

  const directory = [];

  for (const id of Array.from(Array(NUMBER_OF_TOKENS).keys())) {
    const fileData = fs.readFileSync(`./assets/orca.png`)
    const imageFile = new File([fileData], `orca-${id}.png`, { type: 'image/png'});
    const image = await storage.storeBlob(imageFile);
    console.log(`Added token ${id}`)

    const metadata = {
			id: `{id}`,
      name: `Orca Token #${id}`,
      description: "This token identifies you as a supporter of Orcas.",
      image: `ipfs://${image}`,
    }

    directory.push(
      new File([JSON.stringify(metadata, null, 2)], `${id}`)
    )
  }

  const pinnedDir = await storage.storeDirectory(directory);
	console.log(pinnedDir)
}

async function main() {
  await nft_1()
  await nft_2()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });