import Card from 'lib/components/Card';

interface Props {
	highlights: Highlight[];
}

const Highlights = ({highlights}: Props): JSX.Element | null => {
	if (highlights && highlights.length > 0) {
		const cards = highlights.map(content => {
			return content.highlight === 'true' && content.banner !== null ? (
				<Card key={content.id} content={content}></Card>
			) : null;
		});

		return (
			<section>
				<h2 className="mb-6">Highlights</h2>
				<div className="flex flex-wrap gap-6 w-full">{cards}</div>
			</section>
		);
	} else {
		return null;
	}
};

export default Highlights;
