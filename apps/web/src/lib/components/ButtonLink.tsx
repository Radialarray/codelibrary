import Link from 'next/link';
import NextImage from 'next/image';

interface Props {
	href: string;
	children: JSX.Element;
	dark?: boolean;
	external?: boolean;
}

const ButtonLink = ({href, children, dark, external}: Props) => {
	const darkStyle =
		'group h-16 w-72 min-w-fit flex flex-0 justify-between items-center px-5 py-6 gap-6 bg-black text-white border-2 border-solid border-black hover:border-gray transition-colors font-bold whitespace-nowrap';
	const normalStyle =
		'group h-16 w-72 min-w-fit flex flex-0 justify-between items-center px-5 py-6 gap-6 border-2 border-solid border-light-gray hover:border-gray transition-colors font-bold whitespace-nowrap';

	if (external) {
		return (
			<a target="_blank" className={dark ? darkStyle : normalStyle} href={href}>
				{children}
				<NextImage
					src={dark ? '/arrow-white.svg' : '/arrow.svg'}
					alt="Arrow Icon"
					width="18"
					height="18"
					className="-rotate-45 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200 ease-out"
				></NextImage>
			</a>
		);
	} else {
		return (
			<Link className={dark ? darkStyle : normalStyle} href={href}>
				{children}
				<NextImage
					src={dark ? '/arrow-white.svg' : '/arrow.svg'}
					alt="Arrow Icon"
					width="18"
					height="18"
					className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200 ease-out"
				></NextImage>
			</Link>
		);
	}
};

export default ButtonLink;
