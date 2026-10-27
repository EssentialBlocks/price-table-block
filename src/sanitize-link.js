/**
 * URL schemes that run script when a link is followed. Every other scheme,
 * including app links such as whatsapp: or skype:, is kept.
 */
const BLOCKED_SCHEMES = ["javascript", "vbscript", "data"];

/**
 * Returns "#" when the link would run script, and the link unchanged
 * otherwise. Other links are not normalised, so saved markup for
 * existing blocks stays the same.
 *
 * @param {string} link
 * @returns {string}
 */
export default function sanitizeLink(link) {
	if (typeof link !== "string") {
		return "";
	}
	// Browsers ignore leading/trailing control characters and spaces, and
	// tabs or newlines anywhere, when they read a URL's scheme.
	const normalised = link
		.replace(/^[\u0000- ]+|[\u0000- ]+$/g, "")
		.replace(/[\t\n\r]/g, "");
	const scheme = normalised.match(/^([a-z][a-z0-9+.-]*):/i);
	if (scheme && BLOCKED_SCHEMES.includes(scheme[1].toLowerCase())) {
		return "#";
	}
	return link;
}
