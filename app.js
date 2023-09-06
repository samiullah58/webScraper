const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeProductDetails(urls) {
  const products = [];

  for (const url of urls) {
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
      const titleSelectors = ["h1", "span#productTitle"];
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

      // Query Selectors for Rating
      let rating = null;
      const ratingSelectors = [
        ".a-size-base:first",
        "#histogramid > div > div.ebay-content-wrapper > span.ebay-review-start-rating",
        "#buyer-review > div.review-info > div.product-quality > div.ratings-info > div",
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

      // Query Selectors for Price
      let price = null;
      const selectorPrice = [
        "#corePrice_desktop > div > table > tbody > tr > td.a-span12 > span.a-price-range > span:nth-child(1) > span.a-offscreen",
        ".x-price-primary",
        ".price:first span",
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

      // Query Selectors for Reviews
      let reviews = null;
      const selectorReviews = [
        "#acrCustomerReviewText:first",
        "span#_rvwlnk",
        "span.SECONDARY",
        "#product-review > div > div > div > span:nth-child(3)",
      ];
      for (const selector of selectorReviews) {
        const tempReviews = $(selector).text().trim();
        if (tempReviews) {
          reviews = tempReviews;
          reviews = reviews.replace(/[^0-9,]/g, "");
          break;
        }
      }
      // if (reviews === null) {
      //   reviews = "Reviews unavailable";
      // }

      // Query Selectors for Image
      let image = null;
      const selectorImage = [
        "div#imgTagWrapperId img#landingImage",
        ".ux-image-carousel-item.active.image img",
      ];
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
        rating,
        price,
        reviews,
        image,
      };
      products.push(product);
    } catch (error) {
      console.error(`Error scraping product: ${error.message}`);
    }
  }
  return products;
}

const urls = [
  "https://www.amazon.com/Amazon-Essentials-V-Neck-Sweater-Medium/dp/B079RGZJQT/ref=sr_1_3",
  "https://www.ebay.com/itm/295912491733",
  "https://www.ebay.com/itm/314808617359",
  "https://www.ebay.com/itm/334935461477",
  "https://www.alibaba.com/product-detail/Niacinamide-10-Zinc-1-Hyaluronic-Acid_1600376825252.html",
];

scrapeProductDetails(urls)
  .then((products) => {
    console.log(products);
  })
  .catch((error) => {
    console.log(`Error scraping products: ${error.message}`);
  });
