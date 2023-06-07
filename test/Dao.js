const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('FarmDAO', () => {
  let farmDAO;
  let farmer1, farmer2, investor;
  // const [farmer1, farmer2, investor] = await ethers.getSigners(); 

  beforeEach(async () => {
    const FarmDAO = await ethers.getContractFactory('FarmDAO');
    farmDAO = await FarmDAO.deploy('Test DAO');
    await farmDAO.deployed();
    
    const signers = await ethers.getSigners(); 
    farmer1 = signers[0]; 
    farmer2 = signers[1]; 
    investor = signers[2]; 
  });

  describe('createDao', () => {
    it('should create a new DAO', async () => {
      const description = 'Test DAO Description';
      const name = 'Test DAO Name';


      console.log("Address is: ", farmer2.address); 
      // console.log("Farmer is: ", farmer1); 

      await farmDAO.createDao(farmer1.address, farmer2.address, description, name);

      const dao = await farmDAO.daos(1);
      expect(dao.address1).to.equal(farmer1.address);
      expect(dao.address2).to.equal(farmer2.address);
      expect(dao.description).to.equal(description);
      expect(dao.name).to.equal(name);
      expect(dao.amountInvested).to.equal(0);
      // expect(dao.investors).to.be.an('array').that.is.empty;
    });
  });

  describe('addInvestment', () => {
    it('should add investment to the DAO', async () => {
      const daoId = 1;
      const investmentAmount = ethers.utils.parseEther('1');

      await farmDAO.createDao(farmer1.address, farmer2.address, 'Test DAO Description', 'Test DAO Name');
      await investor.sendTransaction({
        to: farmDAO.address,
        value: investmentAmount,
      });

      const initialInvestment = await farmDAO.getTotalInvestment(daoId);
      expect(initialInvestment).to.equal(0);

      await farmDAO.addInvestment(daoId, { value: investmentAmount });

      const updatedInvestment = await farmDAO.getTotalInvestment(daoId);
      expect(updatedInvestment).to.equal(investmentAmount);
    });

    it('should revert if address has already joined the DAO', async () => {
      const daoId = 1;

      await farmDAO.createDao(farmer1.address, farmer2.address, 'Test DAO Description', 'Test DAO Name');
      await farmDAO.addInvestment(daoId, { value: ethers.utils.parseEther('1') });

      await expect(farmDAO.addInvestment(daoId, { value: ethers.utils.parseEther('1') }))
        .to.be.revertedWith('Only addresses that haven\'t joined the DAO can invest.');
    });
  });
});
