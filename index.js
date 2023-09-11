// const puppeteer = require("puppeteer");

// const webScraper = async (urls) => {
//   const result = [];
//   const browser = await puppeteer.launch({ headless: false });

//   for (const url of urls) {
//     const page = await browser.newPage();

//     // page.setDefaultNavigationTimeout(0);

//     await page.setExtraHTTPHeaders({
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
//     });
//     try {
//       await page.goto(url, { waitUntil: "domcontentloaded" });

//       // Query Selector for Title
//       const titleSelector = [
//         "div.title--wrap--Ms9Zv4A h1",
//         "h1",
//         "#module_product_title_1 div div span",
//       ];
//       let title = null;

//       for (const selector of titleSelector) {
//         if (await page.$(selector)) {
//           title = await page.$eval(selector, (titleElement) => {
//             return titleElement.textContent.trim();
//           });
//           break;
//         }
//       }

//       if (title === null) {
//         title = "Title unavailable";
//       }

//       // Query Selector for Price
//       const priceSelector = [
//         "div.price span",
//         ".a-offscreen",
//         ".es--wrap--erdmPRe.notranslate",
//         "div.x-bin-price__content div",
//         "#module_product_price_1 div div span",
//       ];
//       let price = null;

//       for (const selector of priceSelector) {
//         if (await page.$(selector)) {
//           price = await page.$eval(selector, (priceElement) => {
//             return priceElement.textContent.trim();
//           });
//           price = price.replace(/^US\s+/i, "");
//           break;
//         }
//       }

//       if (price === null) {
//         price = "Price unavailable";
//       }

//       // Query Selector for Rating
//       const ratingSelector = [
//         "#buyer-review strong",
//         "#acrPopover span.a-declarative a span",
//         "#root > div.pdp-wrap.pdp-body > div.pdp-body-left > div.pdp-info > div.pdp-info-right > div.product-reviewer > div > span",
//         "span.ux-summary__start--rating span",
//         "#module_product_review > div > div > div:nth-child(1) > div.mod-rating > div > div > div.summary > div.score > span.score-average",
//       ];
//       let rating = null;

//       for (const selector of ratingSelector) {
//         if (await page.$(selector)) {
//           rating = await page.$eval(selector, (ratingElement) => {
//             return ratingElement.textContent.trim();
//           });
//           break;
//         }
//       }
//       if (rating === null) {
//         rating = "Rating unavailable";
//       }

//       const imageSelector = [
//         "#container > div.layout-content > div > div.screen-body > div.screen-layout > div.layout-left > div.main-layout > div.main-index > div.image-view > a > div > img",
//         "#landingImage",
//         ".magnifier-image",
//         "div.ux-image-carousel-item.active.image div div img",
//         "div.gallery-preview-panel div img",
//       ];
//       let image = null;

//       for (const selector of imageSelector) {
//         if (await page.$(selector)) {
//           image = await page.$eval(selector, (imageElement) => {
//             return imageElement.getAttribute("src");
//           });
//           break;
//         }
//       }

//       if (image === null) {
//         image = "Image unavailable";
//       }

//       const products = { title, price, rating, image };

//       result.push(products);
//     } catch (error) {
//       console.error(`Error scraping ${url}: ${error.message}`);
//     } finally {
//       await page.close();
//     }
//   }
//   await browser.close();
//   return result;
// };

// const productUrls = [
//   ///////////////////////////////////// ALIBABA ////////////////////////////////////////////////////////
//   // "https://www.alibaba.com/product-detail/Beautiful-Designed-Mexican-Gold-Earrings-For_60743058415.html",
//   // "https://www.alibaba.com/product-detail/D20-Smart-watch-Fitness-Tracker-heart_1600119626498.html",
//   // "https://www.alibaba.com/product-detail/OEM-ODM-Top-Brand-Luxury-Bling_1600358688910.html",
//   /////////////////////////////////////  AMAZON    /////////////////////////////////////////
//   "https://www.amazon.com/Sceptre-FreeSync-DisplayPort-Speakers-E275B-FPT168S/dp/B09C7J5WGR/",
//   "https://www.amazon.com/Aveeno-Positively-Radiant-Brightening-Daily/dp/B07H9DNGP8/",
//   "https://www.amazon.com/Elgato-HD60-External-Capture-Card/dp/B09V1KJ3J4/",
//   ////////////////////////////////////  ALIEXPRESS  /////////////////////////////////////////////////
//   // "https://www.aliexpress.com/item/1005005042086983.html",
//   // "https://www.aliexpress.com/item/4001201671251.html",
//   // "https://www.aliexpress.com/item/1005005492630345.html",
//   /////////////////////////////////// EBAY  ////////////////////////////////////////////////////////
//   // "https://www.ebay.com/itm/185285411342",
//   // "https://www.ebay.com/itm/165787124485",
//   // "https://www.ebay.com/itm/293040710479",
//   //////////////////////////////////  DARAZ ///////////////////////////////////////////////////////
//   // "https://www.daraz.pk/products/bonanza-satrangi-3-piece-unstitched-lawn-suit-maze-rst233p68-i412898558-s1970421820.html",
// ];

