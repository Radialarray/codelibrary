'use client';
import NextImage from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.css';

/**
 * Creates a JSX.Element from a gallery block.
 * @param {Block} props
 * @returns {JSX.Element}
 */
const Gallery = (props: Block): JSX.Element => {
	const slides = (props.content as GalleryContent).images.map(image => {
		return (
			<SwiperSlide key={image}>
				<NextImage src={image} alt={image} width="300" height="300" />
			</SwiperSlide>
		);
	});

	return (
		<Swiper key={props.id} spaceBetween={10} slidesPerView={5}>
			{slides}
		</Swiper>
	);
};

export default Gallery;
