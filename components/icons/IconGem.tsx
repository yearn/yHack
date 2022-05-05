import	React, {ReactElement}				from	'react';

function	IconGem(props: React.SVGProps<SVGSVGElement>): ReactElement {
	return (
		<svg {...props} width={'24'} height={'24'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path d={'M507.9 196.4l-104-153.8C399.4 35.95 391.1 32 384 32H127.1C120 32 112.6 35.95 108.1 42.56l-103.1 153.8c-6.312 9.297-5.281 21.72 2.406 29.89l231.1 246.2C243.1 477.3 249.4 480 256 480s12.94-2.734 17.47-7.547l232-246.2C513.2 218.1 514.2 205.7 507.9 196.4zM382.5 96.59L446.1 192h-140.1L382.5 96.59zM256 178.9L177.6 80h156.7L256 178.9zM129.5 96.59L205.1 192H65.04L129.5 96.59zM256 421L85.42 240h341.2L256 421z'} fill={'currentColor'} /></svg>
	);
}

export default IconGem;