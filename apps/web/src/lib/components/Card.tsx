import Link from 'next/link';
const Card = () => {
	return (
		<div className="p-1 hover:shadow-xl transition-shadow bg-gray  pt-12 rounded-sm aspect-video w-full">
			<Link href="" className="relative p-4 flex items-end w-full">
				<div className="aspect-square rounded-sm w-1/2 h-1/2 bg-highlight p-2 flex flex-col justify-between">
					<p className="text-sm text-gray">Arduino</p>
					<h5 className="text-base font-bold text-black">Keyboard for Shortcuts</h5>
				</div>
			</Link>
		</div>
	);
};

export default Card;
