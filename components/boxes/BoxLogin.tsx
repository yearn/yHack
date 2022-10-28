import	React, {ReactElement}		from	'react';
import	{useWeb3}					from	'@yearn-finance/web-lib/contexts';
import	{Card}						from	'@yearn-finance/web-lib/components';
import	{useClientEffect}			from	'@yearn-finance/web-lib/hooks';
import	{RadialBackground}			from	'components/RadialBackground';
import	IconGift					from	'components/icons/IconGift';

function	BoxLogin(): ReactElement {
	const	{openLoginModal} = useWeb3();

	useClientEffect((): void => {
		const featuresEl = document.getElementById('connect');
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
		<Card id={'connect'} padding={'none'} className={'overflow-hidden'} style={{'--color': '#FFFFFF20'}}> 
			<div className={'feature flex relative z-10 flex-col w-full h-full min-h-[256px]'}>
				<div className={'relative z-20 p-4 space-y-2'}>
					<b className={'font-mono text-lg'}>
						{'# 0 - CONNECT YOUR WALLET'}
					</b>
					<p className={'font-mono'}>
						{'Are you ready to hack in the Yearn galaxy?'}
					</p>
					<p className={'font-mono'}>
						{'I hope you’re prepared because this is going to be one heck of a ride.'}
					</p>
					<p className={'font-mono'}>
						{'Your first task is simple.'}
					</p>
					<p className={'font-mono'}>
						{'Connect your wallet.'}
					</p>
					<p className={'font-mono'}>
						{'You know the drill. Click below ;)'}
					</p>
				</div>
				<div className={'flex relative z-20 flex-col justify-center p-4 mt-auto mb-2'}>
					<p className={'mb-2 font-mono text-left opacity-0'}>{'nothing'}</p>
					<div className={'flex justify-center items-center'}>
						<button
							onClick={(): void => openLoginModal()}
							className={'group relative items-center py-2 px-4 h-full font-mono font-bold text-center hover:text-[#f169a0] uppercase hover:bg-white rounded-lg border-2 border-white transition-colors duration-700'}>
							{'Connect wallet'}
						</button>
					</div>
				</div>

				<IconGift className={'absolute -top-16 -left-24 w-96 h-96 text-[#f05794] opacity-40 -rotate-45'} />
				<RadialBackground base={'bg-[#f169a0]'} gradient={['#f05794', '#f169a0', '#e01466']}/>
			</div>
		</Card>
	);
}

export default BoxLogin;