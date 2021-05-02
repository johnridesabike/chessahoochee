/*
  Copyright (c) 2021 John Jackson. 

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
open Belt
open Data

@val external node_env: string = "process.env.NODE_ENV"
@val external github_app_id: string = "process.env.GITHUB_APP_ID"
@val external netlify_id: option<string> = "process.env.NETLIFY_ID"

let getDateForFile = () => {
  let date = Js.Date.make()
  [
    date->Js.Date.getFullYear->Float.toString,
    (Js.Date.getMonth(date) +. 1.0)->Numeral.make->Numeral.format("00"),
    Js.Date.getDate(date)->Numeral.make->Numeral.format("00"),
  ]->Js.Array2.joinWith("-")
}

let invalidAlert = () =>
  Utils.alert("That data is invalid! A more helpful error message could not be written yet.")

let dictToMap = dict => dict->Js.Dict.entries->Data.Id.Map.fromStringArray
let mapToDict = map => map->Data.Id.Map.toStringArray->Js.Dict.fromArray

type input_data = {
  config: Config.t,
  players: Data.Id.Map.t<Player.t>,
  tournaments: Data.Id.Map.t<Tournament.t>,
}

@raises(DecodeError)
let decodeOptions = json => {
  open Json.Decode
  {
    config: json |> field("config", Config.decode),
    players: json |> field("players", dict(Player.decode)) |> dictToMap,
    tournaments: json |> field("tournaments", dict(Tournament.decode)) |> dictToMap,
  }
}

let encodeOptions = data => {
  open Json.Encode
  object_(list{
    ("config", Config.encode(data.config)),
    ("players", Map.map(data.players, Player.encode)->mapToDict->jsonDict),
    ("tournaments", Map.map(data.tournaments, Tournament.encode)->mapToDict->jsonDict),
  })
}

module LastBackupDate = {
  @react.component
  let make = (~date) =>
    if Js.Date.getTime(date) == 0.0 {
      React.string("Never")
    } else {
      <Utils.DateTimeFormat date />
    }
}

let dateFormatter = {
  DateTimeFormat.make(
    ["en-US"],
    DateTimeFormat.Options.make(
      ~day=#"2-digit",
      ~month=#"2-digit",
      ~year=#"2-digit",
      ~hour=#"2-digit",
      ~minute=#"2-digit",
      (),
    ),
  )
}

let netlifyopts = switch netlify_id {
| Some(site_id) => {"site_id": site_id}
| None => Js.Obj.empty()
}

@react.component
let make = (~windowDispatch=_ => (), ~auth: Data.Auth.t, ~authDispatch: Db.actionAuth => unit) => {
  let {items: tournaments, dispatch: tourneysDispatch, _} = Db.useAllTournaments()
  let {items: players, dispatch: playersDispatch, _} = Db.useAllPlayers()
  let (text, setText) = React.useState(() => "")
  let (config, configDispatch) = Db.useConfig()
  let (gists, setGists) = React.useState(() => [])
  let minify = Hooks.useBool(true)
  let cancelAllEffects = ref(false)

  let handleAuthError = e => {
    Js.Console.error(e)
    // The app root owns authDispatch, so we aren't worried about it unmounting.
    authDispatch(Reset)->Js.Promise.resolve
  }

  let loadGistList = token =>
    switch token {
    | "" => Js.Promise.resolve(setGists(_ => []))
    | token =>
      Octokit.GistList.load(~token)
      |> Js.Promise.then_(data => {
        if !cancelAllEffects.contents {
          setGists(_ => data)
        }
        Js.Promise.resolve()
      })
      |> Js.Promise.catch(handleAuthError)
    }

  React.useEffect1(() => {
    loadGistList(auth.github_token)->ignore
    Some(() => cancelAllEffects := true)
  }, [auth.github_token])
  React.useEffect1(() => {
    windowDispatch(Window.SetTitle("Options"))
    Some(() => windowDispatch(SetTitle("")))
  }, [windowDispatch])
  /* memoize this so the `useEffect` hook syncs with the correct states */
  let exportData = React.useMemo3(
    () => {config: config, players: players, tournaments: tournaments},
    (config, tournaments, players),
  )
  let exportDataURI = exportData->encodeOptions->Json.stringify->Js.Global.encodeURIComponent
  React.useEffect2(() => {
    let encoded = encodeOptions(exportData)
    let json = Js.Json.stringifyWithSpace(encoded, 2)
    setText(_ => json)
    None
  }, (exportData, setText))

  let loadData = (~tournaments, ~players, ~config) => {
    tourneysDispatch(SetAll(tournaments))
    configDispatch(SetState(config))
    playersDispatch(SetAll(players))
    Utils.alert("Data loaded.")
  }

  @raises(DecodeError)
  let loadJson = json => {
    switch Json.parse(json) {
    | None =>
      Js.Console.error(json)
      invalidAlert()
    | Some(rawJson) =>
      switch decodeOptions(rawJson) {
      | exception Json.Decode.DecodeError(_) =>
        Js.Console.error(rawJson)
        invalidAlert()
      | {config, players, tournaments} => loadData(~tournaments, ~players, ~config)
      }
    }
  }

  let handleText = event => {
    ReactEvent.Form.preventDefault(event)
    loadJson(text)
  }

  @raises(DecodeError)
  let handleFile = event => {
    module FileReader = Externals.FileReader
    ReactEvent.Form.preventDefault(event)
    let reader = FileReader.make()

    @raises(DecodeError)
    let onload = ev => {
      ignore(ev)
      let data = ev["target"]["result"]
      switch Json.parse(data) {
      | None => invalidAlert()
      | Some(rawJson) =>
        switch decodeOptions(rawJson) {
        | exception Json.Decode.DecodeError(_) => invalidAlert()
        | {config, players, tournaments} => loadData(~tournaments, ~players, ~config)
        }
      }
    }
    FileReader.setOnLoad(reader, onload)
    FileReader.readAsText(
      reader,
      ReactEvent.Form.currentTarget(event)["files"]->Array.get(0)->Option.getWithDefault(""),
    )
    /* so the filename won't linger onscreen */
    /* https://github.com/BuckleScript/bucklescript/issues/4391 */
    @warning("-20") ReactEvent.Form.currentTarget(event)["value"] = ""
  }
  let reloadDemoData = event => {
    ReactEvent.Mouse.preventDefault(event)
    loadData(~tournaments=DemoData.tournaments, ~players=DemoData.players, ~config=DemoData.config)
  }
  let loadTestData = event => {
    ReactEvent.Mouse.preventDefault(event)
    loadData(~tournaments=TestData.tournaments, ~players=TestData.players, ~config=TestData.config)
  }
  let handleTextChange = event => {
    let newText = ReactEvent.Form.currentTarget(event)["value"]
    setText(_ => newText)
  }
  <Window.Body windowDispatch>
    <div className="content-area">
      <h2> {React.string("Bye  settings")} </h2>
      <form>
        <p className="caption-30"> {React.string("Select the default score for a bye round.")} </p>
        <div style={ReactDOMRe.Style.make(~display="flex", ())}>
          <label
            className="monospace body-30" style={ReactDOMRe.Style.make(~marginRight="16px", ())}>
            {React.string("1 ")}
            <input
              checked={switch config.byeValue {
              | Full => true
              | Half => false
              }}
              type_="radio"
              onChange={_ => configDispatch(SetByeValue(Full))}
            />
          </label>
          <label className="monospace body-30">
            {React.string(j`½ `)}
            <input
              checked={switch config.byeValue {
              | Full => false
              | Half => true
              }}
              type_="radio"
              onChange={_ => configDispatch(SetByeValue(Half))}
            />
          </label>
        </div>
      </form>
      <h2> {React.string("Manage data")} </h2>
      <p className="caption-20">
        {React.string("Last export: ")} <LastBackupDate date=config.lastBackup />
      </p>
      <h3> {"Backup to GitHub"->React.string} </h3>
      <p className="caption-30">
        {`With a GitHub account, you can save your data to a `->React.string}
        <a href="https://gist.github.com/"> {"gist"->React.string} </a>
        {`. Note that gists can be ${HtmlEntities.ldquo}secret${HtmlEntities.rdquo} but are always 
        publicly accessible. For more information, `->React.string}
        <a href="https://docs.github.com/en/github/writing-on-github/creating-gists">
          {"refer to the gist documentation on GitHub"->React.string}
        </a>
        {"."->React.string}
      </p>
      <p>
        {switch auth.github_token {
        | "" =>
          <button
            onClick={e => {
              ReactEvent.Mouse.preventDefault(e)
              NetlifyAuth.make(netlifyopts)->NetlifyAuth.authenticate(
                {"provider": #github, "scope": "gist"},
                (err, data) =>
                  switch (Js.Nullable.toOption(err), data) {
                  | (_, Some({token})) => authDispatch(SetGitHubToken(token))
                  | (Some(err), _) => Js.Console.error(err)
                  | (None, None) => Js.Console.error("Something wrong happened.")
                  },
              )
            }}>
            {"Log in with GitHub"->React.string}
          </button>
        | _ =>
          <a href={"https://github.com/settings/connections/applications/" ++ github_app_id}>
            {"Change or remove your GitHub access."->React.string}
          </a>
        }}
      </p>
      {switch auth.github_token {
      | "" => React.null
      | github_token =>
        <div>
          <button
            onClick={_ => {
              Octokit.GistCreate.exec(
                ~token=github_token,
                ~data=encodeOptions(exportData),
                ~minify=minify.state,
              )
              |> Js.Promise.then_((newGist: Octokit.response<_, _>) => {
                if !cancelAllEffects.contents {
                  authDispatch(SetGistId(newGist.data["id"]))
                  configDispatch(SetLastBackup(Js.Date.make()))
                }
                Js.Promise.resolve()
              })
              |> Js.Promise.then_(() => loadGistList(github_token))
              |> Js.Promise.catch(e => {
                Utils.alert("Backup failed. Check your GitHub credentials.")
                handleAuthError(e)
              })
              |> ignore
            }}>
            {"Create a new gist"->React.string}
          </button>
          <p className="caption-30"> {"Or select an existing gist."->React.string} </p>
          <select
            value={auth.github_gist_id}
            onBlur={e => {
              let id = ReactEvent.Focus.currentTarget(e)["value"]
              authDispatch(SetGistId(id))
            }}
            onChange={e => {
              let id = ReactEvent.Form.currentTarget(e)["value"]
              authDispatch(SetGistId(id))
            }}>
            <option value=""> {"No gist selected."->React.string} </option>
            {gists
            ->Array.map(({name, id, updated_at}) =>
              <option key=id value=id>
                {name->React.string}
                {" | updated "->React.string}
                {DateTimeFormat.format(dateFormatter, updated_at)->React.string}
              </option>
            )
            ->React.array}
          </select>
          <p>
            <button
              onClick={_ => {
                switch auth.github_gist_id {
                | "" => Js.Console.error("Gist ID is blank.")
                | id =>
                  Octokit.GistWrite.exec(
                    ~id,
                    ~token=github_token,
                    ~data=encodeOptions(exportData),
                    ~minify=minify.state,
                  )
                  |> Js.Promise.then_(result => {
                    configDispatch(SetLastBackup(Js.Date.make()))
                    Js.Promise.resolve(result)
                  })
                  |> Js.Promise.then_(_ => loadGistList(github_token))
                  |> Js.Promise.catch(e => {
                    Utils.alert(
                      "Backup failed. Check your GitHub credentials or try a different gist.",
                    )
                    handleAuthError(e)
                  })
                  |> ignore
                }
              }}
              disabled={auth.github_gist_id == ""}>
              {"Backup to this gist"->React.string}
            </button>
            {" "->React.string}
            <button
              onClick={_ => {
                switch auth.github_gist_id {
                | "" => Js.Console.error("Gist ID is blank.")
                | id =>
                  Octokit.GistRead.read(~id, ~token=github_token)
                  |> Js.Promise.then_(result => {
                    loadJson(result)->Js.Promise.resolve
                  })
                  |> Js.Promise.catch(e => {
                    invalidAlert()
                    handleAuthError(e)
                  })
                  |> ignore
                }
              }}
              disabled={auth.github_gist_id == ""}>
              {"Load from this gist"->React.string}
            </button>
          </p>
          <p className="caption-30">
            <label>
              <input
                type_="checkbox"
                checked=minify.state
                onChange={_ =>
                  switch minify.state {
                  | true => minify.setFalse()
                  | false => minify.setTrue()
                  }}
              />
              {" Minify output."->React.string}
            </label>
          </p>
        </div>
      }}
      <h3> {"Backup locally"->React.string} </h3>
      <p>
        <a
          download={"coronate-" ++ (getDateForFile() ++ ".json")}
          href={"data:application/json," ++ exportDataURI}
          onClick={_ => configDispatch(SetLastBackup(Js.Date.make()))}>
          <Icons.Download /> {React.string(" Export data to a file.")}
        </a>
      </p>
      <label htmlFor="file"> {React.string("Load data from a file:")} </label>
      <input id="file" name="file" type_="file" onChange=handleFile />
      <h2> {React.string("Danger zone")} </h2>
      <p className="caption-30"> {React.string("I hope you know what you're doing...")} </p>
      <button onClick=reloadDemoData>
        {React.string("Reset demo data (this erases everything else)")}
      </button>
      {React.string(" ")}
      {node_env != "production"
        ? <button onClick=loadTestData> {React.string("Load testing data")} </button>
        : React.null}
      <h3> {React.string("Advanced: manually edit data")} </h3>
      <form onSubmit=handleText>
        <textarea
          className="pages__text-json"
          cols=50
          name="playerdata"
          rows=25
          spellCheck=false
          value=text
          onChange=handleTextChange
        />
        <p> <input type_="submit" value="Load" /> </p>
      </form>
    </div>
  </Window.Body>
}