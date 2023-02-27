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
