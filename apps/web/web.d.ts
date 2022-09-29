interface KQLResponse {
	code: number;
	message?: string;
	result?: {
		images: array;
		url: string;
		title: string;
		navigation: Array;
		courses?: string;
		codelanguages?: string;
		level?: string;
		categories?: string;
		headline?: string;
		intro?: string;
		content?: string;
	};
}

interface KQLResponseBlock {
	content: {text?: string};
	id: string;
	isHidden: string;
	type: string;
}

interface Page {
	meta: {};
	content: [];
	images: [];
}

interface PageContent {
	content: Block[];
	meta: MetaInfo;
}

interface Block {
	content: Content;
	id: string;
	isHidden: boolean;
	type: string;
}

type Content =
	| TextContent
	| ImageContent
	| CodeContent
	| QuoteContent
	| VideoContent
	| GalleryContent
	| KQLGalleryBlock;

/**
 * Used for TextContents like pure text and also headings,
 * which have an optional level key.
 */
interface TextContent {
	text: string;
	level?: string;
}

interface ImageContent {
	location: string;
	image: Array;
	src: string;
	alt: string;
	caption: string;
	link: string;
	crop: string;
	width: number;
	height: number;
	ratio: number;
	orientation: string;
}

interface CodeContent {
	code: string;
	language: string;
}

interface QuoteContent {
	text: string;
	citation: string;
}

interface VideoContent {
	url: string;
	caption: string;
}

interface GalleryContent {
	images: Block[];
}

interface KQLGalleryBlock {
	images: string[];
}

interface Image {
	dimensions: {
		width: number;
		height: number;
		ratio: number;
		orientation: string;
	};
	url: string;
	filename: string;
}

interface NavItem {
	id: string;
	url: string;
	text: string;
	title: string;
	popup: string;
	isOpen: string;
	children: Array<object>;
}

interface MetaInfo {
	url: string;
	title: string;
	navigation: Array<NavItem>;
	courses: string;
	codeLanguages: string;
	level: string;
	categories: string;
	headline: string;
	intro: string;
}
