(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"calcStandings",function(){return C}),n.d(a,"modifiedMedian",function(){return O}),n.d(a,"playerColorBalance",function(){return N}),n.d(a,"playerOppScoreCum",function(){return R}),n.d(a,"playerScore",function(){return v}),n.d(a,"playerScoreCum",function(){return b}),n.d(a,"playerScoreList",function(){return E}),n.d(a,"solkoff",function(){return k});var r=n(0),l=n.n(r),c=n(3),u=n.n(c),i=(n(14),n(1)),o=(n(15),n(6)),s=n.n(o);function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1200,a={dummy:!1,Ne:0,eloRank:function(e){var t=e.round.tourney.getMatchesByPlayer(a).length,n=800/(a.Ne+t);return new s.a(n)}};return"object"===typeof e?Object.assign(a,e):(a.firstName=e,a.lastName=t,a.rating=n),a}var f=m({firstName:"Dummy",dummy:!0,rating:0});function d(e){var t=e.players[0].eloRank(e),n=e.players[1].eloRank(e),a=[t.getExpected(e.origRating[0],e.origRating[1]),n.getExpected(e.origRating[1],e.origRating[0])];return e.newRating=[t.updateRating(a[0],e.result[0],e.origRating[0]),n.updateRating(a[1],e.result[1],e.origRating[1])],e.newRating=e.newRating.map(function(e){return e<100?100:e}),e.players[0].rating=e.newRating[0],e.players[1].rating=e.newRating[1],e}var h=Object.freeze(function(e,t,n){var a={round:e,players:[t,n],result:[0,0],origRating:[t.rating,n.rating],newRating:[t.rating,n.rating],blackWon:function(){return a.result=[0,1],d(a),a},whiteWon:function(){return a.result=[1,0],d(a),a},draw:function(){return a.result=[.5,.5],d(a),a},resetResult:function(){return a.result=[0,0],a.newRating=[].concat(a.origRating),a},isComplete:function(){return a.result[0]+a.result[1]!==0},isBye:function(){return a.players.includes(f)},getColorInfo:function(e){return{player:a.players[e],result:a.result[e],origRating:a.origRating[e],newRating:a.newRating[e]}},getPlayerColor:function(e){return a.players.indexOf(e)},getPlayerInfo:function(e){return a.getColorInfo(a.getPlayerColor(e))},getWhite:function(){return a.getColorInfo(0)},getBlack:function(){return a.getColorInfo(1)}},r=a.players.map(function(e){return e.dummy});return r[0]?a.result=[0,1]:r[1]&&(a.result=[1,0]),a});var p=Object.freeze(function(e){var t={tourney:e,all:arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],inactive:[],getActive:function(){return t.all.filter(function(e){return!t.inactive.includes(e)})},addPlayer:function(e){return t.all.push(e),t},addPlayers:function(e){return t.all=t.all.concat(e),t},deactivatePlayer:function(e){return t.inactive.push(e),t},activatePlayer:function(e){return t.inactive.splice(t.inactive.indexOf(e),1),t},removePlayer:function(e){return t.tourney.getMatchesByPlayer(e).length>0?null:(delete t.all[t.all.indexOf(e)],t)}};return t}),y=n(8),g=n(7);function E(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return e.getMatchesByPlayer(t,n).map(function(e){return e.result[e.players.indexOf(t)]})}function v(e,t){var n=0,a=E(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:null);return a.length>0&&(n=a.reduce(function(e,t){return e+t})),n}function b(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=0,r=[];E(e,t,n).forEach(function(e){a+=e,r.push(a)});var l=0;return 0!==r.length&&(l=r.reduce(function(e,t){return e+t})),l}function N(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=0;return e.getMatchesByPlayer(t,n).filter(function(e){return!e.isBye}).forEach(function(e){e.players[0]===t?a+=1:e.players[1]===t&&(a+=-1)}),a}function O(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=e.getPlayersByOpponent(t,n).map(function(t){return v(e,t,n)});r.sort(),a||(r.pop(),r.shift());var l=0;return r.length>0&&(l=r.reduce(function(e,t){return e+t})),l}function k(e,t){return O(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,!0)}function R(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=e.getPlayersByOpponent(t,n).map(function(t){return b(e,t,n)}),r=0;return 0!==a.length&&(r=a.reduce(function(e,t){return e+t})),r}function C(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=e.roster.all.map(function(n){return{player:n,score:v(e,n,t),modifiedMedian:O(e,n,t),solkoff:k(e,n,t),scoreCum:b(e,n,t),oppScoreCum:R(e,n,t)}});n.sort(Object(g.firstBy)(function(e){return e.score},-1).thenBy(function(e){return e.modifiedMedian},-1).thenBy(function(e){return e.solkoff},-1).thenBy(function(e){return e.scoreCum},-1).thenBy(function(e){return e.oppScoreCum},-1));var a=[],r=0;return n.forEach(function(e,t,n){if(0!==t){var l=n[t-1];e.score===l.score&&e.modifiedMedian===l.modifiedMedian&&e.solkoff===l.solkoff&&e.scoreCum===l.scoreCum&&e.oppScoreCum===l.oppScoreCum||(r+=1)}a[r]||(a[r]=[]),a[r].push(e)}),a}var w=n(2);function B(e,t,n){var a,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],l=e.prevRound.playerColor(t),c=n.filter(function(e){return!r.includes(e)}).filter(function(e){return e!==t}).filter(function(t){return!Object(w.flatten)(e.matches.map(function(e){return e.players})).includes(t)}),u=n.filter(function(t){return l!==e.prevRound.playerColor(t)}),i=c.filter(function(e){return u.includes(e)})[0]||c[0];return i&&(a=h(e,t,i),N(e.tourney,t)>N(e.tourney,i)&&a.players.reverse(),e.matches.push(a)),[i,a]}var j=Object.freeze(function(e,t,n,a){var r={id:t,tourney:e,roster:a,prevRound:n,playerTree:{},matches:[],hasDummy:!1,isComplete:function(){return!r.matches.map(function(e){return e.isComplete}).includes(!1)},getMatchByPlayer:function(e){var t=null;return r.matches.forEach(function(n){n.players.includes(e)&&(t=n)}),t},playerColor:function(e){var t=-1;return r.matches.forEach(function(n){n.players.includes(e)&&(t=n.players.indexOf(e))}),t},addPlayer:function(e){return r.players.push(e),r}};return function(e){e.roster.forEach(function(t){var n=v(e.tourney,t,e.id);void 0===e.playerTree[n]&&(e.playerTree[n]=[]),e.playerTree[n].push(t)}),Object.keys(e.playerTree).reverse().forEach(function(t,n,a){var r=e.playerTree[t];if(r.length%2!==0)if(e.roster.length%2===0||e.hasDummy){var l=r[r.length-1];r.splice(r.length-1,1);var c=a[n+1];void 0===e.playerTree[c]&&(e.playerTree[c]=[]),e.playerTree[c].push(l)}else r.push(f),e.hasDummy=!0;0===r.length?delete e.playerTree[t]:e.playerTree[t]=Object(w.chain)(r).sortBy("rating").reverse().chunk(r.length/2).value()}),Object.keys(e.playerTree).forEach(function(t){var n=e.playerTree[t][0],a=e.playerTree[t][1];if(void 0===e.prevRound)Object(w.zip)(n,a).forEach(function(t){return e.matches.push(h.apply(void 0,[e].concat(Object(y.a)(t))))});else{var r=n.map(function(t){return[].concat(a).concat(n).filter(function(n){return e.tourney.getPlayersByOpponent(n).includes(t)})});n.forEach(function(t){var l,c,u=r[n.indexOf(t)],o=Object(w.flatten)(r.slice(n.indexOf(t))),s=B(e,t,a.filter(function(e){return o.includes(e)}),u),m=Object(i.a)(s,2);if(l=m[0],c=m[1],!l){var f=B(e,t,a,u),d=Object(i.a)(f,2);l=d[0],c=d[1]}if(!l){var h=B(e,t,a,[]),p=Object(i.a)(h,2);l=p[0],c=p[1]}if(u.includes(l)){var y=!1;n.filter(function(e){return e!==t}).forEach(function(a){if(!y){var i=e.matches.filter(function(e){return e.players.includes(a)})[0];if(i){var o=i.players.filter(function(e){return e!==a})[0],s=r[n.indexOf(a)];u.includes(o)||s.includes(l)||(c.players=[t,o],i.players=[a,l],y=!0)}}})}})}}),e.matches}(r),r});var P=Object.freeze(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n={name:e,roundList:[],byeValue:1,isNewRoundReady:function(){return n.roundList.length>0?Object(w.last)(n.roundList).isComplete():n.roster.all.length>0},getMatchesByPlayer:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;null===t&&(t=n.roundList.length);var a=[];return Object(w.times)(t+1,function(t){void 0!==n.roundList[t]&&n.roundList[t].matches.forEach(function(t){-1!==t.players.indexOf(e)&&a.push(t)})}),a},getPlayersByOpponent:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=[];return n.getMatchesByPlayer(e,t).forEach(function(t){a=a.concat(t.players.filter(function(t){return t!==e}))}),a},getNumOfRounds:function(){var e=Math.ceil(Math.log2(n.roster.getActive().length));return e===-1/0&&(e=0),e},newRound:function(){if(!n.isNewRoundReady())return!1;var e=j(n,n.roundList.length,Object(w.last)(n.roundList),n.roster.getActive());return n.roundList.push(e),e}};return n.roster=p(n,t),n}),M=Object.freeze([{firstName:"Matthew",lastName:"A",rating:800},{firstName:"Mark",lastName:"B",rating:850},{firstName:"Luke",lastname:"C",rating:900},{firstName:"John",lastname:"D",rating:950},{firstName:"Simon",lastname:"E",rating:1e3},{firstName:"Andrew",lastname:"F",rating:1050},{firstName:"James",lastname:"G",rating:1100},{firstName:"Philip",lastname:"H",rating:1150},{firstName:"Bartholomew",lastname:"I",rating:1200},{firstName:"Thomas",lastname:"J",rating:1250},{firstName:"Catherine",lastname:"K",rating:1300},{firstName:"Clare",lastname:"L",rating:1350},{firstName:"Judas",lastname:"M",rating:1400},{firstName:"Matthias",lastname:"N",rating:1450},{firstName:"Paul",lastname:"O",rating:1500},{firstName:"Mary",lastname:"P",rating:1600},{firstName:"Theresa",lastname:"Q",rating:1650},{firstName:"Megan",lastname:"R",rating:1700},{firstName:"Elizabeth",lastname:"S",rating:1750}]);function _(e){var t=e.tourney,n=Object(r.useState)(t.roster.all),a=Object(i.a)(n,2),c=a[0],u=a[1],o=Object(r.useState)(!1),s=Object(i.a)(o,2),f=s[0],d=s[1],h={firstName:"",lastName:"",rating:1200},p=function(e){h[e.target.name]=e.target.value},y="";return c.length>0&&(y=l.a.createElement("table",null,l.a.createElement("caption",null,"Roster"),l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"First name"),l.a.createElement("th",null,"Rating"),l.a.createElement("th",null,"Rounds played"),l.a.createElement("th",null))),l.a.createElement("tbody",null,c.map(function(e,n){return l.a.createElement("tr",{key:n,className:t.roster.inactive.includes(e)?"inactive":"active"},l.a.createElement("td",{className:"table__player"},e.firstName),l.a.createElement("td",{className:"table__number"},e.rating),l.a.createElement("td",{className:"table__number"},t.getMatchesByPlayer(e).length),l.a.createElement("td",null,t.roster.inactive.includes(e)?l.a.createElement("button",{onClick:function(){return function(e){t.roster.activatePlayer(e),u([].concat(t.roster.all))}(e)}},"Activate"):l.a.createElement("button",{onClick:function(){return function(e){t.roster.removePlayer(e)||t.roster.deactivatePlayer(e),u([].concat(t.roster.all))}(e)}},"x")))})))),l.a.createElement("div",{className:"roster"},y,l.a.createElement("p",null,l.a.createElement("button",{disabled:f,onClick:function(){var e=M.slice(0,16).map(function(e){return m(e)});t.roster.addPlayers(e),d(!0),u([].concat(t.roster.all))}},"Load a demo roster")),l.a.createElement("p",null,"Or add your own players:"),l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t.roster.addPlayer(m(h.firstName,h.lastName,h.rating)),u([].concat(t.roster.all))}},l.a.createElement("p",null,l.a.createElement("label",null,"First name\xa0",l.a.createElement("input",{type:"text",name:"firstName",onChange:p,required:!0}))),l.a.createElement("p",null,l.a.createElement("label",null,"Last name\xa0",l.a.createElement("input",{type:"text",name:"lastName",onChange:p,required:!0}))),l.a.createElement("p",null,l.a.createElement("label",null,"Rating\xa0",l.a.createElement("input",{type:"number",name:"rating",onChange:p,value:"1200"}))),l.a.createElement("input",{type:"submit",value:"Add"})),l.a.createElement("p",{className:"center"},"Total rounds: ",t.getNumOfRounds()))}function S(e){var t=e.tourney,n=e.roundId,a=t.roundList[n],c=Object(r.useState)(a.matches.map(function(e){return Object.assign({},e)})),u=Object(i.a)(c,2),o=u[0],s=u[1],m=Object(r.useState)([]),f=Object(i.a)(m,2),d=f[0],h=f[1],p=function(e,t,n){var r=a.matches[t];n.target.checked?0===e?r.whiteWon():1===e?r.blackWon():.5===e&&r.draw():r.resetResult(),s(a.matches.map(function(e){return Object.assign({},e)}))},y=function(e){d.includes(e)?h(d.filter(function(t){return t!==e})):h([].concat(d).concat([e]))};return l.a.createElement("div",null,l.a.createElement("table",{key:a.id,className:"table__roster"},l.a.createElement("caption",null,"Round ",a.id+1," results"),l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"Won"),l.a.createElement("th",null,"White"),l.a.createElement("th",null,"Draw"),l.a.createElement("th",null,"Black"),l.a.createElement("th",null,"Won"))),l.a.createElement("tbody",null,o.map(function(e,n){return l.a.createElement("tr",{key:n,className:a.matches[n].isBye()?"inactive":""},l.a.createElement("td",{className:"table__number"},n+1),l.a.createElement("td",null,l.a.createElement("input",{type:"checkbox",checked:1===a.matches[n].getWhite().result,disabled:a.matches[n].isBye(),onChange:function(e){return p(0,n,e)}})),l.a.createElement("td",{className:"table__player"},a.matches[n].getWhite().player.firstName,l.a.createElement("button",{onClick:function(){return y(n)}},"?"),d.includes(n)&&l.a.createElement(x,{tourney:t,round:a,player:a.matches[n].getWhite().player})),l.a.createElement("td",null,l.a.createElement("input",{type:"checkbox",checked:.5===a.matches[n].getWhite().result,disabled:a.matches[n].isBye(),onChange:function(e){return p(.5,n,e)}})),l.a.createElement("td",{className:"table__player"},a.matches[n].getBlack().player.firstName,l.a.createElement("button",{onClick:function(){return y(n)}},"?"),d.includes(n)&&l.a.createElement(x,{tourney:t,round:a,player:a.matches[n].getBlack().player})),l.a.createElement("td",null,l.a.createElement("input",{type:"checkbox",checked:1===a.matches[n].getBlack().result,disabled:a.matches[n].isBye(),onChange:function(e){return p(1,n,e)}})))}))),l.a.createElement("p",{style:{textAlign:"center"}},l.a.createElement("button",{onClick:function(){o.forEach(function(e,t){var n=a.matches[t],r=Math.random();r>=.55?n.whiteWon():r>=.1?n.blackWon():n.draw()}),s(a.matches.map(function(e){return Object.assign({},e)}))}},"Random!")),l.a.createElement(W,{roundId:a.id,tourney:a.tourney}))}function x(e){var t=e.tourney,n=e.round,r=e.player,c=n.getMatchByPlayer(r).getPlayerInfo(r).newRating-n.getMatchByPlayer(r).getPlayerInfo(r).origRating;c>-1&&(c="+"+c);var u=a.playerColorBalance(t,r,n.id),i="Even";return u>0?i="White +"+u:u<0&&(i="Black +"+Math.abs(u)),l.a.createElement("dl",{className:"player-card"},l.a.createElement("dt",null,"Rating"),l.a.createElement("dd",null,n.getMatchByPlayer(r).getPlayerInfo(r).origRating,"\xa0(",c,")"),l.a.createElement("dt",null,"Color balance"),l.a.createElement("dd",null,i),l.a.createElement("dt",null,"Opponent history"),l.a.createElement("dd",null,l.a.createElement("ol",null,t.getPlayersByOpponent(r,n.id).map(function(e,t){return l.a.createElement("li",{key:t},e.firstName)}))))}function W(e){var t=e.tourney,n=e.roundId;return l.a.createElement("table",{key:n},l.a.createElement("caption",null,"Current Standings"),l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null),l.a.createElement("th",null,"First name"),l.a.createElement("th",null,"Score"),l.a.createElement("th",null,"Median"),l.a.createElement("th",null,"Solkoff"),l.a.createElement("th",null,"Cumulative"),l.a.createElement("th",null,"Cumulative of opposition"))),a.calcStandings(t,n).map(function(e,t){return l.a.createElement("tbody",{key:t},e.map(function(e,n){return l.a.createElement("tr",{key:n},l.a.createElement("td",null,t+1),l.a.createElement("td",null,e.player.firstName),l.a.createElement("td",{className:"table__number"},e.score),l.a.createElement("td",{className:"table__number"},e.modifiedMedian),l.a.createElement("td",{className:"table__number"},e.solkoff),l.a.createElement("td",{className:"table__number"},e.scoreCum),l.a.createElement("td",{className:"table__number"},e.oppScoreCum))}))}))}var T=P("CVL Winter Open");Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(l.a.createElement(function(){var e=Object(r.useState)([{name:"Roster",contents:l.a.createElement(_,{tourney:T})}]),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(n[0]),u=Object(i.a)(c,2),o=u[0],s=u[1];return l.a.createElement("div",{className:"tournament"},l.a.createElement("nav",{className:"tabbar"},l.a.createElement("ul",null,n.map(function(e,t){return l.a.createElement("li",{key:t},l.a.createElement("button",{className:"tab",onClick:function(){return s(e)},disabled:o===e},e.name))}),l.a.createElement("li",null,l.a.createElement("button",{className:"tab new_round",onClick:function(e){var t=T.newRound();t?(n.push({name:"Round "+(t.id+1),contents:l.a.createElement(S,{tourney:T,roundId:t.id})}),a([].concat(n)),s(n[n.length-1])):alert("Either add players or complete the current matches first.")}},"New Round")))),l.a.createElement("h1",null,"Chessahoochee: a chess tournament app"),o.contents)},null),document.getElementById("root")),u.a.render(l.a.createElement(function(){return l.a.createElement("p",null,l.a.createElement("span",{role:"img","aria-label":"waving hand"},"\ud83d\udc4b"),"\xa0 This is an unstable demo build! Want to help make it better? Head to the\xa0",l.a.createElement("span",{role:"img","aria-label":"finger pointing right"},"\ud83d\udc49"),"\xa0",l.a.createElement("a",{href:"https://github.com/johnridesabike/chessahoochee"},"Git repository"),".")},null),document.getElementById("caution")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(19)}},[[9,1,2]]]);
//# sourceMappingURL=main.2f53e33e.chunk.js.map