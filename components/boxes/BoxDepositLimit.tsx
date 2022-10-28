import	React, {ReactElement}				from	'react';
import	{ethers}							from	'ethers';
import	{Card}								from	'@yearn-finance/web-lib/components';
import	{useWeb3}							from	'@yearn-finance/web-lib/contexts';
import	{useClientEffect}					from	'@yearn-finance/web-lib/hooks';
import	{RadialBackground}					from	'components/RadialBackground';
import	IconAcorn							from	'components/icons/IconAcorn';
import	IconLoader							from	'components/icons/IconLoader';
import	{increaseDepositLimit}				from	'utils/deployVault';

function	BoxDepositLimit({vaultAddress}: {vaultAddress: string}): ReactElement {
	const	{provider} = useWeb3();
	const	[isLoading, set_isLoading] = React.useState<boolean>(false);
	const	[isDone, set_isDone] = React.useState<boolean>(false);

	useClientEffect((): void => {
		const featuresEl = document.getElementById('depositLimit');
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
		<Card id={'depositLimit'} padding={'none'} className={'overflow-hidden'} style={{'--color': '#FFFFFF20'}}> 
			<div className={'feature flex relative z-10 flex-col w-full h-full'}>
				<div className={'relative z-20 p-4 space-y-2'}>
					<b className={'font-mono text-lg'}>{'# 3 - THE DEPOSIT LIMIT'}</b>
					<p className={'font-mono'}>
						{'You know what we say about limits: The only limits that exist are the ones in your own mind.'}
					</p>
					<p className={'font-mono'}>
						{'Not here.'}
					</p>
					<p className={'font-mono'}>{'So let\'s fix that, shall we?'}</p>
				</div>
				{isDone ? (
					<div className={'flex relative z-20 flex-col justify-center p-4 mt-auto mb-2'}>
						<p className={'mb-2 font-mono text-left opacity-0'}>{'none'}</p>
						<div className={'flex justify-center items-center'}>
							<button
								disabled
								className={'items-center py-2 px-4 h-full font-mono font-bold text-center rounded-lg border-2 border-white cursor-default'}>
								{'Great'}
							</button>
						</div>
					</div>
				) : (
					<div className={'flex relative z-20 flex-col justify-center p-4 mt-auto mb-2'}>
						<p className={'mb-2 font-mono text-left opacity-0'}>{'none'}</p>
						<div className={'flex justify-center items-center'}>
							<button
								disabled={!vaultAddress}
								onClick={(): void => {
									if (!vaultAddress || !provider) {
										return;
									}
									set_isLoading(true);
									increaseDepositLimit(
										provider as ethers.providers.Web3Provider,
										vaultAddress
									).then((isSuccess: boolean): void => {
										set_isLoading(false);
										set_isDone(isSuccess);
									});
								}}
								className={`${!vaultAddress ? 'group relative items-center py-2 px-4 h-full font-mono font-bold text-center uppercase rounded-lg border-2 border-white cursor-not-allowed opacity-60' : `group relative items-center py-2 px-4 h-full font-mono font-bold text-center hover:text-[#5a269d] uppercase hover:bg-white rounded-lg border-2 border-white transition-colors duration-700 ${isLoading ? 'text-primary/0 hover:text-primary/0' : ''}`}`}>
								{'Become limitless'}
								{isLoading ? (
									<div className={'flex absolute inset-0 justify-center items-center h-full'}>
										<IconLoader className={'w-6 h-6 text-white group-hover:text-[#5a269d] animate-spin'} />
									</div>
								) : null}
							</button>
						</div>
					</div>
				)}

				<IconAcorn className={'absolute -top-36 -left-48 w-96 h-96 text-[#5a269d] opacity-40 -rotate-45'} />
				<RadialBackground base={'bg-[#5a269d]'} gradient={['#36175E', '#5a269d', '#311555']}/>
			</div>
		</Card>
	);
}

export default BoxDepositLimit;