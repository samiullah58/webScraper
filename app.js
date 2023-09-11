const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeProductDetails(urls) {
  const products = [];

  async function scrapUrl(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        },
      });
      const $ = cheerio.load(response.data);

      //////////////////////////////////////////////////////

      // Query Selectors for Title
      let title = null;
      const titleSelectors = ["h1"];
      for (const selector of titleSelectors) {
        const tempTitle = $(selector).text().trim();
        if (tempTitle) {
          title = tempTitle;
          break;
        }
      }
      if (title === null) {
        title = "Title unavailable";
      }

      // Query Selectors for Price
      let price = null;
      const selectorPrice = [
        "#container > div.layout-content > div > div.screen-body > div.screen-layout > div.layout-left > div.main-screen > div.product-price > div.price-list > div:nth-child(1) > div.price > span.promotion",
      ];
      for (const selector of selectorPrice) {
        const tempPrice = $(selector).text().trim();
        if (tempPrice) {
          price = tempPrice;
          price = price.replace(/^US\s+/i, "");
          break;
        }
      }
      if (price === null) {
        price = "Price unavailable";
      }

      // Query Selectors for Rating
      let rating = null;
      const ratingSelectors = [
        "#product-review > div > div > div > span.next-form-text-align.review-value",
      ];
      for (const selector of ratingSelectors) {
        const tempRating = $(selector).text().trim();
        if (tempRating) {
          rating = tempRating;
          break;
        }
      }

      if (rating === null) {
        rating = "Rating unavailable";
      }

      // Query Selectors for Image
      let image = null;
      const selectorImage = [];
      for (const selector of selectorImage) {
        const tempImage = $(selector).attr("src");
        if (tempImage) {
          image = tempImage;
          break;
        }
      }
      if (image === null) {
        image = "Image unavailable";
      }

      ////////////////////////////////////////////////////////////////

      const product = {
        title,
        price,
        rating,
        image,
      };
      products.push(product);
    } catch (error) {
      console.error(`Error scraping product: ${error.message}`);
    }
  }

  for (const url of urls) {
    await new Promise((resolve) => setTimeout(resolve, 80000));
    await scrapUrl(url);
  }

  return products;
}

const urls = [
  "https://www.alibaba.com/product-detail/Peony-Truffle-Plant-Extract-Organic-Whitening_1600531250385.html",
  "https://www.alibaba.com/product-detail/Beautiful-Designed-Mexican-Gold-Earrings-For_60743058415.html",
];

scrapeProductDetails(urls)
  .then((products) => {
    console.log(products);
  })
  .catch((error) => {
    console.log(`Error scraping products: ${error.message}`);
  });

/////////////////////////////////////////////////////////////////////////////

// Alibaba:
// Prodduct Link: https://www.alibaba.com/product-detail/Beautiful-Designed-Mexican-Gold-Earrings-For_60743058415.html
// Product Price Format: /\$\d?(\d+\.\d{2})/

// Sundial:
// Product link: https://www.sundialhome.com/product/taupe-2-7-x-10-0-paris-runner82rm
// Product price format /\$\d?(\d+(\.\d{2})?)?/

// Ebay:
// Product Link: https://www.ebay.com/itm/204166540572
// Product Price Format: /(?:US\s*\$)?\d+(\.\d{2})?\/ea/
// Ebay's Price format: /US \$\d+\.\d{2}/   US $14.62
// Here is the LINK: https://www.ebay.com/itm/155708277468
