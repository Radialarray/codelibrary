interface KQLRequest {
	url: string;
	auth: {
		username: string;
		password: string;
	};
	method: string;
	data: KQLRequestBody;
	redirect: string;
}

interface KQLRequestOptions {
	method: 'post';
	data: KQLRequestBody;
	redirect: 'follow';
}

interface KQLRequestBody {
	query: string;
	select: {
		url: true;
		title: true;
		navigation: 'site.navigation.toNavigationArray';
		courses?: boolean;
		codelanguages?: boolean;
		level?: boolean;
		categories?: boolean;
		headline?: boolean;
		intro?: boolean;
		content: 'page.content.main';
		images: {
			query: 'page.images';
			select: {
				url: true;
				filename: true;
				dimensions: true;
			};
		};
	};
	pagination?: {limit: number};
}

interface KQLResponse {
	code: number;
	result: {
		url: string;
		title: string;
		navigation: NavItem[];
		courses?: string;
		codelanguages?: string;
		level?: string;
		categories?: string;
		headline?: string;
		intro?: string;
		content: string;
		images: Image[];
	};
	status: string;
}

interface Page {
	meta: MetaInfo;
	content: Block[] | Layout[];
	images: Image[];
}

interface PageContent {
	content: Block[] | Layout[];
	meta: MetaInfo;
	images: Image[];
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
	children: array<object>;
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

interface Layout {
	attrs: [];
	columns: [
		{
			blocks: Block[];
			id: string;
			width: string;
		}
	];
	id: string;
}
