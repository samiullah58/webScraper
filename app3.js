const puppeteer = require("puppeteer");

async function webScraper(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
  });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const priceSelector = "#module_product_price_1 > div > div > span";
    await page.waitForSelector(priceSelector, { timeout: 10000 });

    const matchPrice = await page.$(priceSelector);
    if (matchPrice) {
      price = await page.evaluate((element) => {
        return element.textContent.trim();
      }, matchPrice);
    }
    return price;
  } catch (error) {
    console.error(error.message);
  } finally {
    await browser.close();
  }
}
const product =
  "https://www.daraz.pk/products/m10-tws-true-wireless-stereo-bluetooth-earphones-headset-connect-with-all-bluetooth-devices-i396875053-s1977374836.html";
webScraper(product)
  .then((price) => {
    console.log("Price:", price);
  })
  .catch((err) => {
    console.log(err.message);
  });
