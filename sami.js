const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeProductData(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
      },
    });
    const html = response.data;
    const $ = cheerio.load(html); // Load the HTML into Cheerio

    // Define selectors for price and rating
    const selectors = {
      price: "span.product-price, div.price, p.price", // Adjust as needed
      rating: "span.product-rating, div.rating, p.rating", // Adjust as needed
    };

    const data = {};

    // Extract data using Cheerio selectors
    for (const field in selectors) {
      const selector = selectors[field];
      const element = $(selector).first(); // Select the first matching element
      if (element.length > 0) {
        data[field] = element.text().trim();
      } else {
        data[field] = "N/A"; // Default value if not found
      }
    }

    // Use regex to extract the title
    const titleRegex = /<\s*(h[1-3])[^>]*>([^<]+)<\/\s*\1>/i;
    const titleMatch = html.match(titleRegex);
    data.title = titleMatch ? titleMatch[1].trim() : "N/A";

    console.log("Scraped Data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example usage
const productURLs = [
  "https://www.amazon.com/Sceptre-FreeSync-DisplayPort-Speakers-E275B-FPT168S/dp/B09C7J5WGR/",
  "https://www.alibaba.com/product-detail/Hot-Sale-25ml-Dubai-Arabic-Style_62425294172.html",
  // Add more product URLs
];

for (const url of productURLs) {
  scrapeProductData(url);
}
