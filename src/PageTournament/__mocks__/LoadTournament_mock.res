open Belt
open Data
module Id = Data.Id

let log2 = num => log(num) /. log(2.0)

let tournamentData = TestData.tournaments

let calcNumOfRounds = playerCount => {
  let roundCount = playerCount->float_of_int->log2->ceil
  roundCount != neg_infinity ? int_of_float(roundCount) : 0
}

let tournamentReducer = (_, action) => action

type t = LoadTournament.t = {
  activePlayers: Data.Id.Map.t<Data.Player.t>,
  getPlayer: Data.Id.t => Data.Player.t,
  isItOver: bool,
  isNewRoundReady: bool,
  players: Data.Id.Map.t<Data.Player.t>,
  playersDispatch: Db.action<Data.Player.t> => unit,
  roundCount: int,
  tourney: Data.Tournament.t,
  setTourney: Data.Tournament.t => unit,
}

@react.component
let make = (~children, ~tourneyId, ~windowDispatch as _=?) => {
  let (tourney, setTourney) = React.useReducer(
    tournamentReducer,
    Map.getExn(tournamentData, tourneyId),
  )
  let {Tournament.playerIds: playerIds, roundList, _} = tourney
  let {Db.items: players, dispatch: playersDispatch, _} = Db.useAllPlayers()
  /* `activePlayers` is only players to be matched in future matches. */
  let activePlayers = Map.keep(players, (id, _) => playerIds->List.has(id, Id.eq))
  let roundCount = activePlayers->Map.size->calcNumOfRounds
  let isItOver = Data.Rounds.size(roundList) >= roundCount
  let isNewRoundReady =
    Data.Rounds.size(roundList) == 0
      ? true
      : Rounds.isRoundComplete(roundList, activePlayers, Data.Rounds.size(roundList) - 1)

  children({
    activePlayers: activePlayers,
    getPlayer: Player.getMaybe(players),
    isItOver: isItOver,
    isNewRoundReady: isNewRoundReady,
    players: players,
    playersDispatch: playersDispatch,
    roundCount: roundCount,
    tourney: tourney,
    setTourney: setTourney,
  })
}

type roundData = LoadTournament.roundData = {
  activePlayersCount: int,
  scoreData: Data.Id.Map.t<Scoring.t>,
  unmatched: Data.Id.Map.t<Data.Player.t>,
  unmatchedCount: int,
  unmatchedWithDummy: Data.Id.Map.t<Data.Player.t>,
}

let useRoundData = (roundId, {tourney: {roundList, scoreAdjustments, _}, activePlayers, _}) => {
  /* tournament2ScoreData is relatively expensive */
  let scoreData = React.useMemo2(
    () => Converters.tournament2ScoreData(~roundList, ~scoreAdjustments),
    (roundList, scoreAdjustments),
  )
  /* Only calculate unmatched players for the latest round. Old rounds
     don't get to add new players.
     Should this be memoized? */
  let isThisTheLastRound = roundId == Rounds.getLastKey(roundList)
  let unmatched = switch (Rounds.get(roundList, roundId), isThisTheLastRound) {
  | (Some(round), true) =>
    let matched = Rounds.Round.getMatched(round)
    Map.removeMany(activePlayers, matched)
  | _ => Data.Id.Map.make()
  }
  let unmatchedCount = Map.size(unmatched)
  /* make a new list so as not to affect auto-pairing */
  let unmatchedWithDummy =
    mod(unmatchedCount, 2) != 0 ? Map.set(unmatched, Data.Id.dummy, Player.dummy) : unmatched
  let activePlayersCount = Map.size(activePlayers)
  {
    activePlayersCount: activePlayersCount,
    scoreData: scoreData,
    unmatched: unmatched,
    unmatchedCount: unmatchedCount,
    unmatchedWithDummy: unmatchedWithDummy,
  }
}
