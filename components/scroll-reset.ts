/**
 * Runs in <head> before paint. On a page refresh (only), drop any #section from the URL and
 * start at the top, instead of jumping back to the section or the old scroll position.
 * Normal links to /#work still scroll to that section.
 */
export const SCROLL_RESET_SCRIPT = `(function(){try{var n=performance.getEntriesByType("navigation")[0];if(!n||n.type!=="reload")return;history.scrollRestoration="manual";if(location.hash)history.replaceState(history.state,"",location.pathname+location.search);addEventListener("load",function(){scrollTo(0,0);history.scrollRestoration="auto"})}catch(e){}})()`
