import Caver from "caver-js";
import KIP17ABI from "../abi/KIP17TokenABI.json";
import {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  CHAIN_ID,
  COUNT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from "../constants/index";

const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic " +
        Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64"),
    },
    { name: "x-chain-id", value: CHAIN_ID },
  ],
};

const caver = new Caver(
  new Caver.providers.HttpProvider(
    "https://node-api.klaytnapi.com/v1/klaytn",
    option
  )
);

const NFTContract = new caver.contract(KIP17ABI, NFT_CONTRACT_ADDRESS);

export const fetchCardOf = async (address) => {
  // Fetch Balance
  const _balance = await NFTContract.methods.balanceOf(address).call();
  console.log(`[NFT Balance] ${_balance}`);
  // Fetch Token Ids
  const tokenIds = [];
  for (let i = 0; i < _balance; i++) {
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }

  // Fetch Token URIs
  const tokenUris = [];
  for (let i = 0; i < _balance; i++) {
    const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
    tokenUris.push(uri);
  }

  const nfts = [];
  for (let i = 0; i < _balance; i++) {
    nfts.push({ uri: tokenUris[i], id: tokenIds[i] });
  }
  console.log(nfts);
  return nfts;
};

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(
      caver.utils.hexToNumberString(response)
    );
    console.log("[BALANCE]" + balance);
    return balance;
  });
};

// const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);

// export const readCount = async () => {
//     const _count = await CountContract.methods.count().call();
//     console.log(_count);
//   };

// export const setCount = async (newCount) => {
//   try {
//     // 사용할 account 설정
//     const privateKey =
//       "0xb654fb96e33fd77fad8d07c827d884345031ad04f89119a8c9975e9c7988fe8c";
//     const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
//     caver.wallet.add(deployer);
//     const receipt = await CountContract.methods.setCount(newCount).send({
//       from: deployer.address,
//       gas: "0x4bfd200",
//     });
//     console.log(receipt);
//   } catch (e) {
//     console.log(`[ERROR] ${e}`);
//   }
// };
