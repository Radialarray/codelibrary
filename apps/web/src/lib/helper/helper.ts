import * as R from 'ramda';
import sanitizeHtml from 'sanitize-html';
export const pipeWhileNotNil = R.pipeWith((f, res) => (R.isNil(res) ? res : f(res)));

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
 * Checks if value empty, if yes, make it null, else take the given value.
 */
export const ifEmpty = R.ifElse(
	R.isEmpty,
	() => null,
	x => x
);
