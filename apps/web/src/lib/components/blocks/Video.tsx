'use client';

import dynamic from 'next/dynamic';
// import ReactPlayer from 'react-player/lazy';
// Dynamic import so that no render mismatch happens, because reactplayer uses window right now, so no serverside rendering for this component.
const ReactPlayer = dynamic(() => import('react-player/lazy'), {ssr: false});

/**
 * Creates a JSX.Element from a video block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Video = (props: Block): JSX.Element => {
	return <ReactPlayer key={props.id} url={(props.content as VideoContent).url} />;
};

export default Video;
