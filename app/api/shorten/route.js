import { auth } from '@/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request) {
	const session = await auth();

	// if (!session) {
	// 	return Response.json({
	// 		success: false,
	// 		error: true,
	// 		message: 'User not authenticated',
	// 	});
	// }

	const userId = session ? session.user.id : null;
	console.log(userId);

	const body = await request.json();
	// console.log(body);
	const client = await clientPromise;
	const db = client.db('bitlinks');
	const collection = db.collection('url');

	// Check if the short url exists
	const doc = await collection.findOne({ shorturl: body.shorturl });
	if (doc) {
		return Response.json({
			success: false,
			error: true,
			message: 'Short URL already exists',
		});
	}

	const result = await collection.insertOne({
		url: body.url,
		shorturl: body.shorturl,
		userId: userId,
		createdAt: new Date(),
	});

	return Response.json({
		success: true,
		error: false,
		message: 'URL Generated Successfully',
	});
}

export async function GET(request) {
	const session = await auth();

	if (!session) {
		return new Response(
			JSON.stringify({
				success: false,
				error: true,
				message: 'User not authenticated',
			}),
			{
				status: 401,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}

	const userId = session.user.id;

	try {
		const client = await clientPromise;
		const db = client.db('bitlinks');
		const collection = db.collection('url');

		const urls = await collection
			.find({ userId: userId })
			.sort({ createdAt: -1 })
			.toArray();

		return new Response(JSON.stringify({ success: true, urls }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false,
				error: true,
				message: 'Something went wrong',
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}
}

export async function DELETE(request) {
	const session = await auth();

	if (!session) {
		return new Response(
			JSON.stringify({
				success: false,
				error: true,
				message: 'User not authenticated',
			}),
			{
				status: 401,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}

	const userId = session.user.id;
	const { urlId } = await request.json();

	// console.log('Your urlId is:', urlId);
	// console.log(userId);

	try {
		const client = await clientPromise;
		const db = client.db('bitlinks');
		const collection = db.collection('url');

		// console.log(collection);
		const deleteResult = await collection.deleteOne({
			_id: new ObjectId(urlId),
			userId: userId,
		});

		if (deleteResult.deletedCount === 0) {
			return new Response(
				JSON.stringify({
					success: false,
					error: true,
					message: 'URL not found or not authorized to delete',
				}),
				{
					status: 404,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
		}

		return new Response(
			JSON.stringify({
				success: true,
				message: 'URL deleted successfully',
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false,
				error: true,
				message: 'Something went wrong',
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}
}
