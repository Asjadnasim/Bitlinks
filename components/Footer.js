import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<footer className='w-full h-12 bg-purple-500 flex items-center justify-between px-10'>
			<div className='flex items-center justify-center gap-4'>
				<p className='text-white font-bold'>Copyright &copy; Asjad 2024</p>
				<p className='text-white font-bold'>My Gmail: asjadnasim@gmail.com</p>
			</div>

			<div className='flex items-center justify-center gap-4'>
				{/* <Image /> */}
				<Link href={'https://github.com/Asjadnasim'} target='_blank'>
					<Image src={'/github.png'} alt='github' width={30} height={30} />
				</Link>
				<Link
					href={'https://www.linkedin.com/in/asjad-nasim-b80a6b257'}
					target='_blank'
				>
					<Image src={'/linkedin.png'} alt='linkedin' width={30} height={30} />
				</Link>
				<Link href={'https://x.com/nasim_asjad'} target='_blank'>
					<Image src={'/twitter.png'} alt='twitter' width={30} height={30} />
				</Link>
				<Link href={`mailto:?to=&subject=&body=`} target='_blank'>
					<Image src={'/gmail.png'} alt='gmail' width={30} height={30} />
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
