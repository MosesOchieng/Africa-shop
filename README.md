# Project Name: Polygon Circular Community

Link to Landing Page : https://polygon-circular-community.vercel.app/ 

Link to site demo: https://www.loom.com/share/cc3e8ac8be2648f4a2dbfc6a2ea2d808

# Description:
Polygon Circular Community is a decentralized platform that offers loans and investment opportunities to farmers across Africa. It is built on the Polygon network, which is a high-performance, low-cost blockchain network. The platform allows farmers to access affordable loans and investments through the Aave protocol on Polygon and the 1inch fusion API. This project aims to address the challenges that farmers in Africa face in accessing finance for their agricultural activities.

# Technical Details:
The Polygon Circular Community platform is built using various blockchain technologies, including Ethereum, Aave, and 1inch fusion API. The platform uses smart contracts to facilitate the lending and borrowing of funds on the Aave protocol on Polygon. The smart contracts are written in Solidity, which is a programming language used to develop smart contracts on the Ethereum network. The 1inch fusion API is used to provide liquidity to the platform by aggregating liquidity from various decentralized exchanges on the Polygon network.

The platform's front-end is developed using React, a popular JavaScript library used for building user interfaces. The platform's front-end interacts with the smart contracts on the Polygon network through the Web3.js library, which is a JavaScript library used to interact with Ethereum-based smart contracts. The front-end allows farmers to create a FarmDAO, which is a decentralized autonomous organization that enables them to access funding through the Aave protocol on Polygon. The front-end also allows investors to browse through the available FarmDAOs and invest in them.

# Functions already working Smart Contracts functions

FarmDAO Contract 
1. addInvestment() - function that adds investment to the DAO created by the farmers 

2. createDAO() - function that creates the DAOs 

3. getAllDaos() - returns all the DAOs created

4. getTotalInvestment() - returns the total invested amount in a particular DAO

# Work in progress folder.

This the project folder that implements aave on polygon for lending but has errors related to conflicts between solidity version and different aave libraries.We are on the procss of intergating Aave to our platform on polygon. The frontend are in the public folder.
Integrations with Meta snaps in the smart contracts wiht frontend also.

# Starter Kits

Vite-branch

# 0. Environment Setup

Install fundamental environments, including node, web3, react, hardhat, etc

\0. Environment Setup



Use Starter Kits build your DAPP right away!

------


```javascripts

```

> truflle is used for develop, test, and deploy smart contracts.
>
> More tutorials about truffle: https://learnblockchain.cn/docs/truffle/

\0. Environment Setup

# Create your DAPP using Starter Kits Template

#### Quick Start

```javascripts
npx create-react-app {Polygon Circular Community} --template polygon-starter-kit
cd {P2C}
npm run start 
```

![npm start](https://cdn.rawgit.com/facebook/create-react-app/27b42ac/screencast.svg)

(npx comes from npm 5.2+ or later)

Then fireup your browser and go to `http://localhost:3000/` to check your application.

When you are preparing to deploy your project to production settings, use `npm run build` to create a compressed bundle and deploy.

#### Immediate Configuration

There is no need for you to install or configurate tools like Webpack or Babel. They comes pre-configurated and hiddened, therefore you are provided with the full environment pack where you only need to worry about coding part.

Just create a project with the template, then you are good to go!

#### Create Application

You will need to use Node that is higher or equal to version 6 on your local computer(on server you don't have to). There is nvm(macOS/Linux) or nvm-windows to help you eaily switch between different Node versions.

Create a new application

```javascripts
npx create-react-app {Polygon Circular Community} --template vite
```

Then a new folder named `{Polygon Circular Community}` will be created under current folder location. The File structures under this new folder is as below:

```javascripts
{Polygon Circular Community}
├── README.md
├── node_modules
├── package.json
├── migrations 
├── templates
├── package.json
├── test
├── .config.hardhat.js
├── Contracts
│   ├── Dao.sol
│   ├── Dex.sol
│   ├── Market.sol
└── New-Frontend
	├── App.css
	├── App.js
	├── App.test.js
	├── landing page
	│   ├── index.html
	│   ├── style.css
	│   └── assets
	├── src
	│   ├── Contents
	│   │   └── index.js
	│   ├── Footer
	│   │   ├── footer.css
	│   │   └── index.js
	│   ├── Headers
	│   │   └── index.js
	│   └── Wallet
	│       ├── ConnectWallet.js
	│       └── WalletInfo.js
	├── public
	│   └── Migrations.sol
	├── hooks
	│   └── index.js
	├── index.css
	├── index.js
	├── lib
	│   └── connectors
	│       └── index.js
	├── reportWebVitals.js
	└── setupTests.js
└── truffle-config.js
```

```
