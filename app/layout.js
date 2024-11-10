import localFont from 'next/font/local';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata = {
	title: 'BitLinks - Your trsuted url shortener',
	description: 'Bitlinks helps you shorted your url in seconds',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-50`}
			>
				<Navbar />
				<main>{children}</main>
				<Toaster />
				<Footer />
			</body>
		</html>
	);
}
