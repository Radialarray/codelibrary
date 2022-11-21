import {Swiper, SwiperSlide} from 'swiper/react';
import Image from './Image';
import 'swiper/css';

/**
 * Creates a JSX.Element from a gallery block.
 * @param {Block} props
 * @returns {JSX.Element}
 */
const Gallery = (props: Block): JSX.Element => {
	const slides = (props.content as GalleryContent).images.map(image => {
		return (
			<SwiperSlide key={image.id}>
				{
					// eslint-disable-next-line jsx-a11y/alt-text
					<Image {...image}></Image>
				}
			</SwiperSlide>
		);
	});

	return (
		<Swiper key={props.id} spaceBetween={50} slidesPerView={3}>
			{slides}
		</Swiper>
	);
};

export default Gallery;
