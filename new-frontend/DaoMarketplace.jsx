import React, { useState } from 'react';
import './DaoMarketplace.css';

function DaoMarketplace(props) {
  const [showAll, setShowAll] = useState(true);
  
  const items = [
    {
      title: "Dao 1",
      description: "Muranga Dao are well known for their growing horticulture crops currently exporting 1 tonne per quarter.",
      status: "Approval Ongoing",
    },
    {
      title: "Dao 2",
      description: "Umoja Dairy Dao in Kakamega are looking for support to expand on a borehole and cattle dip facilities .",
      status: "Approval Ongoing",
    },
    {
      title: "Dao 3",
      description: "Glory women chama are looking for investors to grow their greenhouse Dao model in Kenya.",
      status: "Active",
    },
    {
      title: "Dao 4",
      description: "Kisumu Dairy Cooperative expanding access to livestock feed in the county through low cost hydroponic systems.",
      status: "Approval Ongoing",
    },
    {
      title: "Dao 5",
      description: "Grower Farming Limited looking for like minded partners to increase access to equipment in Kenya.",
      status: "Active",
    },
    {
      title: "Dao 6",
      description: "Coffee Farmers Board target to export 5tonnes annually.",
      status: "Active",
    },
  ];

  const visibleItems = items.filter((item, index) => {
    return showAll ? true : index === 0;
  });

  return (

    <div>
      <h1 className='dao-heading'>DAO MARKETPLACE</h1>

      {visibleItems.length > 0 &&
        <div className="card-container">
          {visibleItems.map((item, index) => (
            <div key={index} className="card">
              <div className="card-info">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>{item.status}</p>
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
