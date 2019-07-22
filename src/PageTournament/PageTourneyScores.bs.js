// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE

import * as Cn from "re-classnames/src/Cn.bs.js";
import * as Css from "bs-css/src/Css.js";
import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Numeral from "numeral";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Tabs from "@reach/tabs";
import * as Data$Coronate from "../Data.bs.js";
import * as ReactFeather from "react-feather";
import * as Belt_MapString from "bs-platform/lib/es6/belt_MapString.js";
import * as Utils$Coronate from "../Utils.bs.js";
import * as Scoring$Coronate from "../Scoring.bs.js";
import * as VisuallyHidden from "@reach/visually-hidden";

var table = Css.style(/* :: */[
      Css.borderCollapse(/* collapse */-996847251),
      /* :: */[
        Css.unsafe("width", "min-content"),
        /* [] */0
      ]
    ]);

var topHeader = Css.style(/* :: */[
      Css.verticalAlign(/* bottom */-445061397),
      /* [] */0
    ]);

var compact = Css.style(/* [] */0);

var row = Css.style(/* :: */[
      Css.selector(":nth-of-type(even)", /* :: */[
            Css.backgroundColor(Utils$Coronate.PhotonColors[/* white_100 */71]),
            /* [] */0
          ]),
      /* :: */[
        Css.selector(":nth-of-type(odd)", /* :: */[
              Css.backgroundColor(Utils$Coronate.PhotonColors[/* grey_20 */50]),
              /* [] */0
            ]),
        /* [] */0
      ]
    ]);

var rowTd = Css.style(/* :: */[
      Css.borderWidth(/* `px */[
            25096,
            1
          ]),
      /* :: */[
        Css.borderColor(Utils$Coronate.PhotonColors[/* grey_40 */52]),
        /* :: */[
          Css.borderStyle(/* solid */12956715),
          /* [] */0
        ]
      ]
    ]);

var rowTh = Css.style(/* :: */[
      Css.borderBottomStyle(/* solid */12956715),
      /* :: */[
        Css.borderWidth(/* `px */[
              25096,
              1
            ]),
        /* :: */[
          Css.borderColor(Utils$Coronate.PhotonColors[/* grey_40 */52]),
          /* :: */[
            Css.backgroundColor(Utils$Coronate.PhotonColors[/* white_100 */71]),
            /* [] */0
          ]
        ]
      ]
    ]);

var playerName = Css.style(/* :: */[
      Css.textAlign(/* left */-944764921),
      /* :: */[
        Css.color(Utils$Coronate.PhotonColors[/* grey_90 */57]),
        /* [] */0
      ]
    ]);

var rank = Css.style(/* :: */[
      Css.textAlign(/* center */98248149),
      /* :: */[
        Css.color(Utils$Coronate.PhotonColors[/* grey_90 */57]),
        /* [] */0
      ]
    ]);

var number = Css.style(/* :: */[
      Css.padding(/* `px */[
            25096,
            4
          ]),
      /* [] */0
    ]);

var Style = /* module */[
  /* table */table,
  /* topHeader */topHeader,
  /* compact */compact,
  /* row */row,
  /* rowTd */rowTd,
  /* rowTh */rowTh,
  /* playerName */playerName,
  /* rank */rank,
  /* number */number
];

