const puppeteer = require("puppeteer");

const websiteConfig = {
  alibaba: {
    url: "https://www.alibaba.com/product-detail/Beautiful-Designed-Mexican-Gold-Earrings-For_60743058415.html",
    selectors: {
      title:
        "#container > div.layout-content > div > div.screen-body > div.screen-layout > div.layout-left > div.main-screen > div.product-title > h1",
      price: "div.price span",
      rating: "#buyer-review strong",
      image:
        "#ali-anchor-AliPostDhMb-6jehm > div:nth-child(2) > p:nth-child(1) > img",
    },
  },
  amazon: {
    // Add selectors and URL for Amazon here
  },
  // Add configurations for other websites as needed
};

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

const webScraper = async (websiteName) => {
  if (!websiteConfig[websiteName]) {
    console.error("Website not found in configuration.");
    return;
  }

  const { url, selectors } = websiteConfig[websiteName];
  const maxAttempts = 30;
  const timeout = 20000;
  const result = [];
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "User-Agent": "Your User Agent String",
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout });

    for (const key of Object.keys(selectors)) {
      const value = selectors[key];
      const scrapedData = await scrapeWithRetry(
        page,
        value,
        maxAttempts,
        timeout
      );
      result.push({ [key]: scrapedData });
    }
  } catch (error) {
    console.error(`Error scraping website ${websiteName}: ${error.message}`);
  } finally {
    await browser.close();
  }

  return result;
};

const websiteName = "alibaba"; // Change this to the desired website name from the configuration
webScraper(websiteName)
  .then((result) => {
    console.log("Scraped Data:", result);
  })
  .catch((error) => {
    console.error(error.message);
  });
