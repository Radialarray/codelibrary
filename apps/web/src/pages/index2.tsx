import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';
import Header from '../components/header';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Codelibrary @hfg-gmuend</title>
				<meta
					name="description"
					content="Die Codelibrary der Hochschule für Gestaltung Schwäbisch Gmünd."
				/>
				<link rel="icon" href="/favicon-32x32.png" />
			</Head>

			<Header></Header>

			<Layout>
				<h1>Hello</h1>
			</Layout>
		</div>
	);
};

export default Home;
