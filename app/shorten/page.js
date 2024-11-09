'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
	const [url, seturl] = useState('');
	const [shorturl, setshorturl] = useState('');
	const [generated, setGenerated] = useState('');

	const generate = () => {
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			url: url,
			shorturl: shorturl,
		});

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		fetch('/api/shorten', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`);
				// seturl('');
				// setshorturl('');
				console.log(result);
				alert(result.message);
			})
			.catch((error) => console.error(error));
	};

	return (
		<div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-8'>
			<h1 className='font-bold text-2xl text-center pb-4'>
				Generate your short URL's
			</h1>
			<div className='flex flex-col gap-6'>
				<input
					type='text'
					value={url}
					placeholder='Enter your URL'
					className='p-4 focus:outline-purple-300 py-2 rounded-xl'
					onChange={(e) => seturl(e.target.value)}
				/>
				<input
					className='p-4 focus:outline-purple-300 py-2 rounded-xl'
					type='text'
					value={shorturl}
					placeholder='Enter your preferred short URL'
					onChange={(e) => setshorturl(e.target.value)}
				/>
				<button
					className='text-white bg-purple-500 shadow-lg py-1 px-3 font-bold rounded-lg my-3'
					onClick={generate}
				>
					Generate
				</button>
			</div>
			{generated && (
				<code className='text-center text-pretty'>
					<span className='font-bold'>Your Link: </span>
					<Link target='_blank' href={generated}>
						{generated}
					</Link>
				</code>
			)}
		</div>
	);
};

export default Page;
