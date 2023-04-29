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
npx create-react-app {YOUR_PROJECT_NAME} --template polygon-starter-kit
cd {YOUR_PROJECT_NAME}
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
│   ├── Market.sol
│ 
└── New-Frontend
	├── App.css
	├── App.js
	├── App.test.js
	├── assets
	│   ├── icon-devx.svg
	│   ├── logo512.png
	│   └── polygon-logo.svg
	├── components
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
	├── contracts
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
