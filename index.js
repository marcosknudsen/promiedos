import puppeteer from "puppeteer";

export default async function (id) {
  try {
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();
    let table;
    await pagina.goto(`https://www.promiedos.com.ar/club=${id}`);
    let response = await pagina.evaluate(()=>
      Array.from(
        document.querySelector(".fixclub").children[0].children,
        function (e) {
          var obj = {
            dia: e.children[0].innerText,
            rival: e.children[3].innerText,
            fecha: e.children[1].innerText,
            lov: e.children[2].innerText,
          };
          return obj;
        }
      )
    )
    let first = response.shift();
    return response;
  } catch (e) {
    console.log(e);
  }
}
