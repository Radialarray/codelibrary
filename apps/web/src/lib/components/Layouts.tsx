import * as R from 'ramda';
import {parseBlocks} from './Blocks';
import Grid from 'lib/components/layouts/Grid';
import {Key} from 'react';

const parseColumn = (x: {width: string; blocks: Block[]; id: Key | null | undefined}) => {
	const selectColumWidth = (width: string) => {
		switch (width) {
			case '1/2':
				return 'col-span-6';
			case '1/3':
				return 'col-span-4';
			default:
				return 'col-span-12';
		}
	};
	const columnWidth = selectColumWidth(x.width);

	const blockContent = parseBlocks(x.blocks);
	return (
		<div key={x.id} className={columnWidth}>
			{blockContent}
		</div>
	);
};

export const parseLayout = (x: Layout) => {
	const columns = x.columns.map(parseColumn);
	return <Grid key={x.id}>{columns}</Grid>;
};

// const decideLayoutBlock = R.ifElse(R.has('columns'), parseLayout, parseBlocks);
const decideLayoutBlock = (x: Layout | Block) => {
	if (x && 'columns' in x) {
		return parseLayout(x);
	} else {
		// return parseBlocks(x);
	}
};

export const parseContent = (content: PageContent['content']) => {
	// return R.map(decideLayoutBlock, content);
	return content.map(decideLayoutBlock);
	// return decideLayoutBlock(x);
};
