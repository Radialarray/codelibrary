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

	const data = await requestData(requestOptions);

	return {
		title: {
			default: data.result.title,
			template: `%s | ${data.result.title}`
		}
	};
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html>
			<head></head>
			<body>{children}</body>
		</html>
	);
}
