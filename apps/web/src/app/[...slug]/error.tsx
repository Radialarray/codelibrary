'use client';

import Link from 'next/link';

export default function Error({reset}: {error: Error; reset: () => void}) {
	return (
		<div>
			<h2>Something went wrong!</h2>
			<p>Is your page visible in Kirby?</p>
			<button onClick={() => reset()}>Try again</button>
			<Link href="/">Go to home.</Link>
		</div>
	);
}
