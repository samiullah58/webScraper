const puppeteer = require("puppeteer");

const webScraper = async (urls) => {
  const result = [];
  const browser = await puppeteer.launch({ headless: true });

  for (const url of urls) {
    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(0);

    await page.setExtraHTTPHeaders({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    });
    try {
      await page.goto(url);

      // Query Selector for Title
      const titleSelector = [
        "h1",
        "#root > div.pdp-wrap.pdp-body > div.pdp-body-left > div.pdp-info > div.pdp-info-right > div.title--wrap--Ms9Zv4A > h1",
      ];
      let title = null;

      for (const selector of titleSelector) {
        if (await page.$(selector)) {
          title = await page.$eval(selector, (titleElement) => {
            return titleElement.textContent.trim();
          });
          break;
        }
      }

      if (title === null) {
        title = "Title unavailable";
      }

      // Query Selector for Price
      const priceSelector = [
        "div.price span",
        ".a-offscreen",
        ".es--wrap--erdmPRe.notranslate",
      ];
      let price = null;

      for (const selector of priceSelector) {
        if (await page.$(selector)) {
          price = await page.$eval(selector, (priceElement) => {
            return priceElement.textContent.trim();
          });
          break;
        }
      }

      if (price === null) {
        price = "Price unavailable";
      }

      // Query Selector for Rating
      const ratingSelector = [
        "#buyer-review strong",
        "#acrPopover span.a-declarative a span",
        "#root > div.pdp-wrap.pdp-body > div.pdp-body-left > div.pdp-info > div.pdp-info-right > div.product-reviewer > div > span",
      ];
      let rating = null;

      for (const selector of ratingSelector) {
        if (await page.$(selector)) {
          rating = await page.$eval(selector, (ratingElement) => {
            return ratingElement.textContent.trim();
          });
          break;
        }
      }

      if (rating === null) {
        rating = "Rating unavailable";
      }

      const imageSelector = [
        "#container > div.layout-content > div > div.screen-body > div.screen-layout > div.layout-left > div.main-layout > div.main-index > div.image-view > a > div > img",
        "#landingImage",
      ];
      let image = null;

      for (const selector of imageSelector) {
        if (await page.$(selector)) {
          image = await page.$eval(selector, (imageElement) => {
            return imageElement.getAttribute("src");
          });
          break;
        }
      }

      if (image === null) {
        image = "Image unavailable";
      }

      const products = { title, rating, price, image };

      result.push(products);
    } catch (error) {
      console.error(`Error scraping ${url}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
  return result;
};

const productUrls = [
  ///////////////////////////////////// ALIBABA ////////////////////////////////////////////////////////
  // "https://www.alibaba.com/product-detail/Beautiful-Designed-Mexican-Gold-Earrings-For_60743058415.html",
  // "https://www.alibaba.com/product-detail/D20-Smart-watch-Fitness-Tracker-heart_1600119626498.html",
  // "https://www.alibaba.com/product-detail/OEM-ODM-Top-Brand-Luxury-Bling_1600358688910.html",
  /////////////////////////////////////  AMAZON    /////////////////////////////////////////
  // "https://www.amazon.com/Sceptre-FreeSync-DisplayPort-Speakers-E275B-FPT168S/dp/B09C7J5WGR/",
  // "https://www.amazon.com/Aveeno-Positively-Radiant-Brightening-Daily/dp/B07H9DNGP8/",
  // "https://www.amazon.com/Elgato-HD60-External-Capture-Card/dp/B09V1KJ3J4/",
  ////////////////////////////////////  ALIEXPRESS  /////////////////////////////////////////////////
  "https://www.aliexpress.com/item/1005005042086983.html",
];

webScraper(productUrls)
  .then((result) => {
    console.log("Scraped Data:", result);
  })
  .catch((error) => {
    console.log(error.message);
  });
