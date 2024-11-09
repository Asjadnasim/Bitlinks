import Image from 'next/image';
import localFont from 'next/font/local';
import Link from 'next/link';

const poppins = localFont({
	src: './fonts/Poppins-ExtraBold.ttf',
	variable: '--font-poppins',
	weight: '100 900',
});

export default function Home() {
	return (
		<main className='bg-purple-100'>
			<section className='grid grid-cols-2 h-[50vh]'>
				<div className='flex flex-col gap-4 items-center justify-center'>
					<p className={`text-3xl font-bold ${poppins.className}`}>
						The best Url shortener in the Market
					</p>
					<p className='text-center text-pretty px-8'>
						Bitlinks is a simple and easy to use URL shortener for the internet
						that is trusted by millions of people. It is a free service which
						allows you to shorten any URL and share it with others. The
						shortened URL can be used in emails, text messages, social media,
						forums, blogs, and anywhere else where you want to share a URL.{' '}
						<span className='font-bold'>Bitlinks is a trusted service</span> and
						is used by millions of people.
					</p>
					<div className='flex gap-4'>
						<Link href={'/shorten'}>
							<button className='text-white bg-purple-500 shadow-lg py-1 px-3 font-bold rounded-lg'>
								Try Now
							</button>
						</Link>
						<Link href={'/github'}>
							<button className='text-white bg-purple-500 shadow-lg py-1 px-3 font-bold rounded-lg'>
								Github
							</button>
						</Link>{' '}
					</div>
				</div>
				<div className=' flex justify-start relative'>
					<Image
						src={'/vector.jpg'}
						alt='A Group of Person'
						fill={true}
						className='mix-blend-darken'
						// width={300}
						// height={300}
					/>
				</div>
			</section>
		</main>
	);
}
