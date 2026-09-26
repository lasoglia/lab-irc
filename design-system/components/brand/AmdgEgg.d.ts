/**
 * Hidden full-screen "A · M · D · G — Ad maiorem Dei gloria" reveal. Mount once per page (it renders
 * nothing until triggered). Triggers: typing the secret word, N quick clicks on any [data-amdg-trigger]
 * element (e.g. the logo), or dispatching `new Event('lab:amdg')` on window. Also logs a hint in the console.
 */
export interface AmdgEggProps {
  /** Word to type to reveal — default "amdg" */
  secret?: string;
  /** Clicks on a [data-amdg-trigger] element within 1.618s — default 7 */
  clicks?: number;
  /** Auto-close after ms — default 6180 */
  duration?: number;
}
