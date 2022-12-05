import {proxy} from 'valtio';

type Status = 'open' | 'closed';

export const searchStore = proxy<{status: Status}>({
	status: 'closed'
});

export const toggleSearchOverlay = (nextStatus: Status) => {
	searchStore.status = nextStatus;
};