function PageTourneyScores$ScoreTable(Props) {
  var match = Props.isCompact;
  var isCompact = match !== undefined ? match : false;
  var tourney = Props.tourney;
  var getPlayer = Props.getPlayer;
  var title = Props.title;
  var tieBreaks = tourney[/* tieBreaks */6];
  var roundList = tourney[/* roundList */5];
  var tieBreakNames = Scoring$Coronate.getTieBreakNames(tieBreaks);
  var standingTree = Scoring$Coronate.createStandingTree(Scoring$Coronate.createStandingList(tieBreaks, Data$Coronate.Converters[/* matches2ScoreData */9](Data$Coronate.rounds2Matches(roundList, undefined, /* () */0))).filter((function (standing) {
              return standing[/* id */0] !== Data$Coronate.dummy_id;
            })));
  return React.createElement("table", {
              className: Cn.make(/* :: */[
                    table,
                    /* :: */[
                      Cn.ifTrue(compact, isCompact),
                      /* [] */0
                    ]
                  ])
            }, React.createElement("caption", {
                  className: Cn.make(/* :: */[
                        Cn.ifTrue("title-30", isCompact),
                        /* :: */[
                          Cn.ifTrue("title-40", !isCompact),
                          /* [] */0
                        ]
                      ])
                }, title), React.createElement("thead", undefined, React.createElement("tr", {
                      className: topHeader
                    }, React.createElement("th", {
                          className: "title-10",
                          scope: "col"
                        }, "Rank"), React.createElement("th", {
                          className: "title-10",
                          scope: "col"
                        }, "Name"), React.createElement("th", {
                          className: "title-10",
                          scope: "col"
                        }, "Score"), isCompact ? null : tieBreakNames.map((function (name, i) {
                              return React.createElement("th", {
                                          key: String(i),
                                          className: "title-10",
                                          scope: "col"
                                        }, name);
                            })))), React.createElement("tbody", undefined, standingTree.map((function (standingsFlat, rank$1) {
                        return standingsFlat.map((function (standing, i) {
                                      var match = i === 0;
                                      return React.createElement("tr", {
                                                  key: standing[/* id */0],
                                                  className: row
                                                }, match ? React.createElement("th", {
                                                        className: Cn.make(/* :: */[
                                                              "table__number",
                                                              /* :: */[
                                                                number,
                                                                /* :: */[
                                                                  rank,
                                                                  /* :: */[
                                                                    rowTh,
                                                                    /* [] */0
                                                                  ]
                                                                ]
                                                              ]
                                                            ]),
                                                        rowSpan: standingsFlat.length,
                                                        scope: "row"
                                                      }, String(rank$1 + 1 | 0)) : null, isCompact ? React.createElement("td", {
                                                        className: Cn.make(/* :: */[
                                                              rowTd,
                                                              /* :: */[
                                                                playerName,
                                                                /* [] */0
                                                              ]
                                                            ])
                                                      }, Curry._1(getPlayer, standing[/* id */0])[/* firstName */0], Utils$Coronate.Entities[/* nbsp */0], Curry._1(getPlayer, standing[/* id */0])[/* lastName */2]) : React.createElement("th", {
                                                        className: Cn.make(/* :: */[
                                                              rowTh,
                                                              /* :: */[
                                                                playerName,
                                                                /* [] */0
                                                              ]
                                                            ]),
                                                        scope: "row"
                                                      }, Curry._1(getPlayer, standing[/* id */0])[/* firstName */0], Utils$Coronate.Entities[/* nbsp */0], Curry._1(getPlayer, standing[/* id */0])[/* lastName */2]), React.createElement("td", {
                                                      className: Cn.make(/* :: */[
                                                            number,
                                                            /* :: */[
                                                              rowTd,
                                                              /* :: */[
                                                                "table__number",
                                                                /* [] */0
                                                              ]
                                                            ]
                                                          ])
                                                    }, Numeral.default(standing[/* score */1]).format("1/2")), isCompact ? null : standing[/* tieBreaks */2].map((function (score, j) {
                                                          return React.createElement("td", {
                                                                      key: String(j),
                                                                      className: Cn.make(/* :: */[
                                                                            rowTd,
                                                                            /* :: */[
                                                                              "table__number",
                                                                              /* [] */0
                                                                            ]
                                                                          ])
                                                                    }, Numeral.default(score).format("1/2"));
                                                        })));
                                    }));
                      }))));
}

var ScoreTable = /* module */[/* make */PageTourneyScores$ScoreTable];

