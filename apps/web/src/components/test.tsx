import {remark} from 'remark';
import {remarkCodeHike} from '@code-hike/mdx';

async function main() {
	const file = await remark()
		.use(remarkCodeHike)
		.process('# Hi\n\n## Table of contents\n\n## Hello\n\n*Some* ~more~ _things_.');

	console.error(String(file));
}
main();
