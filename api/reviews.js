// Vercel API route for fetching Google Reviews
const https = require('https');
const querystring = require('querystring');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ reviews: [] });
    }

    // Search for the place
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Frothy+Carwash+Lounge&inputtype=textquery&fields=place_id&key=${apiKey}`;

    const searchData = await makeRequest(searchUrl);

    if (searchData.status !== 'OK' || !searchData.candidates?.[0]) {
      return res.status(200).json({ reviews: [] });
    }

    const placeId = searchData.candidates[0].place_id;

    // Get details
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`;

    const detailsData = await makeRequest(detailsUrl);

    if (detailsData.status !== 'OK' || !detailsData.result?.reviews) {
      return res.status(200).json({ reviews: [] });
    }

    const reviews = detailsData.result.reviews.map((r) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.time,
      relative_time: r.relative_time_description,
    }));

    return res.status(200).json({ reviews });
  } catch (error) {
    console.error('Reviews API error:', error);
    return res.status(200).json({ reviews: [] });
  }
};
