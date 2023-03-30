import Card from 'lib/components/Card';

interface Props {
	highlights: Highlight[];
	categories: [];
}

const Highlights = ({categories, highlights}: Props): JSX.Element | null => {
	if (highlights && highlights.length > 0) {
		const cards = highlights.map(content => {
			if (content.highlight === 'true' && content.banner !== null) {
				return <Card key={content.id} categories={categories} content={content}></Card>;
			} else {
				return null;
			}
		});

		return (
			<section>
				<h2 className="text-3xl mb-6">Highlights</h2>
				<div className="flex flex-wrap gap-6 w-full">{cards}</div>
			</section>
		);
	} else {
		return null;
	}
};

export default Highlights;
