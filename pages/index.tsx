import	React, {ReactElement}		from	'react';
import	{motion}					from	'framer-motion';
import	{useWeb3}					from	'@yearn/web-lib/contexts';
import	{useLocalStorage}			from	'@yearn/web-lib/hooks';
import	BoxLogin					from	'components/boxes/BoxLogin';
import	BoxDeployToken				from	'components/boxes/BoxDeployToken';
import	BoxDeployVault				from	'components/boxes/BoxDeployVault';
import	BoxAddToMetamask			from	'components/boxes/BoxAddToMetamask';
import	BoxDocumentation			from	'components/boxes/BoxDocumentation';
import	BoxDepositLimit				from	'components/boxes/BoxDepositLimit';

// function	Arrow(props: React.SVGProps<SVGSVGElement>): ReactElement {
// 	return (
// 		<svg {...props} width={'64'} height={'64'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path d={'M512 256c0-141.4-114.6-256-256-256S0 114.6 0 256c0 141.4 114.6 256 256 256S512 397.4 512 256zM265.9 382.8C259.9 380.3 256 374.5 256 368v-64H160c-17.67 0-32-14.33-32-32v-32c0-17.67 14.33-32 32-32h96v-64c0-6.469 3.891-12.31 9.875-14.78c5.984-2.484 12.86-1.109 17.44 3.469l112 112c6.248 6.248 6.248 16.38 0 22.62l-112 112C278.7 383.9 271.9 385.3 265.9 382.8z'} fill={'currentColor'} /></svg>
// 	);
// }

const boxVariant = {
	visible: {opacity: 1, y: 0},
	hidden: {opacity: 0, y: 100}
};

function	Index(): ReactElement {
	const	{isActive, chainID} = useWeb3();
	const	[tokenAddress, set_tokenAddress] = useLocalStorage('tokenAddress', '') as [string, (s: string) => string];
	const	[vaultAddress, set_vaultAddress] = useLocalStorage('vaultAddress', '') as [string, (s: string) => string];

	return (
		<section aria-label={'some default section'}>
			<div className={'grid grid-cols-12 gap-10'}>
				{!isActive || chainID !== 4 ? (
					<motion.div
						key={'box-login'}
						initial={'hidden'}
						animate={'visible'}
						exit={'hidden'}
						className={'col-span-12'}
						variants={boxVariant}
						transition={{duration: 1.2, ease: 'easeInOut', delay: 0}}>
						<BoxLogin />
					</motion.div>
				) : (
					<>
						<motion.div
							key={'box-token'}
							initial={'hidden'}
							animate={'visible'}
							exit={'hidden'}
							className={'flex col-span-6'}
							variants={boxVariant}
							transition={{duration: 1.2, ease: 'easeInOut', delay: 0}}>
							<BoxDeployToken tokenAddress={tokenAddress} set_tokenAddress={set_tokenAddress} />
						</motion.div>

						{tokenAddress ? <motion.div
							key={'box-vault'}
							initial={'hidden'}
							animate={'visible'}
							exit={'hidden'}
							className={'flex col-span-6'}
							variants={boxVariant}
							transition={{duration: 1.2, ease: 'easeInOut', delay: 0}}>
							<BoxDeployVault tokenAddress={tokenAddress} vaultAddress={vaultAddress} set_vaultAddress={set_vaultAddress} />
						</motion.div> : null}

						{vaultAddress ? <motion.div
							key={'box-vault'}
							initial={'hidden'}
							animate={'visible'}
							exit={'hidden'}
							className={'grid col-span-4 w-full'}
							variants={boxVariant}
							transition={{duration: 1.2, ease: 'easeInOut', delay: 0}}>
							<BoxDepositLimit vaultAddress={vaultAddress} />
						</motion.div> : null}

						{tokenAddress && vaultAddress ? <motion.div
							key={'box-metamask'}
							initial={'hidden'}
							animate={'visible'}
							exit={'hidden'}
							variants={boxVariant}
							className={'grid col-span-4 w-full'}
							transition={{duration: 1.2, ease: 'easeInOut', delay: 0.2}}>
							<BoxAddToMetamask tokenAddress={tokenAddress} />
						</motion.div> : null}

						{tokenAddress && vaultAddress ? <motion.div
							key={'box-doc'}
							initial={'hidden'}
							animate={'visible'}
							exit={'hidden'}
							variants={boxVariant}
							className={'grid col-span-4 w-full'}
							transition={{duration: 1.2, ease: 'easeInOut', delay: 0.4}}>
							<BoxDocumentation />
						</motion.div> : null}

						{/* {tokenAddress && vaultAddress ? <motion.div
							key={'box-metamask-3'}
							initial={'hidden'}
							animate={'visible'}
							exit={'hidden'}
							variants={boxVariant}
							className={'flex col-span-4 justify-center items-center w-full h-full'}
							transition={{duration: 1.2, ease: 'easeInOut', delay: 0.2}}>
							<Arrow className={'w-36 h-36 opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-pointer'} />
						</motion.div> : null} */}
					</>
				)}
			</div>
		</section>
	);
}

export default Index;
