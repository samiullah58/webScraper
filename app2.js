const puppeteer = require("puppeteer");

async function scraper(url, string) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
  });

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Extract the text content of the body
    const bodyText = await page.$eval("body", (bodyElement) => {
      return bodyElement.textContent;
    });

    let price = null;

    if (string === "amazon") {
      const amazonPriceRegex = /\$\d{1,3}\.\d{2}/g;
      const amazonPriceMatches = bodyText.match(amazonPriceRegex);
      price =
        amazonPriceMatches && amazonPriceMatches.length > 0
          ? amazonPriceMatches[0]
          : "Price not found";
    } else if (string === "alibaba") {
      const alibabaPriceRegex = /\$\d{1,3}\.\d{2}/g;
      const alibabaPriceMatches = bodyText.match(alibabaPriceRegex);
      price =
        alibabaPriceMatches && alibabaPriceMatches.length > 0
          ? alibabaPriceMatches[3]
          : "Price not found";
    } else if (string === "daraz") {
      const darazPriceRegex = /Rs\.\s\d{1,3}(?:,\d{3})*\b/g;
      const darazPriceMatches = bodyText.match(darazPriceRegex);
      price =
        darazPriceMatches && darazPriceMatches.length > 0
          ? darazPriceMatches[2]
          : "Price not found";
    } else if (string === "ebay") {
      const eBayPriceRegex = /US \$\d+\.\d{2}/;
      const eBayPriceMatches = bodyText.match(eBayPriceRegex);
      price =
        eBayPriceMatches && eBayPriceMatches.length > 0
          ? eBayPriceMatches[0]
          : "Price not found";
    }

    const result = { Price: price };

    return result;
  } catch (error) {
    console.error(error.message);
  } finally {
    await browser.close();
  }
}

const product =
  // "https://www.daraz.pk/products/the-balm-double-crosser-face-palette-i376462179-s1862209334.html";
  // "https://www.amazon.com/Amazon-Basics-Commercial-Rectangular-35-Quart/dp/B072VBNT17/";
  // "https://www.alibaba.com/product-detail/Customized-Metal-Silver-And-Black-Box_1600695049626.html";
  // "https://www.ebay.com/itm/235181747369";
  // "https://www.ebay.com/itm/155708277468";
  "https://www.ebay.com/itm/303696686683";

scraper(product, "ebay")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
  });
