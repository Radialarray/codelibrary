import Link from 'next/link';
import NextImage from 'next/image';
import {findElementByValue, splitString} from 'lib/helper/helper';

interface Props {
	content: Highlight;
	categories: [];
}

const Card = ({categories, content}: Props) => {
	const category = content.categories?.length > 0 ? splitString(content.categories) : '';

	const categoryVal =
		category && Array.isArray(category) ? findElementByValue(categories, category[0]) : null;

	return (
		<div className="relative block p-1 outline outline-2 outline-light-gray hover:shadow-xl transition-shadow bg-black pt-12 rounded-sm aspect-video w-72">
			{content.banner ? (
				<div className="absolute top-0 left-0 w-full h-full z-0">
					<NextImage
						className="object-cover object-center h-full w-full grayscale opacity-100"
						key={content.banner.id}
						src={content.banner.url}
						alt={'Vorschaubild für die Seite ' + content.title}
						width={content.banner.width}
						height={content.banner.height}
					/>
				</div>
			) : null}

			<Link href={content.uri} className="relative p-4 flex items-end w-full">
				<div className="aspect-square rounded-sm w-1/2 h-1/2 bg-highlight p-2 flex flex-col justify-between">
					<p className="text-sm text-gray">{categoryVal.title}</p>
					<h5 className="text-base font-bold text-black">{content.title}</h5>
				</div>
			</Link>
		</div>
	);
};

export default Card;