function PageTourneyScores$SelectTieBreaks(Props) {
  var tourney = Props.tourney;
  var tourneyDispatch = Props.tourneyDispatch;
  var tieBreaks = tourney[/* tieBreaks */6];
  var match = React.useState((function () {
          return undefined;
        }));
  var setSelectedTb = match[1];
  var selectedTb = match[0];
  var defaultId = function (x) {
    if (x !== undefined) {
      return x;
    } else if (selectedTb !== undefined) {
      return selectedTb;
    } else {
      return 1;
    }
  };
  var toggleTb = function (id) {
    if (tieBreaks.includes(defaultId(id))) {
      Curry._1(tourneyDispatch, /* DelTieBreak */Block.__(1, [defaultId(id)]));
      return Curry._1(setSelectedTb, (function (param) {
                    return undefined;
                  }));
    } else {
      return Curry._1(tourneyDispatch, /* AddTieBreak */Block.__(0, [defaultId(id)]));
    }
  };
  var moveTb = function (direction) {
    if (selectedTb !== undefined) {
      var index = tieBreaks.indexOf(selectedTb);
      return Curry._1(tourneyDispatch, /* MoveTieBreak */Block.__(2, [
                    index,
                    index + direction | 0
                  ]));
    } else {
      return /* () */0;
    }
  };
  return React.createElement(Utils$Coronate.PanelContainer[/* make */0], {
              children: null,
              className: "content-area"
            }, React.createElement(Utils$Coronate.Panel[/* make */0], {
                  children: null
                }, React.createElement("div", {
                      className: "toolbar"
                    }, React.createElement("button", {
                          className: "button-micro",
                          disabled: selectedTb === undefined,
                          onClick: (function (param) {
                              return toggleTb(undefined);
                            })
                        }, "Toggle"), React.createElement("button", {
                          className: "button-micro",
                          disabled: selectedTb === undefined,
                          onClick: (function (param) {
                              return moveTb(-1);
                            })
                        }, React.createElement(ReactFeather.ArrowUp, { }), " Move up"), React.createElement("button", {
                          className: "button-micro",
                          disabled: selectedTb === undefined,
                          onClick: (function (param) {
                              return moveTb(1);
                            })
                        }, React.createElement(ReactFeather.ArrowDown, { }), " Move down"), React.createElement("button", {
                          className: Cn.make(/* :: */[
                                "button-micro",
                                /* :: */[
                                  Cn.ifSome("button-primary", selectedTb),
                                  /* [] */0
                                ]
                              ]),
                          disabled: selectedTb === undefined,
                          onClick: (function (param) {
                              return Curry._1(setSelectedTb, (function (param) {
                                            return undefined;
                                          }));
                            })
                        }, "Done")), React.createElement("table", undefined, React.createElement("caption", {
                          className: "title-30"
                        }, "Selected tiebreak methods"), React.createElement("thead", undefined, React.createElement("tr", undefined, React.createElement("th", undefined, "Name"), React.createElement("th", undefined, React.createElement(VisuallyHidden.default, {
                                      children: "Controls"
                                    })))), React.createElement("tbody", {
                          className: "content"
                        }, tieBreaks.map((function (id) {
                                var tmp;
                                if (selectedTb !== undefined) {
                                  var match = selectedTb === id;
                                  tmp = match ? "Done" : "Edit";
                                } else {
                                  tmp = "Edit";
                                }
                                return React.createElement("tr", {
                                            key: String(id),
                                            className: Cn.make(/* :: */[
                                                  Cn.ifTrue("selected", selectedTb === id),
                                                  /* [] */0
                                                ])
                                          }, React.createElement("td", undefined, Belt_Array.getExn(Scoring$Coronate.tieBreakMethods, id)[/* name */2]), React.createElement("td", {
                                                style: {
                                                  width: "48px"
                                                }
                                              }, React.createElement("button", {
                                                    className: "button-micro",
                                                    disabled: selectedTb !== undefined && selectedTb !== id,
                                                    onClick: (function (param) {
                                                        if (selectedTb !== undefined) {
                                                          var match = selectedTb === id;
                                                          if (match) {
                                                            return Curry._1(setSelectedTb, (function (param) {
                                                                          return undefined;
                                                                        }));
                                                          } else {
                                                            return Curry._1(setSelectedTb, (function (param) {
                                                                          return id;
                                                                        }));
                                                          }
                                                        } else {
                                                          return Curry._1(setSelectedTb, (function (param) {
                                                                        return id;
                                                                      }));
                                                        }
                                                      })
                                                  }, tmp)));
                              }))))), React.createElement(Utils$Coronate.Panel[/* make */0], {
                  children: null
                }, React.createElement("div", {
                      className: "toolbar"
                    }, Utils$Coronate.Entities[/* nbsp */0]), React.createElement("table", {
                      style: {
                        marginTop: "16px"
                      }
                    }, React.createElement("caption", {
                          className: "title-30"
                        }, "Available tiebreak methods"), React.createElement("thead", undefined, React.createElement("tr", undefined, React.createElement("th", undefined, "Name"), React.createElement("th", undefined, React.createElement(VisuallyHidden.default, {
                                      children: "Controls"
                                    })))), React.createElement("tbody", {
                          className: "content"
                        }, Scoring$Coronate.tieBreakMethods.map((function (m) {
                                var match = tieBreaks.includes(m[/* id */1]);
                                var match$1 = tieBreaks.includes(m[/* id */1]);
                                return React.createElement("tr", {
                                            key: String(m[/* id */1])
                                          }, React.createElement("td", undefined, React.createElement("span", {
                                                    className: match ? "disabled" : "enabled"
                                                  }, m[/* name */2])), React.createElement("td", undefined, match$1 ? null : React.createElement("button", {
                                                      className: "button-micro",
                                                      onClick: (function (param) {
                                                          return toggleTb(m[/* id */1]);
                                                        })
                                                    }, "Add")));
                              }))))));
}

var SelectTieBreaks = /* module */[/* make */PageTourneyScores$SelectTieBreaks];

