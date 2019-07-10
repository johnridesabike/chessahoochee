open Data.Player;
let s = React.string;
let sortName = Hooks.KeyString(firstNameGet);
let sortRating = Hooks.KeyInt(ratingGet);
let sortMatchCount = Hooks.KeyInt(matchCountGet);

let defaultFirstName = _ => "";
let defaultLastName = _ => "";
let defaultRating = _ => 1200;

module NewPlayerForm = {
  [@react.component]
  let make = (~dispatch) => {
    let (firstName, setFirstName) = React.useState(defaultFirstName);
    let (lastName, setLastName) = React.useState(defaultLastName);
    let (rating, setRating) = React.useState(defaultRating);
    let handleSubmit = event => {
      event->ReactEvent.Form.preventDefault;
      setFirstName(defaultFirstName);
      setLastName(defaultLastName);
      setRating(defaultRating);
      let id = Utils.nanoid();
      dispatch(
        Hooks.Db.SetItem(
          id,
          t(
            ~firstName,
            ~lastName,
            ~rating,
            ~id,
            ~type_="person",
            ~matchCount=0,
          ),
        ),
      );
    };

    let updateField = event => {
      event->ReactEvent.Form.preventDefault;
      let name = event->ReactEvent.Form.currentTarget##name;
      let value = event->ReactEvent.Form.currentTarget##value;
      switch (name) {
      | "firstName" => setFirstName(_ => value)
      | "lastName" => setLastName(_ => value)
      | "rating" => setRating(_ => int_of_string(value))
      | _ => ()
      };
    };

    <form onSubmit=handleSubmit>
      <fieldset>
        <legend> {s("Register a new player")} </legend>
        <p>
          <label htmlFor="firstName"> {s("First name")} </label>
          <input
            name="firstName"
            type_="text"
            value=firstName
            required=true
            onChange=updateField
          />
        </p>
        <p>
          <label htmlFor="lastName"> {s("Last name")} </label>
          <input
            name="lastName"
            type_="text"
            value=lastName
            required=true
            onChange=updateField
          />
        </p>
        <p>
          <label htmlFor="rating"> {s("Rating")} </label>
          <input
            name="rating"
            type_="number"
            value={rating->string_of_int}
            required=true
            onChange=updateField
          />
        </p>
        <p> <input type_="submit" value="Add" /> </p>
      </fieldset>
    </form>;
  };
};

module List = {
  [@react.component]
  let make =
      (~sorted, ~sortDispatch, ~players, ~playersDispatch, ~optionsDispatch) => {
    let (isDialogOpen, setIsDialogOpen) = React.useState(() => false);
    let (_, windowDispatch) = Window.useWindowContext();
    React.useEffect1(
      () => {
        windowDispatch(Window.SetTitle("Players"));
        Some(() => windowDispatch(Window.SetTitle("")));
      },
      [|windowDispatch|],
    );
    let delPlayer = (event, id) => {
      ReactEvent.Mouse.preventDefault(event);
      let playerOpt = players->Belt.Map.String.get(id);
      switch (playerOpt) {
      | None => ()
      | Some(player) =>
        let message =
          [|
            "Are you sure you want to delete ",
            player->firstNameGet,
            " ",
            player->lastNameGet,
            "?",
          |]
          |> Js.Array.joinWith("");
        if (Utils.confirm(message)) {
          playersDispatch(Hooks.Db.DelItem(id));
          optionsDispatch(Hooks.Db.DelAvoidSingle(id));
        };
      };
    };
    <div className="content-area">
      <div className="toolbar toolbar__left">
        <button onClick={_ => setIsDialogOpen(_ => true)}>
          <Icons.userPlus />
          {s(" Add a new player")}
        </button>
      </div>
      <table className="players__table">
        <caption> {s("Player roster")} </caption>
        <thead>
          <tr>
            <th>
              <Hooks.SortButton
                data=sorted dispatch=sortDispatch sortKey=sortName>
                {s("Name")}
              </Hooks.SortButton>
            </th>
            <th>
              <Hooks.SortButton
                data=sorted dispatch=sortDispatch sortKey=sortRating>
                {s("Rating")}
              </Hooks.SortButton>
            </th>
            <th>
              <Hooks.SortButton
                data=sorted dispatch=sortDispatch sortKey=sortMatchCount>
                {s("Matches")}
              </Hooks.SortButton>
            </th>
            <th>
              <Utils.VisuallyHidden> {s("Controls")} </Utils.VisuallyHidden>
            </th>
          </tr>
        </thead>
        <tbody className="content">
          {sorted.table
           |> Js.Array.map(p =>
                <tr key={p->idGet} className="buttons-on-hover">
                  <td className="table__player">
                    <a href={"#/players/" ++ p->idGet}>
                      {[|p->firstNameGet, p->lastNameGet|]
                       |> Js.Array.joinWith(" ")
                       |> s}
                    </a>
                  </td>
                  <td className="table__number">
                    {p->ratingGet->string_of_int->s}
                  </td>
                  <td className="table__number">
                    {p->matchCountGet->string_of_int->s}
                  </td>
                  <td>
                    <button
                      className="danger button-ghost"
                      onClick={event => delPlayer(event, p->idGet)}>
                      <Icons.trash />
                      <Utils.VisuallyHidden>
                        {[|"Delete", p->firstNameGet, p->lastNameGet|]
                         |> Js.Array.joinWith(" ")
                         |> s}
                      </Utils.VisuallyHidden>
                    </button>
                  </td>
                </tr>
              )
           |> ReasonReact.array}
        </tbody>
      </table>
      <Utils.Dialog
        isOpen=isDialogOpen onDismiss={_ => setIsDialogOpen(_ => false)}>
        <button
          className="button-micro" onClick={_ => setIsDialogOpen(_ => false)}>
          {s("Close")}
        </button>
        <NewPlayerForm dispatch=playersDispatch />
      </Utils.Dialog>
    </div>;
  };
};

