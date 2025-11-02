import Web3 from 'web3';
import axios from 'axios';
import { contractABI } from "./abi";

const providerUrl = "wss://eth-sepolia.g.alchemy.com/v2/LAiZdg6CamKksgc1U8E2S"; // this is know as RPC url, it helps us to connect to the ethereum blockchain and listen on events
const contractAddress = "0x6A8Ee5eAd4346FC23765f3004e98ef8c86FbC6D0";
const webhookUrl = "https://your-dummy-fetch-url";

const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const contract = new web3.eth.Contract(contractABI, contractAddress);

//@ts-ignore
contract.events.PaymentReceived({
    fromBlock: 0
})
.on('data', async function(event) {
    console.log(`Adding user ${event.returnValues.email} to the course`);
    // axios.post(webhookUrl, {
    //     email: event.returnValues.email,
    // });
})