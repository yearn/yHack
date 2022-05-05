import	React, {ReactElement}		from	'react';
import	{ethers}					from	'ethers';
import	{Card}						from	'@yearn/web-lib/components';
import	{useWeb3}					from	'@yearn/web-lib/contexts';
import	{useClientEffect}			from	'@yearn/web-lib/hooks';
import	* as utils					from	'@yearn/web-lib/utils';
import	{RadialBackground}			from	'components/RadialBackground';
import	IconGift					from	'components/icons/IconGift';
import	IconLoader					from	'components/icons/IconLoader';
import	{deployVaultYearnV2}		from	'utils/deployVault';

function	BoxDeployVault({tokenAddress, vaultAddress, set_vaultAddress}: {
	tokenAddress: string,
	vaultAddress: string,
	set_vaultAddress: (s: string) => void
}): ReactElement {
	const	{provider} = useWeb3();
	const	[isLoading, set_isLoading] = React.useState<boolean>(false);

	useClientEffect((): void => {
		const featuresEl = document.getElementById('vault');
		if (featuresEl) {
			const	cleanup = (): void => {
				featuresEl.removeEventListener('pointermove', pointermove);
				featuresEl.removeEventListener('pointerleave', pointerleave);
			};

			const	pointermove = (ev: any): void => {
				const rect = featuresEl.getBoundingClientRect();
				if (featuresEl?.style) {
					featuresEl.style.setProperty('--opacity', '0.7');
					featuresEl.style.setProperty('--x', (ev.clientX - rect.left).toString());
					featuresEl.style.setProperty('--y', (ev.clientY - rect.top).toString());
				}
			};

			const	pointerleave = (): void => {
				if (featuresEl?.style) {
					featuresEl.style.setProperty('--opacity', '0');
				}
			};

			featuresEl.addEventListener('pointermove', pointermove);
			featuresEl.addEventListener('pointerleave', pointerleave);
			return cleanup as any;
		}
	}, []);

	return (
		<Card id={'vault'} padding={'none'} className={'overflow-hidden'} style={{'--color': '#FFFFFF20'}}> 
			<div className={'flex relative z-10 flex-col w-full h-full feature'}>
				<div className={'relative z-20 p-4 space-y-2'}>
					<b className={'font-mono text-lg'}>{'# 2 - YOUR MIGHTY VAULT'}</b>
					<p className={'font-mono'}>
						{'Here is what I promised you, shadowy one. THE MIGHTY VAULT!'}
					</p>
					<p className={'font-mono'}>
						{'Remember, it is mighty because it will be yours!'}
					</p>
					<p className={'font-mono'}>{'Fancy, isn\'t it?'}</p>
				</div>
				{vaultAddress ? (
					<div className={'flex relative z-20 flex-col justify-center p-4 mt-auto mb-2'}>
						<p className={'mb-2 font-mono text-left'}>{'Here is your vault:'}</p>
						<div className={'flex justify-center items-center'}>
							<button
								onClick={(): void => {
									utils.copyToClipboard(vaultAddress);
								}}
								className={'items-center py-2 px-4 h-full font-mono font-bold text-center hover:text-[#e68900] hover:bg-white rounded-lg border-2 border-white transition-colors duration-700'}>
								{vaultAddress}
							</button>
						</div>
					</div>
				) : (
					<div className={'flex relative z-20 flex-col justify-center p-4 mt-auto mb-2'}>
						<p className={'mb-2 font-mono text-left opacity-0'}>{'none'}</p>
						<div className={'flex justify-center items-center'}>
							<button
								disabled={!tokenAddress}
								onClick={(): void => {
									if (!tokenAddress || !provider) {
										return;
									}
									set_isLoading(true);
									deployVaultYearnV2(
										provider as ethers.providers.Web3Provider,
										tokenAddress
									).then((addr: string): void => {
										set_isLoading(false);
										set_vaultAddress(addr);
									});
								}}
								className={`${!tokenAddress ? 'group relative items-center py-2 px-4 h-full font-mono font-bold text-center uppercase rounded-lg border-2 border-white cursor-not-allowed opacity-60' : `group relative items-center py-2 px-4 h-full font-mono font-bold text-center hover:text-[#e68900] uppercase hover:bg-white rounded-lg border-2 border-white transition-colors duration-700 ${isLoading ? 'text-primary/0 hover:text-primary/0' : ''}`}`}>
								{'Deploy Vault'}
								{isLoading ? (
									<div className={'flex absolute inset-0 justify-center items-center h-full'}>
										<IconLoader className={'w-6 h-6 text-white group-hover:text-[#e68900] animate-spin'} />
									</div>
								) : null}
							</button>
						</div>
					</div>
				)}

				<IconGift className={'absolute -top-16 -left-24 w-96 h-96 text-[#FF9800] opacity-40 -rotate-45'} />
				<RadialBackground base={'bg-[#e68900]'} gradient={['#FF9800', '#e68900', '#cc7a00']}/>
			</div>
		</Card>
	);
}


export default BoxDeployVault;