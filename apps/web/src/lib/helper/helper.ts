import sanitizeHtml from 'sanitize-html';

// Dompurify Options
const sanitizeDefaultOptions = {
	allowedTags: ['b', 'i', 'em', 'strong', 'a', 'code', 'li', 'br', 'p'],
	allowedAttributes: {a: ['href']}
};
/**
 * Given dirty html, returns sanitized html.
 * @param dirty
 * @param options
 * @returns
 */
export const sanitize = (dirty: string, options?: object) => ({
	__html: sanitizeHtml(dirty, {...sanitizeDefaultOptions, ...options})
});

/**
 * Finds elements in an array and returns them.
 * @param arr
 * @param value
 * @returns
 */
export const findElementByValue = (arr: unknown[], value: unknown) => {
	if (!Array.isArray(arr)) return null;
	for (let i = 0; i < arr.length; i++) {
		const objValues = Object.values(arr[i]);
		if (objValues.includes(value)) {
			return arr[i];
		}
	}
	return null; // return null if element is not found
};

/**
 *
 * @param stringToSplit
 * @returns
 */
export const splitString = (stringToSplit: string): string[] | null => {
	if (stringToSplit && stringToSplit.length > 0) {
		const splitString = stringToSplit.split(',');
		return splitString.map(item => item.trim());
	} else {
		return null;
	}
};
