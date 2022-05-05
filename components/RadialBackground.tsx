import	React, {ReactElement}		from	'react';

type	TRadialBackground = {
	base: string,
	gradient: [string, string, string]
}
function	RadialBackground({base, gradient}: TRadialBackground): ReactElement {
	return (
		<div className={'overflow-hidden absolute inset-0 z-[-1]'}>
			<div
				className={`aspect-square absolute inset-0 ${base} animate-rotate-center`}
				style={{
					backgroundImage: `
								radial-gradient(at 21% 33%, ${gradient[0]} 0px, transparent 50%),
								radial-gradient(at 79% 32%, ${gradient[1]} 0px, transparent 50%),
								radial-gradient(at 26% 83%, ${gradient[2]} 0px, transparent 50%)`
				}}
			/>
		</div>
	);
}
export {RadialBackground};