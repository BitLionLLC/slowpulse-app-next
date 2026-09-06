/** Applies the stored theme before first paint.
 *
 * This has to run as a blocking inline script in <head>: React hydration
 * happens after the browser has already painted, so resolving the theme in
 * a component means a flash of the wrong palette on every load. The script
 * only writes the class when the user has actually overridden the system —
 * unset falls through to `matchMedia`, which is the documented default. */
const script = `(function(){try{var t=localStorage.getItem("slowpulse-theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
