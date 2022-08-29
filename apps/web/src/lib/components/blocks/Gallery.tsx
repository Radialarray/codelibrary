import NextImage from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

/**
 * Creates a JSX.Element from a gallery block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Gallery = (props: Block): JSX.Element => {
	const slides = (props.content as GalleryContent).images.map(x => {
		return typeof x === 'object' ? (
			<SwiperSlide key={x.url}>
				<NextImage
					key={`${x.url}-img`}
					src={x.url ? x.url : ''}
					alt={x.filename}
					layout="intrinsic"
					width="500"
					height="200"
					objectFit="cover"
				/>
			</SwiperSlide>
		) : (
			<div>Error</div>
		);
	});

	return (
		<Swiper key={props.id} spaceBetween={50} slidesPerView={3}>
			{slides}
		</Swiper>
	);
};

export default Gallery;
