'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
	const [userUrls, setUserUrls] = useState([]);
	const { toast } = useToast();

	// Getting all short urls
	useEffect(() => {
		const fetchUserUrls = async () => {
			try {
				const response = await fetch('/api/shorten');
				const result = await response.json();

				if (result.success) {
					setUserUrls(result.urls);
				} else {
					// alert(result.message);
					toast({
						title: 'Error',
						description: result.message,
						variant: 'destructive',
					});
				}
			} catch (err) {
				console.log('Error fetching Urls:', err);
			}
		};
		fetchUserUrls();
	}, []);

	// Deleting short url

	const deleteUrl = async (urlId) => {
		try {
			const response = await fetch('/api/shorten', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ urlId }),
			});

			const result = await response.json();
			if (result.success) {
				// alert('URL Deleted Successfully');
				toast({
					title: 'Success',
					description: 'URL Deleted Successfully',
				});

				setUserUrls((prevUrls) => prevUrls.filter((url) => url._id !== urlId));
			} else {
				// alert(result.message);
				toast({
					title: 'Error',
					description: result.message,
					variant: 'destructive',
				});
			}
		} catch (err) {
			// console.log('Error deleting URL:', err);
			toast({
				title: 'Error',
				description: 'Error deleting URL',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className='p-4 mt-8 mx-auto max-w-2xl h-[100vh]'>
			<h2 className='font-bold text-4xl text-center'>Your Created URLs</h2>
			<ul className='mt-8 space-y-2'>
				{userUrls.map((item, index) => (
					<li
						key={index}
						className='bg-purple-100 p-4 rounded-lg shadow-md flex items-center justify-start gap-4 text-gray-700'
					>
						{/* <p>
							<strong>Original URL:</strong> {item.url}
						</p> */}
						<p className='text-sm font-thin mr-8'>
							{new Date(item.createdAt).toLocaleString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
						<p>
							<strong className=' font-bold'>Short URL: </strong>
							<Link href={`/${item.shorturl}`} target='_blank' className='ml-4'>
								{item.shorturl}
							</Link>
						</p>

						<Button
							type='button'
							className='ml-auto'
							onClick={() => deleteUrl(item._id)}
							variant='outline'
						>
							<Image src='/delete.png' alt='delete' width={20} height={20} />
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Page;
