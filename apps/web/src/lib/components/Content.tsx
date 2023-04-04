import {parseContent} from 'lib/components/Layouts';

interface Props {
	content: Page['content'];
}

const Content = ({content}: Props): JSX.Element | null => {
	if (content) {
		const htmlElements = parseContent(content);
		return <>{htmlElements}</>;
	}
	return null;
};

export default Content;
