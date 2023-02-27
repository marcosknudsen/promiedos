import puppeteer from "puppeteer";

export async function getMatchesById(id) {
  try {
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();
    await pagina.goto(`https://www.promiedos.com.ar/club=${id}`);
    let matches = await pagina.evaluate(() =>
      Array.from(
        document.querySelector(".fixclub").children[0].children,
        function (e) {
          if (e.children[4].innerHTML == "-")
            return {
              day: e.children[0].innerText,
              against: e.children[3].innerText,
              matchN: e.children[1].innerText,
              hoa: e.children[2].innerText == "L" ? "H" : "A",
            };
        }
      )
    );
    let teamname = await pagina.evaluate(
      () => document.querySelector("strong").innerText
    );
    return {
      teamname: teamname,
      matches: matches.filter((n) => n != null),
    };
  } catch (e) {
    console.log(e);
  }
}

export async function getTodayResults() {
  try {
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();
    await pagina.goto("https://www.promiedos.com.ar/");
    let matches = await pagina.evaluate(() =>
      Array.from(
        document.querySelectorAll("tr[name=nvp]"),
        function (e) {
          if (e.children[0].classList[0] == "game-fin")
          return {
            localTeam:
              e.children[1].children[e.children[1].children.length - 1]
                .innerText,
            localScore: e.children[2].innerText,
            awayTeam:
              e.children[4].children[e.children[4].children.length - 1]
                .innerText,
            awayScore: e.children[3].innerText,
          };
        }
      )
        .sort((a, b) => {
          return parseInt(a.time) - parseInt(b.time);
        })
        .filter((d) => d != null)
    );
    return matches;
  } catch (e) {
    console.log(e);
  }
}

export async function getYesterdayResults(){
  try {
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();
    await pagina.goto("https://www.promiedos.com.ar/ayer");
    let matches = await pagina.evaluate(() =>
      Array.from(
        document.querySelectorAll("tr[name=nvp]"),
        function (e) {
          if (e.children[0].classList[0] == "game-fin")
          return {
            localTeam:
              e.children[1].children[e.children[1].children.length - 1]
                .innerText,
            localScore: e.children[2].innerText,
            awayTeam:
              e.children[4].children[e.children[4].children.length - 1]
                .innerText,
            awayScore: e.children[3].innerText,
          };
        }
      )
        .sort((a, b) => {
          return parseInt(a.time) - parseInt(b.time);
        })
        .filter((d) => d != null)
    );
    return matches;
  } catch (e) {
    console.log(e);
  }
}

export async function getMatchesToday() {
  try {
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();
    await pagina.goto("https://www.promiedos.com.ar/");
    let matches = await pagina.evaluate(() =>
      Array.from(document.querySelectorAll("tr[name=nvp]"), function (e) {
        if (e.children[0].classList[0] == "game-time")
          return {
            time: e.children[0].innerText.replace(" ", ""),
            localTeam:
              e.children[1].children[e.children[1].children.length - 1]
                .innerText,
            awayTeam:
              e.children[4].children[e.children[4].children.length - 1]
                .innerText,
          };
      })
        .sort((a, b) => {
          return parseInt(a.time.replace(":","")) - parseInt(b.time.replace(":",""));
        })
        .filter((d) => d != null)
    );
    return matches;
  } catch (e) {
    console.log(e);
  }
}
export async function getLiveMatches() {
  try {
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();
    await pagina.goto("https://www.promiedos.com.ar/");
    let matches = await pagina.evaluate(() =>
      Array.from(
        document.querySelectorAll("tr[name=vp]:not(.goles)"),
        function (e) {
          return {
            time: e.children[0].innerText.replace(" ", ""),
            localTeam:
              e.children[1].children[e.children[1].children.length - 1]
                .innerText,
            localScore: e.children[2].innerText,
            awayTeam:
              e.children[4].children[e.children[4].children.length - 1]
                .innerText,
            awayScore: e.children[3].innerText,
          };
        }
      )
        .sort((a, b) => {
          return parseInt(a.time.replace(":","")) - parseInt(b.time.replace(":",""));
        })
        .filter((d) => d != null)
    );
    return matches;
  } catch (e) {
    console.log(e);
  }
}
