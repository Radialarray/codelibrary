import NextImage from 'next/image';

interface Props {
	meta: MetaInfo;
	home: boolean;
}

const Banner = ({meta, home}: Props): JSX.Element => {
	if (home === true) {
		return (
			<div className="relative z-0 w-full h-[300px] md:h-[500px]">
				<NextImage
					src={meta.banner.url}
					width={'1200'}
					height={'200'}
					alt={meta.banner.filename}
					priority={true}
					className="object-cover h-full w-full"
				></NextImage>
			</div>
		);
	} else if (meta.banner && meta.banner.url) {
		return (
			<div className="relative z-0 w-full h-[300px] md:h-[500px]">
				<NextImage
					src={meta.banner.url}
					width={'1200'}
					height={'200'}
					alt={meta.banner.filename}
					priority={true}
					className="grayscale object-cover h-full w-full"
				></NextImage>
				<div className="absolute top-0 left-0 w-full h-full bg-highlight mix-blend-multiply"></div>
			</div>
		);
	} else {
		return (
			<div className="relative w-full h-[300px] md:h-[500px]">
				<div className="absolute top-0 left-0 w-full h-full bg-highlight mix-blend-multiply"></div>
			</div>
		);
	}
};

export default Banner;
