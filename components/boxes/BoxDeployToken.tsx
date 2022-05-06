import	React, {ReactElement}	from	'react';
import	{ethers}				from	'ethers';
import	{Card}					from	'@yearn/web-lib/components';
import	{useWeb3}				from	'@yearn/web-lib/contexts';
import	{useClientEffect}		from	'@yearn/web-lib/hooks';
import	* as utils				from	'@yearn/web-lib/utils';
import	{RadialBackground}		from	'components/RadialBackground';
import	{deployToken}			from	'utils/deployToken';
import	IconGem					from	'components/icons/IconGem';
import	IconLoader				from	'components/icons/IconLoader';

function	BoxDeployToken({tokenAddress, set_tokenAddress}: {tokenAddress: string, set_tokenAddress: (s: string) => void}): ReactElement {
	const	{provider} = useWeb3();
	const	[isLoading, set_isLoading] = React.useState<boolean>(false);

	useClientEffect((): void => {
		const featuresEl = document.getElementById('token');
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
		<Card id={'token'} padding={'none'} className={'overflow-hidden'} style={{'--color': '#FFFFFF20'}}> 
			<div className={'flex relative z-10 flex-col w-full h-full feature'}>
				<div className={'relative z-20 p-4 space-y-2'}>
					<b className={'font-mono text-lg'}>{'# 1 - DEPLOY TOKEN'}</b>
					<p className={'font-mono'}>
						{'Good for you. You can connect a wallet. '}
					</p>
					<p className={'font-mono'}>
						{'Let’s see if you can actually hAck s0mething together.'}
					</p>
					<p className={'font-mono'}>
						{'I believe in you. I will even make things a bit easier.'}
					</p>
					<p className={'font-mono'}>
						{'A token and vault are but a click away. '}
					</p>
					<p className={'font-mono'}>
						{'Right now things are easy. Enjoy it... as it wont stay this way for long.'}
					</p>
				</div>
				{tokenAddress ? (
					<div className={'flex relative z-20 flex-col justify-center p-4 mt-auto mb-2'}>
						<p className={'mb-2 font-mono text-left'}>{'Here is your token:'}</p>
						<div className={'flex justify-center items-center'}>
							<button
								onClick={(): void => utils.copyToClipboard(tokenAddress)}
								className={'items-center py-2 px-4 h-full font-mono font-bold text-center hover:text-[#0657F9] hover:bg-white rounded-lg border-2 border-white transition-colors duration-700'}>
								{tokenAddress}
							</button>
						</div>
					</div>
				) : (
					<div className={'flex relative z-20 flex-col justify-center p-4 mt-auto mb-2'}>
						<p className={'mb-2 font-mono text-left opacity-0'}>{'Here is your token:'}</p>
						<div className={'flex justify-center items-center'}>
							<button
								onClick={(): void => {
									set_isLoading(true);
									deployToken(provider as ethers.providers.Web3Provider).then((addr: string): void => {
										set_isLoading(false);
										set_tokenAddress(addr);
									});
								}}
								className={`group relative items-center py-2 px-4 h-full font-mono font-bold text-center hover:text-[#0657F9] uppercase hover:bg-white rounded-lg border-2 border-white transition-colors duration-700 ${isLoading ? 'text-primary/0 hover:text-primary/0' : ''}`}>
								{'Deploy Test Token'}
								{isLoading ? (
									<div className={'flex absolute inset-0 justify-center items-center h-full'}>
										<IconLoader className={'w-6 h-6 text-white group-hover:text-[#0657F9] animate-spin'} />
									</div>
								) : null}
							</button>
						</div>
					</div>
				)}
				<IconGem className={'absolute -right-32 -bottom-44 w-96 h-96 text-[#0657F9] opacity-40 rotate-45'} />
				<RadialBackground base={'bg-[#0657F9]'} gradient={['#5189fb', '#0657F9', '#043dae']}/>
			</div>
		</Card>
	);
}
export default BoxDeployToken;