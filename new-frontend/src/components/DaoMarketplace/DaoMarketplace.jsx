import React, { useState, useEffect } from 'react';
import './DaoMarketplace.css';
import getProviderOrSigner from '../../contractInstance';

function DaoMarketplace({ registeredDAOs, setRegisteredDAOs }) {
  const [showAll, setShowAll] = useState(true);

  const getRegisteredDAOs = async () => {
    const { farmDaoContract }  = await getProviderOrSigner(false); 
    console.log("Fetching DAOs: ")
    const allDAOs = await farmDaoContract.getAllDaos(); 
    
    console.log("DAOs created are: ", allDAOs)
    setRegisteredDAOs(allDAOs); 
  }

  const investDao = async (id) => {
    try {
      const ethAmount = 0.0001; 
      const { farmDaoContract } = await getProviderOrSigner(true); 
      const tx = await farmDaoContract.addInvestment(1, {
        value: utils.parseEther(ethAmount.toString()),
        gasLimit: 100000,
      }); 
      console.log("Sending funds..."); 

      await tx.wait(); 
      console.log("Funds sent successfully!"); 

      getRegisteredDAOs(); 
    } catch(error) {
      console.error(error); 
    }
  }
  
  // const items = [
  //   {
  //     title: "Dao 1",
  //     description: "Muranga Dao are well known for their growing horticulture crops currently exporting 1 tonne per quarter.",
  //     status: "Approval Ongoing",
  //   },
  //   {
  //     title: "Dao 2",
  //     description: "Umoja Dairy Dao in Kakamega are looking for support to expand on a borehole and cattle dip facilities .",
  //     status: "Approval Ongoing",
  //   },
  //   {
  //     title: "Dao 3",
  //     description: "Glory women chama are looking for investors to grow their greenhouse Dao model in Kenya.",
  //     status: "Active",
  //   },
  //   {
  //     title: "Dao 4",
  //     description: "Kisumu Dairy Cooperative expanding access to livestock feed in the county through low cost hydroponic systems.",
  //     status: "Approval Ongoing",
  //   },
  //   {
  //     title: "Dao 5",
  //     description: "Grower Farming Limited looking for like minded partners to increase access to equipment in Kenya.",
  //     status: "Active",
  //   },
  //   {
  //     title: "Dao 6",
  //     description: "Coffee Farmers Board target to export 5tonnes annually.",
  //     status: "Active",
  //   },
  // ];

  // const visibleItems = registeredDAOs.filter((item, index) => {
  //   return showAll ? true : index === 0;
  // });

  useEffect(() => {
    getRegisteredDAOs(); 
  }, [])

  return (

    <div>
      <h1 className='dao-heading'>DAO MARKETPLACE</h1>

      {registeredDAOs.length > 0 &&
        <div className="card-container">
          {registeredDAOs.map((item, index) => (
            <div key={index} className="card">
              <div className="card-info">
                <h2>{item.name}</h2>
                <div>Farmer Address 1: {item.address1.slice(0,6)}...{item.address1.slice(38,42)}<br/>Farmer Address 2: {item.address2.slice(0,6)}...{item.address2.slice(38,42)}</div>
                <p>DESCRIPTION: {item.description}</p>
                <p>FUNDS INVESTED: {item.amountInvested.toString()}</p>
              </div>
              <div className="card-buttons">
                <button onClick={() => handleShowModal("LOANS", "Click Here for Loans")}>Loans DAO</button>
                <button onClick={() => handleShowModal("INVEST", "Click Here to Invest")}>Invest DAO</button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default DaoMarketplace;
