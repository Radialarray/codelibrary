import {proxy} from 'valtio';

export const scrollStore = proxy<{currentElement: string}>({
	currentElement: ''
});

export const updateElement = (nextElement: string) => {
	scrollStore.currentElement = nextElement;
};
