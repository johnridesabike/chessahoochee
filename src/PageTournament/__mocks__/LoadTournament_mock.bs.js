// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Map from "bs-platform/lib/es6/belt_Map.js";
import * as Belt_Set from "bs-platform/lib/es6/belt_Set.js";
import * as Pervasives from "bs-platform/lib/es6/pervasives.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Db$Coronate from "../../Db.bs.js";
import * as Data_Id$Coronate from "../../Data/Data_Id.bs.js";
import * as TestData$Coronate from "../../testdata/TestData.bs.js";
import * as Data_Player$Coronate from "../../Data/Data_Player.bs.js";
import * as Data_Rounds$Coronate from "../../Data/Data_Rounds.bs.js";
import * as Data_Converters$Coronate from "../../Data/Data_Converters.bs.js";

function log2(num) {
  return Math.log(num) / Math.log(2.0);
}

function calcNumOfRounds(playerCount) {
  var roundCount = Math.ceil(log2(playerCount));
  if (roundCount !== Pervasives.neg_infinity) {
    return roundCount | 0;
  } else {
    return 0;
  }
}

function tournamentReducer(param, action) {
  return action;
}

function LoadTournament_mock(Props) {
  var children = Props.children;
  var tourneyId = Props.tourneyId;
  var match = React.useReducer(tournamentReducer, Belt_Map.getExn(TestData$Coronate.tournaments, tourneyId));
  var tourney = match[0];
  var roundList = tourney.roundList;
  var playerIds = tourney.playerIds;
  var match$1 = Db$Coronate.useAllPlayers(undefined);
  var players = match$1.items;
  var activePlayers = Belt_Map.keep(players, (function (id, param) {
          return Belt_Set.has(playerIds, id);
        }));
  var roundCount = calcNumOfRounds(Belt_Map.size(activePlayers));
  var isItOver = Data_Rounds$Coronate.size(roundList) >= roundCount;
  var isNewRoundReady = Data_Rounds$Coronate.size(roundList) === 0 ? true : Data_Rounds$Coronate.isRoundComplete(roundList, activePlayers, Data_Rounds$Coronate.size(roundList) - 1 | 0);
  return Curry._1(children, {
              activePlayers: activePlayers,
              getPlayer: (function (param) {
                  return Data_Player$Coronate.getMaybe(players, param);
                }),
              isItOver: isItOver,
              isNewRoundReady: isNewRoundReady,
              players: players,
              playersDispatch: match$1.dispatch,
              roundCount: roundCount,
              tourney: tourney,
              setTourney: match[1]
            });
}

function useRoundData(roundId, param) {
  var match = param.tourney;
  var roundList = match.roundList;
  var scoreAdjustments = match.scoreAdjustments;
  var activePlayers = param.activePlayers;
  var scoreData = React.useMemo((function () {
          return Data_Converters$Coronate.tournament2ScoreData(roundList, scoreAdjustments);
        }), [
        roundList,
        scoreAdjustments
      ]);
  var isThisTheLastRound = roundId === Data_Rounds$Coronate.getLastKey(roundList);
  var match$1 = Data_Rounds$Coronate.get(roundList, roundId);
  var unmatched;
  if (match$1 !== undefined && isThisTheLastRound) {
    var matched = Data_Rounds$Coronate.Round.getMatched(Caml_option.valFromOption(match$1));
    unmatched = Belt_Map.removeMany(activePlayers, matched);
  } else {
    unmatched = Belt_Map.make(Data_Id$Coronate.id);
  }
  var unmatchedCount = Belt_Map.size(unmatched);
  var unmatchedWithDummy = unmatchedCount % 2 !== 0 ? Belt_Map.set(unmatched, Data_Id$Coronate.dummy, Data_Player$Coronate.dummy) : unmatched;
  var activePlayersCount = Belt_Map.size(activePlayers);
  return {
          activePlayersCount: activePlayersCount,
          scoreData: scoreData,
          unmatched: unmatched,
          unmatchedCount: unmatchedCount,
          unmatchedWithDummy: unmatchedWithDummy
        };
}

var make = LoadTournament_mock;

export {
  make ,
  useRoundData ,
  
}
/* react Not a pure module */
