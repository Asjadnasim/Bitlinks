import Image from 'next/image';
import { auth, signIn, signOut } from '../auth';
import Link from 'next/link';

const Navbar = async () => {
	const session = await auth();

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
					<div className='flex items-center gap-5 text-black'>
						{session && session?.user ? (
							<>
								<form
									action={async () => {
										'use server';
										await signOut({ redirectTo: '/' });
									}}
								>
									<button
										type='submit'
										className='bg-purple-500 hover:bg-purple-600  shadow-lg py-1 px-3 font-bold rounded-lg text-white'
									>
										Logout
									</button>
								</form>
								<div className='bg-purple-500 hover:bg-purple-600 shadow-lg py-1 px-3 font-bold rounded-lg text-white flex items-center justify-center gap-1'>
									<Image
										src={session?.user?.image}
										alt={session?.user?.name}
										width={20}
										height={20}
										className='rounded-full'
									/>
									<h2>{session?.user?.name}</h2>
								</div>
							</>
						) : (
							<form
								action={async () => {
									'use server';
									await signIn('github');
								}}
							>
								<button
									type='submit'
									className='bg-purple-500 hover:bg-purple-600  shadow-lg py-1 px-3 font-bold rounded-lg text-white'
								>
									Github
								</button>
							</form>
						)}
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
