import Link from 'next/link';

interface Props {
	items: object;
}

const Footer = ({items}: Props) => {
	return (
		<footer className="w-full grid grid-cols-12 bg-black py-12">
			<div className="col-start-2 md:col-start-3 col-span-10 md:col-span-8 md:px-8 mt-4">
				<div className="flex flex-col gap-12 md:gap-0 md:grid grid-cols-2 w-full text-white">
					<nav className="flex flex-col gap-2">
						<h5 className="font-normal text-base text-gray md:mb-2">Codelab.</h5>
						{'footerInternal' in items && Array.isArray(items.footerInternal)
							? items.footerInternal.map((item: NavItem) => {
									if (item.popup === true) {
										return (
											<a target="_blank" key={item.id} href={item.url}>
												{item.text}
											</a>
										);
									} else {
										return (
											<Link key={item.id} href={new URL(item.url).pathname}>
												{item.text}
											</Link>
										);
									}
							  })
							: null}
					</nav>
					<nav className="flex flex-col gap-2">
						<h5 className="font-normal text-base text-gray md:mb-2">HfG Schwäbisch Gmünd</h5>
						{'footerExternal' in items && Array.isArray(items.footerExternal)
							? items.footerExternal.map((item: NavItem) => {
									if (item.popup === true) {
										return (
											<a target="_blank" key={item.id} href={item.url}>
												{item.text}
											</a>
										);
									} else {
										return (
											<Link key={item.id} href={item.url}>
												{item.text}
											</Link>
										);
									}
							  })
							: null}
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
