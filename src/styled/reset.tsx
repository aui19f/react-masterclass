import { css, createGlobalStyle } from "styled-components";

// prettier-ignore
export const reset = css`

/* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
*{
  box-sizing: border-box;
  font-family: 'Roboto', 'Nanum Gothic', sans-serif;
}


/**/

html, body, div, span, applet, object, iframe,
 p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video,
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
  border: 0;
  
  vertical-align: baseline;
}



/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a{
  text-decoration: none; outline: none
   :hover, :active, :visited {
    text-decoration: none
  }
}


`

export const Reset = createGlobalStyle`${reset}`;

export default reset;
