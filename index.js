import puppeteer from "puppeteer";

export default async function (id) {
  try {
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();
    let table;
    await pagina.goto(`https://www.promiedos.com.ar/club=${id}`);
    let response = await pagina.evaluate(() =>
      Array.from(
        document.querySelector(".fixclub").children[0].children,
        function (e) {
          if (e.children[4].innerHTML == "-") {
            var obj = {
              day: e.children[0].innerText,
              against: e.children[3].innerText,
              matchN: e.children[1].innerText,
              hoa: e.children[2].innerText == "L" ? "H" : "A",
            };
            return obj;
          }
        }
      )
    );
    response.shift();
    return response;
  } catch (e) {
    console.log(e);
  }
}
