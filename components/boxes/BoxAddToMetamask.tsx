import	React, {ReactElement}		from	'react';
import	{Card}						from	'@yearn-finance/web-lib/components';
import	{useWeb3}					from	'@yearn-finance/web-lib/contexts';
import	{useClientEffect}			from	'@yearn-finance/web-lib/hooks';
import	{RadialBackground}			from	'components/RadialBackground';
import	IconEye						from	'components/icons/IconEye';

function	BoxAddToMetamask({tokenAddress}: {tokenAddress: string}): ReactElement {
	const	{provider} = useWeb3();

	useClientEffect((): void => {
		const featuresEl = document.getElementById('metamask');
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
		<Card id={'metamask'} padding={'none'} className={'overflow-hidden'} style={{'--color': '#FFFFFF20'}}> 
			<div className={'feature flex relative z-10 flex-col w-full h-full min-h-[256px]'}>
				<div className={'relative z-20 p-4 space-y-2'}>
					<b className={'font-mono text-lg'}>{'# 4 - ADD TO METAMASK'}</b>
					<p className={'font-mono'}>
						{'What... again?'}
					</p>
				</div>
				<div className={'flex relative z-20 flex-col justify-center p-4 mt-auto mb-2'}>
					<p className={'mb-2 font-mono text-left opacity-0'}>{'nothing'}</p>
					<div className={'flex justify-center items-center'}>
						<button
							onClick={(): void => {
								(provider as any).send('wallet_watchAsset', {
									type: 'ERC20',
									options: {
										address: tokenAddress,
										symbol: 'yTest',
										decimals: 18,
										image: 'https://avatars.githubusercontent.com/u/60162948?s=200&v=4'
									}
								}).catch((): void => console.log('No? ok you fancy.'));
							}}
							className={'group relative items-center py-2 px-4 h-full font-mono font-bold text-center hover:text-[#eb6100] uppercase hover:bg-white rounded-lg border-2 border-white transition-colors duration-700'}>
							{'Add token to Metamask'}
						</button>
					</div>
				</div>

				<IconEye className={'absolute w-96 h-96 text-[#CC5400] opacity-40'} />
				<RadialBackground base={'bg-[#eb6100]'} gradient={['#CC5400', '#eb6100', '#b84c00']}/>
			</div>
		</Card>
	);
}

export default BoxAddToMetamask;