function PageTourneyScores(Props) {
  var tournament = Props.tournament;
  var tourney = tournament[/* tourney */7];
  var tourneyDispatch = tournament[/* tourneyDispatch */8];
  return React.createElement(Tabs.Tabs, {
              children: null
            }, React.createElement(Tabs.TabList, {
                  children: null
                }, React.createElement(Tabs.Tab, {
                      children: null
                    }, React.createElement(ReactFeather.List, { }), " Scores"), React.createElement(Tabs.Tab, {
                      children: null
                    }, React.createElement(ReactFeather.Settings, { }), " Edit tiebreak rules")), React.createElement(Tabs.TabPanels, {
                  children: null
                }, React.createElement(Tabs.TabPanel, {
                      children: React.createElement(PageTourneyScores$ScoreTable, {
                            tourney: tourney,
                            getPlayer: tournament[/* getPlayer */1],
                            title: "Score detail"
                          })
                    }), React.createElement(Tabs.TabPanel, {
                      children: React.createElement(PageTourneyScores$SelectTieBreaks, {
                            tourney: tourney,
                            tourneyDispatch: tourneyDispatch
                          })
                    })));
}

function PageTourneyScores$Crosstable(Props) {
  var tournament = Props.tournament;
  var tourney = tournament[/* tourney */7];
  var getPlayer = tournament[/* getPlayer */1];
  var scoreData = Data$Coronate.Converters[/* matches2ScoreData */9](Data$Coronate.rounds2Matches(tourney[/* roundList */5], undefined, /* () */0));
  var standings = Scoring$Coronate.createStandingList(tourney[/* tieBreaks */6], scoreData);
  var getXScore = function (player1Id, player2Id) {
    if (player1Id === player2Id) {
      return React.createElement(ReactFeather.X, {
                  className: "disabled"
                });
    } else {
      var match = Belt_MapString.get(scoreData, player1Id);
      if (match !== undefined) {
        var match$1 = Belt_MapString.get(match[/* opponentResults */4], player2Id);
        if (match$1 !== undefined) {
          return Numeral.default(match$1).format("1/2");
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  };
  var getRatingChangeTds = function (playerId) {
    var firstRating = Belt_MapString.getExn(scoreData, playerId)[/* firstRating */6];
    var match = Belt_MapString.getExn(scoreData, playerId)[/* ratings */5];
    var lastRating = match ? match[0] : firstRating;
    var change = Numeral.default(lastRating - firstRating).format("+0");
    return React.createElement(React.Fragment, undefined, React.createElement("td", {
                    className: Cn.make(/* :: */[
                          rowTd,
                          /* :: */[
                            "table__number",
                            /* [] */0
                          ]
                        ])
                  }, lastRating.toString()), React.createElement("td", {
                    className: Cn.make(/* :: */[
                          rowTd,
                          /* :: */[
                            "table__number body-10",
                            /* [] */0
                          ]
                        ])
                  }, change));
  };
  return React.createElement("table", {
              className: table
            }, React.createElement("caption", undefined, "Crosstable"), React.createElement("thead", undefined, React.createElement("tr", undefined, React.createElement("th", undefined, "#"), React.createElement("th", undefined, "Name"), standings.map((function (param, rank) {
                            return React.createElement("th", {
                                        key: String(rank)
                                      }, String(rank + 1 | 0));
                          })), React.createElement("th", undefined, "Score"), React.createElement("th", {
                          colSpan: 2
                        }, "Rating"))), React.createElement("tbody", undefined, standings.map((function (standing, index) {
                        return React.createElement("tr", {
                                    key: String(index),
                                    className: row
                                  }, React.createElement("th", {
                                        className: Cn.make(/* :: */[
                                              rowTh,
                                              /* :: */[
                                                rank,
                                                /* [] */0
                                              ]
                                            ]),
                                        scope: "col"
                                      }, String(index + 1 | 0)), React.createElement("th", {
                                        className: Cn.make(/* :: */[
                                              rowTh,
                                              /* :: */[
                                                playerName,
                                                /* [] */0
                                              ]
                                            ]),
                                        scope: "row"
                                      }, Curry._1(getPlayer, standing[/* id */0])[/* firstName */0], Utils$Coronate.Entities[/* nbsp */0], Curry._1(getPlayer, standing[/* id */0])[/* lastName */2]), standings.map((function (opponent, index2) {
                                          return React.createElement("td", {
                                                      key: String(index2),
                                                      className: Cn.make(/* :: */[
                                                            rowTd,
                                                            /* :: */[
                                                              "table__number",
                                                              /* [] */0
                                                            ]
                                                          ])
                                                    }, getXScore(standing[/* id */0], opponent[/* id */0]));
                                        })), React.createElement("td", {
                                        className: Cn.make(/* :: */[
                                              rowTd,
                                              /* :: */[
                                                "table__number",
                                                /* [] */0
                                              ]
                                            ])
                                      }, Numeral.default(standing[/* score */1]).format("1/2")), getRatingChangeTds(standing[/* id */0]));
                      }))));
}

var Crosstable = /* module */[/* make */PageTourneyScores$Crosstable];

var make = PageTourneyScores;

export {
  Style ,
  ScoreTable ,
  SelectTieBreaks ,
  make ,
  Crosstable ,
  
}
/* table Not a pure module */