// webScraper(productUrls)
//   .then((result) => {
//     console.log("Scraped Data:", result);
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// const puppeteer = require("puppeteer");

// const webScraper = async (urls) => {
//   const maxAttempts = 20;
//   let attempts = 0;
//   const result = [];
//   const browser = await puppeteer.launch({ headless: true });

//   for (const url of urls) {
//     const page = await browser.newPage();

//     await page.setExtraHTTPHeaders({
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
//     });

//     // Set a timeout for the entire page
//     page.setDefaultTimeout(60000);

//     try {
//       await page.goto(url, { waitUntil: "domcontentloaded" });

//       // Query Selector for Title
//       const titleSelector = [
//         "div.title--wrap--Ms9Zv4A h1",
//         "h1",
//         "#module_product_title_1 div div span",
//       ];
//       let title = null;

//       for (const selector of titleSelector) {
//         const element = await page.$(selector);
//         if (element) {
//           title = await page.evaluate((el) => el.textContent.trim(), element);
//           break;
//         }
//       }

//       if (!title) {
//         title = "Title unavailable";
//       }

//       // Query Selector for Price
//       const priceSelector = [
//         "div.price span",
//         ".a-offscreen",
//         ".es--wrap--erdmPRe.notranslate",
//         "div.x-bin-price__content div",
//         "#module_product_price_1 div div span",
//       ];
//       let price = null;

//       for (const selector of priceSelector) {
//         const element = await page.$(selector);
//         if (element) {
//           price = await page.evaluate((el) => el.textContent.trim(), element);
//           price = price.replace(/^US\s+/i, "");
//           break;
//         }
//       }

//       if (!price) {
//         price = "Price unavailable";
//       }

//       // Query Selector for Rating
//       const ratingSelector = [
//         "#buyer-review strong",
//         "#acrPopover span.a-declarative a span",
//         "#root > div.pdp-wrap.pdp-body > div.pdp-body-left > div.pdp-info > div.pdp-info-right > div.product-reviewer > div > span",
//         "span.ux-summary__start--rating span",
//         "#module_product_review > div > div > div:nth-child(1) > div.mod-rating > div > div > div.summary > div.score > span.score-average",
//       ];
//       let rating = null;

//       while (attempts < maxAttempts && rating === null) {
//         rating = await page.evaluate(() => {
//           const ratingElement = document.querySelector(ratingSelector);
//           return ratingElement ? ratingElement.textContent.trim() : null;
//         });

//         if (rating === null) {
//           await new Promise((resolve) => setTimeout(resolve, 6000)); // Wait for 1 second before the next attempt.
//           attempts++;
//         }
//       }

//       // Query Selector for Image
//       const imageSelector = [
//         "#container > div.layout-content > div > div.screen-body > div.screen-layout > div.layout-left > div.main-layout > div.main-index > div.image-view > a > div > img",
//         "#landingImage",
//         ".magnifier-image",
//         "div.ux-image-carousel-item.active.image div div img",
//         "div.gallery-preview-panel div img",
//       ];
//       let image = null;

//       for (const selector of imageSelector) {
//         const element = await page.$(selector);
//         if (element) {
//           image = await page.evaluate((el) => el.getAttribute("src"), element);
//           break;
//         }
//       }

//       if (!image) {
//         image = "Image unavailable";
//       }

//       const products = { title, price, rating, image };

//       result.push(products);
//     } catch (error) {
//       console.error(`Error scraping ${url}: ${error.message}`);
//     } finally {
//       await page.close();
//     }
//   }
//   await browser.close();
//   return result;
// };

