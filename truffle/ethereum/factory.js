//using local network ganache
import web3 from './web3';
import CampaignFactory from '../build/contracts/CampaignFactory.json'

const  factory = new web3.eth.Contract(CampaignFactory.abi,'0xf37b87cfb7477327f383F4aCe509CEa8Db5085FE');

// console.log(CampaignFactoryInstance);

export default factory;