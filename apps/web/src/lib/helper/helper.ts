import * as R from 'ramda';
import DOMPurify from 'isomorphic-dompurify';

export const pipeWhileNotNil = R.pipeWith((f, res) => (R.isNil(res) ? res : f(res)));

// Dompurify Options
const dompurifyDefaultOptions = {
	ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'code', 'li', 'br', 'p'],
	ALLOWED_ATTR: ['href']
};

/**
 * Given dirty html, returns sanitized html.
 * @param dirty
 * @param options
 * @returns
 */
export const sanitize = (dirty: string, options?: object) => ({
	__html: DOMPurify.sanitize(dirty, {...dompurifyDefaultOptions, ...options})
});

/**
 * Checks if value empty, if yes, make it null, else take the given value.
 */
export const ifEmpty = R.ifElse(
	R.isEmpty,
	x => null,
	x => x
);
