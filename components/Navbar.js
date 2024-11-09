import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='h-16  bg-purple-700 flex justify-between px-6 items-center text-white'>
			<div className='logo text-2xl font-bold'>
				<Link href={'/'}>BitLinks</Link>
			</div>
			<ul className='flex justify-center items-center gap-4 '>
				<Link href={'/'}>
					<li>Home</li>
				</Link>
				<Link href={'/about'}>
					<li>About</li>
				</Link>
				<Link href={'/shorten'}>
					<li>Shorten</li>
				</Link>
				<Link href={'/contact'}>
					<li>Contact Us</li>
				</Link>

				<li className='flex gap-4'>
					<Link href={'/shorten'}>
						<button className='bg-purple-500 shadow-lg py-1 px-3 font-bold rounded-lg'>
							Try Now
						</button>
					</Link>
					<Link href={'/github'}>
						<button className='bg-purple-500 shadow-lg py-1 px-3 font-bold rounded-lg'>
							Github
						</button>
					</Link>{' '}
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
