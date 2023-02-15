import {GetStaticProps} from 'next';
import {getPageContent} from 'lib/api/api';
import Head from 'next/head';
import Layout from '../lib/components/layouts/Container';
import Header from '../lib/components/Header';
import Container from 'lib/components/layouts/Container';

const Home = (props: PageContent) => {
	// const meta = props.meta;
	// const navigation = meta.navigation;
	// return (
	// 	<>
	// 		<Head>
	// 			<title>Codelibrary @hfg-gmuend</title>
	// 			<meta
	// 				name="description"
	// 				content="Die Codelibrary der Hochschule für Gestaltung Schwäbisch Gmünd."
	// 			/>
	// 			<link rel="icon" href="/favicon-32x32.png" />
	// 		</Head>
	// 		<Container navItems={navigation}>
	// 			<h1>Hello</h1>
	// 		</Container>
	// 	</>
	// );
};

// const requestBody = {
// 	query: 'page("article")',
// 	select: {
// 		url: true,
// 		title: true,
// 		navigation: 'site.navigation.toNavigationArray',
// 		courses: true,
// 		codelanguages: true,
// 		level: true,
// 		categories: true,
// 		headline: true,
// 		intro: true,
// 		content: 'page.content.main',
// 		images: {
// 			query: 'page.images',
// 			select: {
// 				url: true,
// 				filename: true,
// 				dimensions: true
// 			}
// 		}
// 	},
// 	pagination: {limit: 10}
// };

// const requestOptions = {
// 	method: 'post',
// 	data: requestBody,
// 	redirect: 'follow'
// };

// export const getStaticProps: GetStaticProps = async context => {
// 	const response = await getPageContent(requestOptions);
// 	const meta = response.meta;

// 	return {
// 		props: {
// 			meta: meta
// 		}
// 	};
// };

export default Home;
