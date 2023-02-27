import type {Metadata} from 'next';

import '../lib/styles/globals.css';
import {requestData} from 'lib/api/api';

export async function generateMetadata(): Promise<Metadata> {
	const requestBody: KQLRequestBody = {
		query: 'site'
	};

	const requestOptions: KQLRequestOptions = {
		method: 'POST',
		body: requestBody,
		redirect: 'follow'
	};

	try {
		const data = await requestData(requestOptions);
		return {
			title: {
				default: data.result.title,
				template: `%s | ${data.result.title}`
			}
		};
	} catch (error) {
		return {
			title: {
				default: 'Error',
				template: `%s | Error`
			}
		};
	}
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="de">
			<head></head>
			<body>{children}</body>
		</html>
	);
}
