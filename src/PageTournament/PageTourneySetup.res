open Belt
open Router
open Data

@ocaml.doc("
 Why are dates so complicated?
 Note to future self & other maintainers: getDate() begins at 1, and
 getMonth() begins at 0. An HTML date input requires that the month begins at
 1 and the JS Date() object requires that the month begins at 0.
 ")
let makeDateInput = date => {
  open Js.Date
  let year = date->getFullYear->Float.toString
  let rawMonth = date->getMonth
  let rawDate = date->getDate
  /* The date input requires a 2-digit month and day. */
  let month =
    rawMonth < 9.0 ? "0" ++ Float.toString(rawMonth +. 1.0) : Float.toString(rawMonth +. 1.0)
  let day = rawDate < 10.0 ? "0" ++ Float.toString(rawDate) : Float.toString(rawDate)
  Utils.String.concat(list{year, month, day}, ~sep="-")
}

type inputs =
  | Name
  | Date
  | NotEditing

@react.component
let make = (~tournament: LoadTournament.t) => {
  let {tourney, setTourney, _} = tournament
  let {name, date, roundList, _} = tourney
  let (editing, setEditing) = React.useState(() => NotEditing)
  let nameInput = React.useRef(Js.Nullable.null)
  let dateInput = React.useRef(Js.Nullable.null)
  let focusRef = myref =>
    myref.React.current
    ->Js.Nullable.toOption
    ->Option.flatMap(Webapi.Dom.Element.asHtmlElement)
    ->Option.map(Webapi.Dom.HtmlElement.focus)
    ->ignore

  React.useEffect1(() => {
    switch editing {
    | Name => focusRef(nameInput)
    | Date => focusRef(dateInput)
    | NotEditing => ()
    }
    None
  }, [editing])

  let changeToOne = _ => {
    setTourney({
      ...tourney,
      roundList: roundList->Rounds.updateByeScores(Full),
    })
    Utils.alert("Bye scores updated to 1.")
  }

  let changeToOneHalf = _ => {
    setTourney({
      ...tourney,
      roundList: roundList->Rounds.updateByeScores(Half),
    })
    Utils.alert(`Bye scores updated to ½.`)
  }

  let updateDate = event => {
    let rawDate = ReactEvent.Form.currentTarget(event)["value"]
    let (rawYear, rawMonth, rawDay) = switch Utils.String.split(rawDate, ~on="-") {
    | [year, month, day] => (year, month, day)
    | _ => ("2000", "01", "01") /* this was chosen randomly */
    }
    let year = Float.fromString(rawYear)
    let month = Float.fromString(rawMonth)
    let date = Float.fromString(rawDay)
    switch (year, month, date) {
    | (Some(year), Some(month), Some(date)) =>
      setTourney({
        ...tourney,
        date: Js.Date.makeWithYMD(~year, ~month=month -. 1.0, ~date, ()),
      })
    | _ => ()
    }
  }

  <div className="content-area">
    {switch editing {
    | Name =>
      <form
        className="display-20"
        style={ReactDOMRe.Style.make(~textAlign="left", ())}
        onSubmit={_ => setEditing(_ => NotEditing)}>
        <input
          className="display-20"
          style={ReactDOMRe.Style.make(~textAlign="left", ())}
          ref={ReactDOMRe.Ref.domRef(nameInput)}
          type_="text"
          value=name
          onChange={event =>
            setTourney({
              ...tourney,
              name: (event->ReactEvent.Form.currentTarget)["value"],
            })}
        />
        {React.string(" ")}
        <button className="button-ghost" onClick={_ => setEditing(_ => NotEditing)}>
          <Icons.Check />
        </button>
      </form>
    | Date
    | NotEditing =>
      <h1 style={ReactDOMRe.Style.make(~textAlign="left", ())}>
        <span className="inputPlaceholder"> {React.string(name)} </span>
        {React.string(" ")}
        <button className="button-ghost" onClick={_ => setEditing(_ => Name)}>
          <Icons.Edit />
          <Externals.VisuallyHidden> {React.string("Edit name")} </Externals.VisuallyHidden>
        </button>
      </h1>
    }}
    {switch editing {
    | Date =>
      <form className="caption-30" onSubmit={_ => setEditing(_ => NotEditing)}>
        <input
          className="caption-30"
          type_="date"
          ref={ReactDOMRe.Ref.domRef(dateInput)}
          value={makeDateInput(date)}
          onChange=updateDate
        />
        {React.string(" ")}
        <button className="button-ghost" onClick={_ => setEditing(_ => NotEditing)}>
          <Icons.Check />
        </button>
      </form>
    | Name
    | NotEditing =>
      <p className="caption-30">
        <Utils.DateFormat date />
        {React.string(" ")}
        <button className="button-ghost" onClick={_ => setEditing(_ => Date)}>
          <Icons.Edit />
          <Externals.VisuallyHidden> {React.string("Edit date")} </Externals.VisuallyHidden>
        </button>
      </p>
    }}
    <h2> {React.string("Change bye scores")} </h2>
    <button ariaDescribedby="score-desc" onClick=changeToOne>
      {React.string("Change byes to 1")}
    </button>
    {React.string(" ")}
    <button ariaDescribedby="score-desc" onClick=changeToOneHalf>
      {React.string(`Change byes to ½`)}
    </button>
    <p className="caption-30" id="score-desc">
      {React.string("This will update all bye matches which have been previously
          scored in this tournament. To change the default bye value in
          future matches, go to the ")}
      <HashLink to_=Options> {React.string("app options")} </HashLink>
      {React.string(".")}
    </p>
  </div>
}
