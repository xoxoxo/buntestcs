import React from "react";

import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import StyleWrapper from './styleWrapper';

export default function appWrapperServer() {

  let html;
  let styleTags;
  let sheet = new ServerStyleSheet();

  try {
    html = renderToString(sheet.collectStyles(<StyleWrapper>asdada</StyleWrapper>));
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
