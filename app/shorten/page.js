'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
	const [url, seturl] = useState('');
	const [shorturl, setshorturl] = useState('');
	const [generated, setGenerated] = useState('');

	const { toast } = useToast();

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
				seturl('');
				setshorturl('');
				console.log(result);
				toast({
					title: 'Success',
					description: 'Your Shorturl has been generated successfully',
				});
			})
			.catch((error) => {
				console.error(error);
				toast({
					title: 'Error',
					description: 'Something went wrong. Please try again',
					variant: 'destructive',
				});
			});
	};

	return (
		<>
			<div className='mx-auto max-w-lg bg-purple-200 my-16 p-8 rounded-lg flex flex-col gap-8'>
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
						onChange={(e) => {
							// Replace non-alphanumeric and space characters with hyphens
							setshorturl(
								e.target.value
									.replace(/[^a-zA-Z0-9\s]/g, '-')
									.replace(/\s/g, '-')
							);
						}}
					/>
					<Button
						className='text-white bg-purple-500 hover:bg-purple-600 shadow-lg py-1 px-3 font-bold rounded-lg my-3'
						onClick={generate}
					>
						Generate
					</Button>
				</div>
			</div>

			<div className='mx-auto bg-purple-300 max-w-4xl my-16 p-8 rounded-lg flex flex-col items-center justify-center gap-10'>
				<h2 className='font-bold text-2xl text-center'>
					The Url you created will appear here
					<p className='font-light mt-2'>
						{generated && (
							<code className='text-center text-pretty'>
								<span className='font-bold'>Your Link: </span>
								<Link
									target='_blank'
									href={generated}
									className='font-extralight underline italic'
								>
									{generated}
								</Link>
							</code>
						)}
					</p>
				</h2>
			</div>
		</>
	);
};

export default Page;
