interface KQLResponse {
	code: number;
	message?: string;
	result?: {
		url: string;
		title: string;
		courses?: string;
		codeLanguages?: string;
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

interface PageContent {
	meta: object;
	content: Array;
}

type Block = {
	content: object;
	id: string;
	isHidden: boolean;
	type: string;
};
