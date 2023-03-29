import Link from 'next/link';

const Footer = () => {
	return (
		<footer className="w-full grid grid-cols-12 bg-black py-12">
			<div className="col-start-2 md:col-start-3 col-span-10 md:col-span-8 md:px-8 mt-4">
				<div className="grid grid-cols-2 w-full text-gray mb-2">
					<p>Codelab.</p>
					<p>HfG Schwäbisch Gmünd</p>
				</div>
				<div className="grid grid-cols-2 w-full text-white">
					<div className="flex flex-col gap-2">
						<Link href="">Link</Link>
						<Link href="">Link</Link>
						<Link href="">Link</Link>
					</div>
					<div className="flex flex-col gap-2">
						<Link href="">Link</Link>
						<Link href="">Link</Link>
						<Link href="">Link</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
