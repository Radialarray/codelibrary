import {GetStaticProps} from 'next';
import {getPageContent} from 'lib/api/api';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';
import styles from 'lib/styles/Home.module.css';
import Grid from 'lib/components/layouts/Grid';
import Card from 'lib/components/Card';

const Home = (props: PageContent) => {
	const meta = props.meta;
	const navigation = meta.navigation;

	return (
		<>
			<Head>
				<title>Codelibrary @hfg-gmuend</title>
				<meta
					name="description"
					content="Die Codelibrary der Hochschule für Gestaltung Schwäbisch Gmünd."
				/>
				<link rel="icon" href="/favicon-32x32.png" />
			</Head>

			<Header navItems={navigation}></Header>

			<div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
				<Container>
					<div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
						<div className="max-w-xl mx-auto text-left">
							<h1>
								Code like a pro.
								<strong className="text-red-700 sm:block">Skill up.</strong>
							</h1>

							<p className="mt-4 sm:leading-relaxed sm:text-xl">
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga
								ducimus numquam ea!
							</p>

							<div className="flex flex-wrap justify-start gap-4 mt-8">
								<a
									className="block w-full px-12 py-3 text-sm font-medium text-white bg-red-600 rounded shadow sm:w-auto active:bg-red-500 hover:bg-red-700 focus:outline-none focus:ring"
									href="/get-started"
								>
									Get Started
								</a>

								<a
									className="block w-full px-12 py-3 text-sm font-medium text-red-600 rounded shadow sm:w-auto hover:text-red-700 active:text-red-500 focus:outline-none focus:ring"
									href="/about"
								>
									Learn More
								</a>
							</div>
						</div>
					</div>
				</Container>
			</div>
			<Container>
				<h1>This is content</h1>
				<Grid>
					<Card></Card>
					<Card></Card>
					<Card></Card>
					<Card></Card>
				</Grid>
			</Container>
		</>
	);
};

const requestBody = {
	query: 'page("article")',
	select: {
		url: true,
		title: true,
		navigation: 'site.navigation.toNavigationArray',
		courses: true,
		codelanguages: true,
		level: true,
		categories: true,
		headline: true,
		intro: true,
		content: 'page.content.main',
		images: {
			query: 'page.images',
			select: {
				url: true,
				filename: true,
				dimensions: true
			}
		}
	},
	pagination: {limit: 10}
};

const requestOptions = {
	method: 'post',
	data: requestBody,
	redirect: 'follow'
};

export const getStaticProps: GetStaticProps = async context => {
	const response = await getPageContent(requestOptions);
	const meta = response.meta;

	return {
		props: {
			meta: meta
		}
	};
};

export default Home;
