import * as R from 'ramda';
import {parseBlocks} from './Blocks';
import Grid from 'lib/components/layouts/Grid';
import {Key} from 'react';

const parseColumn = (x: {width: string; blocks: Block[]; id: Key | null | undefined}) => {
	const selectColumWidth = R.cond([
		[R.equals('1/2'), R.always('col-span-6')],
		[R.equals('1/3'), R.always('col-span-4')],
		[R.T, R.always('col-span-12')]
	]);
	const columnWidth = selectColumWidth(x.width);

	const blockContent = parseBlocks(x.blocks);
	return (
		<div key={x.id} className={columnWidth}>
			{blockContent}
		</div>
	);
};

export const parseLayout = (x: Layout) => {
	const columns = R.map(parseColumn, x.columns);
	return <Grid>{columns}</Grid>;
};

// const decideLayoutBlock = R.ifElse(R.has('columns'), parseLayout, parseBlocks);
const decideLayoutBlock = (x: Layout[] | Block[]) => {
	if ('columns' in x) {
		return parseLayout(x);
	} else {
		return parseBlocks(x as Block[]);
	}
};

export const parseContent = (x: Layout[] | Block[]) => {
	// return R.map(decideLayoutBlock, x);
	return decideLayoutBlock(x);
};