module Profile = {
  [@react.component]
  let make = (~player, ~players, ~playersDispatch, ~options, ~optionsDispatch) => {
    let playerId = player->idGet;
    let playerName =
      [|player->firstNameGet, player->lastNameGet|] |> Js.Array.joinWith(" ");
    let (_, windowDispatch) = Window.useWindowContext();
    React.useEffect2(
      () => {
        windowDispatch(Window.SetTitle("Profile for " ++ playerName));
        Some(() => windowDispatch(Window.SetTitle("")));
      },
      (windowDispatch, playerName),
    );
    let avoidObj =
      options->Data.avoidPairsGet
      |> Js.Array.reduce(Converters.avoidPairReducer, Js.Dict.empty());
    let singAvoidList =
      switch (avoidObj->Js.Dict.get(playerId)) {
      | None => [||]
      | Some(idArr) => idArr
      };
    let unavoided =
      players
      |> Belt.Map.String.keysToArray
      |> Js.Array.(
           filter(id => !(singAvoidList |> includes(id)) && id !== playerId)
         );
    let (selectedAvoider, setSelectedAvoider) =
      React.useState(() => unavoided[0]);
    let avoidAdd = event => {
      event->ReactEvent.Form.preventDefault;
      optionsDispatch(Hooks.Db.AddAvoidPair((playerId, selectedAvoider)));
      /* Reset the selected avoider to the first on the list, but check to
         make sure they weren't they weren't the first. */
      let newSelected =
        unavoided[0] !== selectedAvoider ? unavoided[0] : unavoided[1];
      setSelectedAvoider(_ => newSelected);
    };
    let handleChange = event => {
      event->ReactEvent.Form.preventDefault;
      let target = event->ReactEvent.Form.currentTarget;
      let firstName = target##firstName##value;
      let lastName = target##lastName##value;
      let matchCount = target##matchCount##value->int_of_string;
      let rating = target##rating##value->int_of_string;
      playersDispatch(
        Hooks.Db.SetItem(
          playerId,
          t(
            ~firstName,
            ~lastName,
            ~matchCount,
            ~rating,
            ~id=playerId,
            ~type_=player->type_Get,
          ),
        ),
      );
    };
    let handleAvoidChange = event => {
      let id = event->ReactEvent.Form.currentTarget##value;
      setSelectedAvoider(_ => id);
    };
    let handleAvoidBlur = event => {
      let id = event->ReactEvent.Focus.currentTarget##value;
      setSelectedAvoider(_ => id);
    };
    <div className="players__playerInfo content-area">
      <a href="#/players"> <Icons.chevronLeft /> {s(" Back")} </a>
      <h2> {s("Profile for " ++ playerName)} </h2>
      <form onChange=handleChange onSubmit=handleChange>
        <p>
          <label htmlFor="firstName"> {s("First name")} </label>
          <input
            defaultValue={player->firstNameGet}
            name="firstName"
            type_="text"
          />
        </p>
        <p>
          <label htmlFor="lastName"> {s("Last name")} </label>
          <input
            defaultValue={player->lastNameGet}
            name="lastName"
            type_="text"
          />
        </p>
        <p>
          <label htmlFor="matchCount"> {s("Matches played")} </label>
          <input
            defaultValue={player->matchCountGet->string_of_int}
            name="matchCount"
            type_="number"
          />
        </p>
        <p>
          <label htmlFor="rating"> {s("Rating")} </label>
          <input
            defaultValue={player->ratingGet->string_of_int}
            name="rating"
            type_="number"
          />
        </p>
        <p>
          <label htmlFor="Kfactor"> {s("K factor")} </label>
          <input
            name="kfactor"
            type_="number"
            disabled=true
            value={player->matchCountGet->Scoring.getKFactor->string_of_int}
            readOnly=true
          />
        </p>
      </form>
      <h3> {s("Players to avoid")} </h3>
      <ul>
        {singAvoidList
         |> Js.Array.map(pId =>
              <li key=pId>
                {players->getPlayerMaybeMap(pId)->firstNameGet->s}
                {s(" ")}
                {players->getPlayerMaybeMap(pId)->lastNameGet->s}
                <button
                  ariaLabel={
                    [|
                      "Remove",
                      players->getPlayerMaybeMap(pId)->firstNameGet,
                      players->getPlayerMaybeMap(pId)->lastNameGet,
                      "from avoid list.",
                    |]
                    |> Js.Array.joinWith(" ")
                  }
                  title={
                    [|
                      "Remove",
                      players->getPlayerMaybeMap(pId)->firstNameGet,
                      players->getPlayerMaybeMap(pId)->lastNameGet,
                      "from avoid list.",
                    |]
                    |> Js.Array.joinWith(" ")
                  }
                  className="danger button-ghost"
                  onClick={_ =>
                    optionsDispatch(Hooks.Db.DelAvoidPair((playerId, pId)))
                  }>
                  <Icons.trash />
                </button>
              </li>
            )
         |> ReasonReact.array}
        {singAvoidList |> Js.Array.length === 0
           ? <li> {s("None")} </li> : React.null}
      </ul>
      <form onSubmit=avoidAdd>
        <label htmlFor="avoid-select">
          {s("Select a new player to avoid.")}
        </label>
        <select
          id="avoid-select"
          onBlur=handleAvoidBlur
          onChange=handleAvoidChange
          value=selectedAvoider>
          {unavoided
           |> Js.Array.map(pId =>
                <option key=pId value=pId>
                  {players->getPlayerMaybeMap(pId)->firstNameGet->s}
                  {s(" ")}
                  {players->getPlayerMaybeMap(pId)->lastNameGet->s}
                </option>
              )
           |> ReasonReact.array}
        </select>
        {s(" ")}
        <input className="button-micro" type_="submit" value="Add" />
      </form>
    </div>;
  };
};

[@react.component]
let make = (~id=?) => {
  let (players, playersDispatch) = Hooks.Db.useAllPlayers();
  let (sorted, sortDispatch) =
    Hooks.useSortedTable(
      ~table=players->Belt.Map.String.valuesToArray,
      ~key=sortName,
      ~isDescending=false,
    );
  React.useEffect2(
    () => {
      sortDispatch(Hooks.SetTable(players->Belt.Map.String.valuesToArray));
      None;
    },
    (players, sortDispatch),
  );
  let (options, optionsDispatch) = Hooks.Db.useOptions();
  <Window.WindowBody>
    {switch (id) {
     | None =>
       <List sorted sortDispatch players playersDispatch optionsDispatch />
     | Some([id]) =>
       switch (players->Belt.Map.String.get(id)) {
       | None => <div> {s("Loading...")} </div>
       | Some(player) =>
         <Profile player players playersDispatch options optionsDispatch />
       }
     | _ => <Pages.NotFound />
     }}
  </Window.WindowBody>;
};