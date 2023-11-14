const  CampaignFactory = artifacts.require("CampaignFactory");
// const  Campaign = artifacts.require("Campaign");


contract('Test CampaignFactory', () => {
  it('It should create a Single Factory', async() => {
    const CampaignFactoryInstance = await CampaignFactory.deployed();
    let address = CampaignFactoryInstance.address;
    console.log("The factory's addres is: " + address)
    
    // create Compaign
    await CampaignFactoryInstance.createCampaign(100);
    let Campaigns = await CampaignFactoryInstance.getDeployedCampaigns();
    assert.equal(Campaigns.length, 1, "created a Conmaign Contract!")
    console.log("The Campaign's addres is: " +Campaigns[0]);
    //0x0d34B8e5Aa638e03776B092F3Df990987959e323


  });
});
