import type {NextPage} from 'next';
import Head from 'next/head';
import Layout from '../lib/components/layouts/Container';
import Header from '../lib/components/Header';

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
