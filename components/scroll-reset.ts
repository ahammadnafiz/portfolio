/**
 * Runs in <head>, before Next.js loads. A refresh opens the page at the top: the browser never
 * restores the old scroll position, and on a refresh a #section in the URL is dropped so it
 * doesn't jump there. (Turning restoration back on at any point makes the browser restore on the
 * next refresh.)
 *
 * With the browser's restoration off, Back and Forward would land at the top too, so the position
 * of each page is kept here instead: saved just before leaving it (pushState, popstate, pagehide)
 * and put back on Back/Forward. It must run before Next.js, which keeps its own copy of pushState.
 */
export const SCROLL_RESET_SCRIPT = `(function(){try{
var h=history,K="scroll-pos",n=performance.getEntriesByType("navigation")[0];
h.scrollRestoration="manual";
if(n&&n.type==="reload"&&location.hash)h.replaceState(h.state,"",location.pathname+location.search);
function key(){return location.pathname+location.search+location.hash}
function all(){try{return JSON.parse(sessionStorage.getItem(K))||{}}catch(e){return{}}}
function save(k){var m=all();m[k]=scrollY;try{sessionStorage.setItem(K,JSON.stringify(m))}catch(e){}}
var cur=key(),run=0;
function restore(){var y=all()[cur];if(y==null)return;var t=Date.now(),r=++run;
(function go(){if(r!==run)return;if(Math.abs(scrollY-y)>1)scrollTo({top:y,behavior:"instant"});if(Date.now()-t<700)requestAnimationFrame(go)})()}
["wheel","touchstart","keydown"].forEach(function(e){addEventListener(e,function(){run++},{passive:true})});
var push=h.pushState,rep=h.replaceState;
h.pushState=function(){save(cur);var r=push.apply(h,arguments);cur=key();return r};
h.replaceState=function(){var r=rep.apply(h,arguments);cur=key();return r};
addEventListener("popstate",function(){save(cur);cur=key();restore()});
addEventListener("pagehide",function(){save(cur)});
if(n&&n.type==="back_forward")restore();
}catch(e){}})()`
