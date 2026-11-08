/**
 * Runs in <head>. A refresh opens the page at the top: the browser never restores the old
 * scroll position, and on a refresh a #section in the URL is dropped so it doesn't jump there.
 * (Turning restoration back on at any point makes the browser restore on the next refresh.)
 */
export const SCROLL_RESET_SCRIPT = `(function(){try{var h=history;h.scrollRestoration="manual";var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"&&location.hash)h.replaceState(h.state,"",location.pathname+location.search)}catch(e){}})()`
