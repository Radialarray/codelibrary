import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const handler = async (req: AxiosRequestConfig, res: AxiosResponse) => {
	// Call an external API endpoint to get article.
	// You can use any data fetching library
	try {
		const response = await axios({
			url: process.env.API_URL,
			auth: {
				username: process.env.API_USERNAME!,
				password: process.env.API_PASSWORD!
			},
			...req
		});
		const data = response.data;
		// By returning { props: { data } }, the Article component
		// will receive `data` as a prop at build time
		return {
			props: {
				data
			}
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				data: 'There was an error fetching the page'
			}
		};
	}
};

export default handler;
