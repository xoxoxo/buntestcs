import React from "react";

import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";


export default function appWrapperServer() {
  let sheet = new ServerStyleSheet();

  let html;
  let styleTags;
  try {
    // html = renderToString(<div>asdada</div>);
    html = renderToString(sheet.collectStyles(<div>asdada</div>));
    styleTags = sheet.getStyleTags();
  } catch (error) {
    console.log(error)
    return { error: error };
  } finally {
    sheet.seal();
  }

  return {
    html: html,
    styleTags: styleTags,
  };
}
