open Belt

let github_url = "https://github.com/johnridesabike/coronate"
let license_url = "https://github.com/johnridesabike/coronate/blob/master/LICENSE"
let issues_url = "https://github.com/johnridesabike/coronate/issues/new"

/* Pass a `compare` function to avoid polymorphic compare errors. */
type direction<'data, 'field> = (('field, 'field) => int, (. 'data) => 'field, 'data, 'data) => int
let ascend = (cmp, getter, a, b) => cmp(getter(. a), getter(. b))
let descend = (cmp, getter, a, b) => cmp(getter(. b), getter(. a))

module Array = {
  type t<'a> = array<'a>

  let swap = (arr, idx1, idx2) =>
    switch (arr[idx1], arr[idx2]) {
    | (Some(item1), Some(item2)) =>
      ignore(arr[idx1] = item2)
      ignore(arr[idx2] = item1)
      arr
    | (None, _)
    | (_, None) => arr
    }
}

module String = {
  type t = string

  let includes = (s, ~substr) => Js.String2.includes(s, substr)

  let split = (s, ~on) => Js.String2.split(s, on)
}

let alert = Webapi.Dom.Window.alert(_, Webapi.Dom.window)

module WebpackAssets = {
  @module("./assets/icon-min.svg") external logo: string = "default"
  @module("./assets/caution.svg") external caution: string = "default"
}

module Entities = {
  let nbsp = `\xa0`
  let copy = `\xA9`
}

module DateFormat = {
  let formatter = {
    Intl.DateTimeFormat.make(~locales=["en-US"], ~day=TwoDigit, ~month=Short, ~year=Numeric, ())
  }
  @react.component
  let make = (~date) =>
    <time dateTime={Js.Date.toISOString(date)}>
      {formatter->Intl.DateTimeFormat.format(date)->React.string}
    </time>
}

module DateTimeFormat = {
  /* We only have to construct a new formatter if the timeZone is specified.
     Right now the timeZone is just used for testing. In the future, it can be
     passed from a configuration. It's inefficent to construct a fresh formatter
     for every render. */
  let formatter = {
    Intl.DateTimeFormat.make(
      ~locales=["en-US"],
      ~day=TwoDigit,
      ~month=Short,
      ~year=Numeric,
      ~hour=TwoDigit,
      ~minute=TwoDigit,
      (),
    )
  }
  @react.component
  let make = (~date, ~timeZone=?) => {
    let formatter = switch timeZone {
    | None => formatter
    | Some(timeZone) =>
      Intl.DateTimeFormat.make(
        ~locales=["en-US"],
        ~day=TwoDigit,
        ~month=Short,
        ~year=Numeric,
        ~hour=TwoDigit,
        ~minute=TwoDigit,
        ~timeZone,
        (),
      )
    }
    <time dateTime={Js.Date.toISOString(date)}>
      {formatter->Intl.DateTimeFormat.format(date)->React.string}
    </time>
  }
}

/* module PlaceHolderButton = {
     [@react.component]
     let make = () =>
       <button
         className="button-ghost placeholder"
         ariaHidden=true
         disabled=true
       />;
   }; */

module Panel = {
  @react.component
  let make = (~children, ~className="", ~style=ReactDOMRe.Style.make()) =>
    <div className={Cn.append("utils__panel", className)} style> children </div>
}

module PanelContainer = {
  @react.component
  let make = (~children, ~className="", ~style=ReactDOMRe.Style.make()) =>
    <div style className={Cn.append("utils__panels", className)}> children </div>
}

module Notification = {
  type t = Success | Warning | Error | Generic
  @react.component
  let make = (
    ~children,
    ~kind=Generic,
    ~tooltip="",
    ~className="",
    ~style=ReactDOMRe.Style.make(),
  ) => {
    let (icon, notifClassName) = switch kind {
    | Success => (<Icons.Check />, "utils__notification-success")
    | Warning => (<Icons.Alert />, "utils__notification-warning")
    | Error => (<Icons.Alert />, "utils__notification-error")
    | Generic => (<Icons.Info />, "")
    }
    <div
      className={Cn.fromList(list{"utils__notification-container", notifClassName, className})}
      style>
      <div ariaLabel=tooltip className="utils__notification-icon" title=tooltip> icon </div>
      <div className="utils__notification-text"> children </div>
    </div>
  }
}

module TestId = {
  /* https://twitter.com/fakenickels/status/1189887257030930433 */
  @react.component
  let make = (~children, ~testId) =>
    ReasonReact.cloneElement(children, ~props={"data-testid": testId}, [])
}

@ocaml.doc("
 * Side effects
 ")
let _ = Numeral.registerFormat(
  "fraction",
  Numeral.Format.make(
    ~formatFn=(value, _format, _roundingFunction) => {
      let whole = floor(value)
      let remainder = value -. whole
      let fraction = switch remainder {
      | 0.25 => `¼`
      | 0.5 => `½`
      | 0.75 => `¾`
      | _ => ""
      }
      let stringedWhole = whole == 0.0 && fraction != "" ? "" : Float.toString(whole)
      stringedWhole ++ fraction
    },
    ~regexps=Numeral.RegExps.make(~format=%re("/(1\\/2)/"), ~unformat=%re("/(1\\/2)/")),
    /* This doesn't do anything currently */
    ~unformatFn=value => Float.fromString(value)->Option.getExn,
  ),
)
