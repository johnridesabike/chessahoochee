// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE

import * as React from "react";
import * as ReactDOMRe from "reason-react/src/ReactDOMRe.js";
import * as App$Coronate from "./App.bs.js";
import * as ServiceWorker from "./serviceWorker";

((require("./styles")));

ReactDOMRe.renderToElementWithId(React.createElement(App$Coronate.make, { }), "root");

function unregister(prim) {
  ServiceWorker.unregister();
  return /* () */0;
}

var ServiceWorker$1 = /* module */[/* unregister */unregister];

ServiceWorker.unregister();

export {
  ServiceWorker$1 as ServiceWorker,
  
}
/*  Not a pure module */