export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured', reviews: [] });
    }

    // Step 1: Find the place by name and location
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Frothy%20Carwash%20Lounge&inputtype=textquery&fields=place_id&key=${apiKey}`
    );

    const searchData = await searchResponse.json();
    
    if (searchData.status !== 'OK' || !searchData.candidates?.length) {
      console.error('Place search failed:', searchData.status);
      return res.status(200).json({ reviews: [] });
    }

    const placeId = searchData.candidates[0].place_id;

    // Step 2: Get reviews for the place
    const detailsResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`
    );

    const detailsData = await detailsResponse.json();

    if (detailsData.status !== 'OK' || !detailsData.result?.reviews) {
      console.error('Details fetch failed:', detailsData.status);
      return res.status(200).json({ reviews: [] });
    }

    // Format reviews
    const formattedReviews = detailsData.result.reviews.map((review) => ({
      author: review.author_name || 'Anonymous',
      rating: review.rating || 5,
      text: review.text || '',
      time: review.time || new Date().getTime(),
      relative_time: review.relative_time_description || 'Recently'
    }));

    res.status(200).json({ reviews: formattedReviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(200).json({ error: 'Failed to fetch reviews', reviews: [] });
  }
}
