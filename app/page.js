import Image from 'next/image';
import localFont from 'next/font/local';
import Link from 'next/link';
import { auth, signIn } from '@/auth';
import { Button } from '@/components/ui/button';

const poppins = localFont({
	src: './fonts/Poppins-ExtraBold.ttf',
	variable: '--font-poppins',
	weight: '100 900',
});

export default async function Home() {
	const session = await auth();

	return (
		<main className='bg-purple-100 h-[100vh]'>
			<section className='grid grid-cols-1 md:grid-cols-2 h-[50vh] w-[90%] mx-auto'>
				<div className='flex flex-col gap-4 items-center justify-center'>
					<p
						className={`text-2xl md:text-3xl text-center font-bold ${poppins.className}`}
					>
						The best Url shortener in the Market
					</p>
					<p className='text-center text-balance px-8'>
						Bitlinks is a simple and easy to use URL shortener for the internet
						that is trusted by millions of people. It is a free service which
						allows you to shorten any URL and share it with others. The
						shortened URL can be used in emails, text messages, social media,
						forums, blogs, and anywhere else where you want to share a URL.{' '}
						<span className='font-bold'>Bitlinks is a trusted service</span> and
						is used by millions of people.
					</p>
					<div className='flex gap-8 mt-4'>
						<Link href={'/shorten'}>
							<Button className='text-white bg-purple-500 hover:bg-purple-600 shadow-lg py-1 px-3 font-bold rounded-lg'>
								Try Now
							</Button>
						</Link>
						{session ? (
							<Link href={'/short-urls'}>
								<Button className='text-black bg-slate-50 hover:bg-slate-200 shadow-lg py-1 px-3 font-bold rounded-lg'>
									My Short URLs
								</Button>
							</Link>
						) : (
							<div>
								<form
									action={async () => {
										'use server';
										await signIn('github');
									}}
								>
									<Button
										type='submit'
										className='bg-slate-50 hover:bg-slate-200 text-black shadow-lg py-1 px-3 font-bold rounded-lg flex items-center justify-center gap-1'
									>
										<Image
											src={'/github.png'}
											alt='github'
											width={20}
											height={20}
										/>
										Github
									</Button>
								</form>
							</div>
						)}
					</div>
				</div>
				<div className=' flex justify-start relative'>
					<Image
						src={'/vector.jpg'}
						alt='A Group of Person'
						// fill={true}
						className='mix-blend-darken'
						width={600}
						height={400}
					/>
				</div>
			</section>
			<section className='grid grid-cols-1 md:grid-cols-2 h-[50vh] w-[90%] mx-auto'>
				<div className=' flex justify-start relative'>
					<Image
						src={'/short.png'}
						alt='A Website With Short URL'
						// fill={true}
						width={600}
						height={400}
						className='mix-blend-darken rounded-2xl'
					/>
				</div>
				<div className='flex flex-col gap-4 justify-center items-center md:items-start px-8'>
					<p
						className={`text-2xl md:text-3xl text-center font-bold ${poppins.className}`}
					>
						Store every URLs in one place
					</p>
					<p className='text-start text-balance'>
						By storing all your URLs in one place with Bitlinks, you'll enjoy a
						more streamlined online experience and save time searching for the
						links you need. Try Bitlinks today and start enjoying the benefits
						of effortless URL management! Keep all your URLs organized and tidy.
						<br />
					</p>
					<p className='text-md text-gray-500'>
						<span className='text-black font-bold'>Please note:</span> You need
						to be logged in to store and manage your short URLs securely with
						Bitlinks.
					</p>
					<div className='flex gap-8 mt-4'>
						<Link href={'/shorten'}>
							<Button className='text-white bg-purple-500 hover:bg-purple-600 shadow-lg py-1 px-3 font-bold rounded-lg'>
								Generate
							</Button>
						</Link>
						{session && (
							<Link href={'/short-urls'}>
								<Button className='text-black bg-slate-50 hover:bg-slate-200 shadow-lg py-1 px-3 font-bold rounded-lg'>
									My URLs
								</Button>
							</Link>
						)}
					</div>
				</div>
			</section>
		</main>
	);
}
