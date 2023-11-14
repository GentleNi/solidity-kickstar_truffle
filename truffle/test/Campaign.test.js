//0x0d34B8e5Aa638e03776B092F3Df990987959e323
const  Campaign = artifacts.require("Campaign");
const  CampaignFactory = artifacts.require("CampaignFactory");

let CampaignAddress;
let CampaignInstance;
let accounts;

before(async () => {
    const CampaignFactoryInstance = await CampaignFactory.deployed();
    // let address = CampaignFactoryInstance.address;
    // console.log("The factory's addres is: " + address)
    
    // create Compaign
    await CampaignFactoryInstance.createCampaign(100);
    let Campaigns = await CampaignFactoryInstance.getDeployedCampaigns();
    assert.equal(Campaigns.length, 1, "created a Conmaign Contract!")

    //Get created CampaignAddress
    CampaignAddress = Campaigns[0]
    CampaignInstance = await Campaign.at(CampaignAddress);
    assert.ok(CampaignAddress,"successfully create a Campaign Contract.")

    //get accounts
    accounts  = await web3.eth.getAccounts()
}
);

contract('Test Campaign', () => {

//   it('Campaign Contract Initialized right', async() => {

//     // minimumContribution should be 100
//     let minimumContribution = await CampaignInstance.minimumContribution.call();
//     assert(minimumContribution, 100, " minimumContribution should be 100.");

//   });


//   it('Marks caller as the campaign manager', async() => {
//     let manageAddress = await CampaignInstance.manager;
//     assert(manageAddress, accounts[0], " manageAddress should be the same with address created by factory.");

//   });


//   it('People can contribute money and marks them as approvers', async() => {
//     await CampaignInstance.contribute({from:accounts[1], value: 200});
//     const contributors = await CampaignInstance.approvers;
//     assert(contributors(accounts[1]))
//   });


//   it('requires a minimum contribution ', async() => {
//     try{
//         await CampaignInstance.contribute({from:accounts[1], value: 50});
//         assert(false);
//     }catch(err){
//         assert(err);
//     }
//   });

// it('allows a manager to make a payment request.', async() => {
//     await CampaignInstance.createRequest('batteries', '100', accounts[0], {from:accounts[0]});
//     const request = await CampaignInstance.requests(0);
//     assert('Buy batteries', request.description);
//   });


it('process requests', async() => {
    try{
        await CampaignInstance.contribute({from:accounts[1], value: web3.utils.toWei('1', 'ether')});
        await CampaignInstance.createRequest('A', web3.utils.toWei('1', 'ether'), accounts[0], {from:accounts[0], gas:'1000000'});
        await CampaignInstance.approveRequest(0, {from:accounts[1]});
        await CampaignInstance.finalizeRequest(0, {from:accounts[0],  gas:'1000000'});
        let balance = await web3.eth.getBalance(accounts[0])
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        assert(balance > 100);
    } catch(err) {
        console.error(err);
    }


});

});