// const productUrls = [
//   ///////////////////////////////////// ALIBABA ////////////////////////////////////////////////////////
//   // "https://www.alibaba.com/product-detail/Beautiful-Designed-Mexican-Gold-Earrings-For_60743058415.html",
//   "https://www.alibaba.com/product-detail/D20-Smart-watch-Fitness-Tracker-heart_1600119626498.html",
//   // "https://www.alibaba.com/product-detail/OEM-ODM-Top-Brand-Luxury-Bling_1600358688910.html",
//   /////////////////////////////////////  AMAZON    /////////////////////////////////////////
//   // "https://www.amazon.com/Sceptre-FreeSync-DisplayPort-Speakers-E275B-FPT168S/dp/B09C7J5WGR/",
//   // "https://www.amazon.com/Aveeno-Positively-Radiant-Brightening-Daily/dp/B07H9DNGP8/",
//   // "https://www.amazon.com/Elgato-HD60-External-Capture-Card/dp/B09V1KJ3J4/",
//   ////////////////////////////////////  ALIEXPRESS  /////////////////////////////////////////////////
//   // "https://www.aliexpress.com/item/1005005042086983.html",
//   // "https://www.aliexpress.com/item/4001201671251.html",
//   // "https://www.aliexpress.com/item/1005005492630345.html",
//   /////////////////////////////////// EBAY  ////////////////////////////////////////////////////////
//   // "https://www.ebay.com/itm/185285411342",
//   // "https://www.ebay.com/itm/165787124485",
//   // "https://www.ebay.com/itm/293040710479",
//   //////////////////////////////////  DARAZ ///////////////////////////////////////////////////////
//   // "https://www.daraz.pk/products/bonanza-satrangi-3-piece-unstitched-lawn-suit-maze-rst233p68-i412898558-s1970421820.html",
// ];

// webScraper(productUrls)
//   .then((result) => {
//     console.log("Scraped Data:", result);
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

const puppeteer = require("puppeteer");

async function scrapeWithRetry(page, selector, maxAttempts, timeout) {
  let result = null;
  let attempts = 0;

  while (attempts < maxAttempts && result === null) {
    try {
      await page.waitForSelector(selector, { timeout });
      result = await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : null;
      }, selector);
    } catch (error) {
      console.error(
        `Error while waiting for selector ${selector}: ${error.message}`
      );
    }

    if (result === null) {
      await new Promise((resolve) => setTimeout(resolve, timeout));
      attempts++;
    }
  }

  return result;
}

const webScraper = async (urls) => {
  const maxAttempts = 30;
  const timeout = 12000; // 12 seconds (increased for potentially slower websites)
  const result = [];
  const browser = await puppeteer.launch({ headless: true });

  for (const url of urls) {
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    });

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout });

      // Query Selector for Title
      const titleSelector =
        "#container > div.layout-content > div > div.screen-body > div.screen-layout > div.layout-left > div.main-screen > div.product-title > h1";

      // Query Selector for Price
      const priceSelector = "div.price span";

      // Query Selector for Rating
      const ratingSelector = "#buyer-review strong";

      // Query Selector for Image
      const imageSelector =
        "#container > div.layout-content > div > div.screen-body > div.screen-layout > div.layout-left > div.main-layout > div.main-index > div.image-view > a > img";

      console.log("Before evaluating the title selector");
      const title = await scrapeWithRetry(
        page,
        titleSelector,
        maxAttempts,
        timeout
      );
      console.log("After evaluating the title selector");

      const price = await scrapeWithRetry(
        page,
        priceSelector,
        maxAttempts,
        timeout
      );

      const rating = await scrapeWithRetry(
        page,
        ratingSelector,
        maxAttempts,
        timeout
      );

      const image = await scrapeWithRetry(
        page,
        imageSelector,
        maxAttempts,
        timeout
      );

      const products = { title, price, rating, image };
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
  "https://www.alibaba.com/product-detail/Beautiful-Designed-Mexican-Gold-Earrings-For_60743058415.html",
  "https://www.alibaba.com/product-detail/D20-Smart-watch-Fitness-Tracker-heart_1600119626498.html",
  // Add more URLs as needed
];

webScraper(productUrls)
  .then((result) => {
    console.log("Scraped Data:", result);
  })
  .catch((error) => {
    console.log(error.message);
  });
