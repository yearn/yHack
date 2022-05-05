const Dotenv = require('dotenv-webpack');

module.exports = ({
	experimental: {
		concurrentFeatures: true
	},
	plugins: [new Dotenv()],
	images: {
		domains: [
			'rawcdn.githack.com'
		]
	},
	env: {
		/* 🔵 - Yearn Finance **************************************************
		** Stuff used for the SEO or some related elements, like the title, the
		** github url etc.
		**********************************************************************/
		WEBSITE_URI: 'https://hack.yearn.farm/',
		WEBSITE_NAME: 'yHack',
		WEBSITE_TITLE: 'yHack',
		WEBSITE_DESCRIPTION: 'Hack with Yearn',
		PROJECT_GITHUB_URL: 'https://github.com/yearn/yearn-template',

		/* 🔵 - Yearn Finance **************************************************
		** Some config used to control the behaviour of the web library. By
		** default, all of theses are set to false.
		** USE_WALLET: should we allow the user to connect a wallet via
		**             metamask or wallet connect?
		** USE_PRICES: should we fetch the prices for a list of tokens? If true
		**             the CG_IDS array should be populated with the tokens
		**             to fetch.
		** USE_PRICE_TRI_CRYPTO: should we fetch the special Tri Crypto token
		** 			   price? (require blockchain call)
		** USE_FEEDBACKS: should we enable the feedback button?
		**********************************************************************/
		USE_WALLET: true,
		USE_PRICES: true,
		USE_PRICE_TRI_CRYPTO: false,
		USE_FEEDBACKS: false,
		CG_IDS: ['keep3rv1'],
		TOKENS: [
			['0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44', 18, 1]
		],
		RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			4: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
			250: process.env.RPC_URL_FANTOM || 'https://rpc.ftm.tools',
			42161: process.env.RPC_URL_ARBITRUM || 'https://arbitrum.public-rpc.com'
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		INFURA_KEY: process.env.INFURA_KEY
	}
});
