// Generated by BUCKLESCRIPT VERSION 6.0.3, PLEASE EDIT WITH CARE

import * as React from "react";
import * as SimpleIcons from "simple-icons";

function Icons$SimpleIcon(Props) {
  var icon = Props.icon;
  return React.createElement("span", {
              "aria-label": icon.title,
              role: "img",
              style: {
                fill: "#" + icon.hex
              },
              dangerouslySetInnerHTML: {
                __html: icon.svg
              }
            });
}

var SimpleIcon = /* module */[/* make */Icons$SimpleIcon];

function Icons$JavaScript(Props) {
  return React.createElement(Icons$SimpleIcon, {
              icon: SimpleIcons.javascript
            });
}

var JavaScript = /* module */[/* make */Icons$JavaScript];

function Icons$ReactIcon(Props) {
  return React.createElement(Icons$SimpleIcon, {
              icon: SimpleIcons.react
            });
}

var ReactIcon = /* module */[/* make */Icons$ReactIcon];

function Icons$Close(Props) {
  return React.createElement("svg", {
              height: "11",
              width: "11",
              fill: "none",
              viewBox: "0 0 11 11",
              xmlns: "http://www.w3.org/2000/svg"
            }, React.createElement("path", {
                  d: "M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z",
                  fill: "#000"
                }));
}

var Close = /* module */[/* make */Icons$Close];

function Icons$Maximize(Props) {
  return React.createElement("svg", {
              height: "11",
              width: "11",
              fill: "none",
              viewBox: "0 0 11 11",
              xmlns: "http://www.w3.org/2000/svg"
            }, React.createElement("path", {
                  d: "M11 0v11H0V0h11zM9.899 1.101H1.1V9.9H9.9V1.1z",
                  fill: "#000"
                }));
}

var Maximize = /* module */[/* make */Icons$Maximize];

function Icons$Minimize(Props) {
  return React.createElement("svg", {
              height: "11",
              width: "11",
              fill: "none",
              viewBox: "0 0 11 11",
              xmlns: "http://www.w3.org/2000/svg"
            }, React.createElement("path", {
                  d: "M11 4.399V5.5H0V4.399h11z",
                  fill: "#000"
                }));
}

var Minimize = /* module */[/* make */Icons$Minimize];

function Icons$Restore(Props) {
  return React.createElement("svg", {
              height: "11",
              width: "11",
              fill: "none",
              viewBox: "0 0 11 11",
              xmlns: "http://www.w3.org/2000/svg"
            }, React.createElement("path", {
                  d: "M11 8.798H8.798V11H0V2.202h2.202V0H11v8.798zm-3.298-5.5h-6.6v6.6h6.6v-6.6zM9.9 1.1H3.298v1.101h5.5v5.5h1.1v-6.6z",
                  fill: "#000"
                }));
}

var Restore = /* module */[/* make */Icons$Restore];

export {
  SimpleIcon ,
  JavaScript ,
  ReactIcon ,
  Close ,
  Maximize ,
  Minimize ,
  Restore ,
  
}
/* react Not a pure module */