import	React, {ReactElement}		from	'react';
import	{Card}						from	'@yearn/web-lib/components';
import	{useClientEffect}			from	'@yearn/web-lib/hooks';
import	{RadialBackground}			from	'components/RadialBackground';
import	IconShape					from	'components/icons/IconShape';

function	BoxDocumentation(): ReactElement {
	useClientEffect((): void => {
		const featuresEl = document.getElementById('documentation');
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
		<Card id={'documentation'} padding={'none'} className={'overflow-hidden'} style={{'--color': '#FFFFFF20'}}> 
			<div className={'flex relative z-10 flex-col w-full h-full min-h-[256px] feature'}>
				<div className={'relative z-20 p-4 space-y-2'}>
					<b className={'font-mono text-lg'}>{'# 5 - READ THE DOC'}</b>
					<p className={'font-mono'}>
						{'You know nothing Anon Snow. At least not yet.'}
					</p>
					<p className={'font-mono'}>
						{'Run along. Read the docs to ascertain the next steps in your journey.'}
					</p>
				</div>
				<div className={'flex relative z-20 flex-col justify-center p-4 mt-auto mb-2'}>
					<p className={'mb-2 font-mono text-left opacity-0'}>{'nothing'}</p>
					<div className={'flex justify-center items-center'}>
						<a href={'https://docs.yearn.finance/developers/v2/hacking-with-yearn'} target={'_blank'} rel={'noreferrer'}>
							<button
								className={'group relative items-center py-2 px-4 h-full font-mono font-bold text-center hover:text-[#004124] uppercase hover:bg-white rounded-lg border-2 border-white transition-colors duration-700'}>
								{'Check documentation'}
							</button>
						</a>
					</div>
				</div>

				<IconShape className={'absolute -right-24 bottom-12 w-96 h-96 text-[#005a32] opacity-40 rotate-90'} />
				<RadialBackground base={'bg-[#004124]'} gradient={['#005a32', '#004124', '#00341d']}/>
			</div>
		</Card>
	);
}

export default BoxDocumentation;