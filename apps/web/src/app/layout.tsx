import type {Metadata} from 'next';
import '../lib/styles/globals.css';
import {getPageContent, requestData} from 'lib/api/api';
import Footer from 'lib/components/Footer';

export async function generateMetadata(): Promise<Metadata> {
	const requestBody = {
		query: 'site'
	};

	const requestOptions: KQLRequestOptions = {
		method: 'POST',
		body: requestBody,
		redirect: 'follow'
	};

	try {
		const data = await requestData(requestOptions);

		if ('title' in data.result && typeof data.result.title === 'string') {
			return {
				title: {
					default: data.result.title,
					template: `%s | ${data.result.title}`
				}
			};
		} else {
			throw new Error('Error in page title');
		}
	} catch (error) {
		return {
			title: {
				default: 'Error',
				template: `%s | Error`
			}
		};
	}
}

const getData = async (): Promise<KQLResponse> => {
	const requestBody = {
		query: 'site',
		select: {
			url: true,
			navigation: 'site.navigation.toNavigationArray',
			footer: {
				query: 'site',
				select: {
					footerInternal: 'site.footerInternal.toNavigationArray',
					footerExternal: 'site.footerExternal.toNavigationArray'
				}
			}
		},
		pagination: {limit: 10}
	};

	const requestOptions: KQLRequestOptions = {
		method: 'POST',
		body: requestBody,
		redirect: 'follow'
	};

	const response = await getPageContent(requestOptions);

	return response;
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
	const data = await getData();

	return (
		<html lang="de">
			<head></head>
			<body>
				{children}
				{data.result && 'footer' in data.result && data.result?.footer ? (
					<Footer items={data.result.footer}></Footer>
				) : null}
			</body>
		</html>
	);
};

export default RootLayout;
