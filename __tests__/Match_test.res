open Jest
open ReactTestingLibrary
open FireEvent

test("Ratings are updated correctly after a match.", () => {
  let page = render(
    <LoadTournament tourneyId=TestData.simplePairing>
      {tournament => <PageRound tournament roundId=1 />}
    </LoadTournament>,
  )
  page |> getByText(~matcher=#RegExp(%bs.re("/add newbie mcnewberson/i"))) |> click
  page |> getByText(~matcher=#RegExp(%bs.re("/add grandy mcmaster/i"))) |> click
  page |> getByText(~matcher=#RegExp(%bs.re("/match selected/i"))) |> click
  page
  |> getByDisplayValue(~matcher=#Str("Select winner"))
  |> change(
    ~eventInit={
      "target": {
        "value": Data.Match.Result.toString(Data.Match.Result.WhiteWon),
      },
    },
  )
  page
  |> getByText(
    ~matcher=#RegExp(
      %bs.re("/view information for match: newbie mcnewberson versus grandy mcmaster/i"),
    ),
  )
  |> click
  page
  |> getByTestId(~matcher=#Str("rating-Newbie_McNewberson___"))
  |> JestDom.expect
  |> JestDom.toHaveTextContent(#Str("800 (+800)"))
})
