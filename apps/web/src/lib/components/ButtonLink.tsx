import Link from 'next/link';
import NextImage from 'next/image';

interface Props {
	href: string;
	children: JSX.Element;
	dark?: boolean;
	external?: boolean;
}

const ButtonLink = ({href, children, dark, external}: Props) => {
	if (external) {
		return (
			<a
				target="_blank"
				className={
					dark
						? 'group h-16 w-72 min-w-fit flex flex-0  justify-between items-center px-5 py-6 gap-6 border-2 border-solid border-gray hover:border-black transition-colors font-bold whitespace-nowrap'
						: 'group h-16 w-72 min-w-fit flex flex-0  justify-between items-center px-5 py-6 gap-6 border-2 border-solid border-light-gray hover:border-gray transition-colors font-bold whitespace-nowrap'
				}
				href={href}
			>
				{children}
				<NextImage
					src="/arrow.svg"
					alt="Arrow Icon"
					width="18"
					height="18"
					className="-rotate-45 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200 ease-out"
				></NextImage>
			</a>
		);
	} else {
		return (
			<Link
				className={
					dark
						? 'group h-16 w-72 min-w-fit flex flex-0  justify-between items-center px-5 py-6 gap-6 border-2 border-solid border-gray hover:border-black transition-colors font-bold whitespace-nowrap'
						: 'group h-16 w-72 min-w-fit flex flex-0  justify-between items-center px-5 py-6 gap-6 border-2 border-solid border-light-gray hover:border-gray transition-colors font-bold whitespace-nowrap'
				}
				href={href}
			>
				{children}
				<NextImage
					src="/arrow.svg"
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
