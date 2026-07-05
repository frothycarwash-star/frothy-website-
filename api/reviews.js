export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = '9919894935233684765'; // Using Google Maps Place ID (ludocid)

    // Use the Places API with the Place ID
    // Note: Google's newer API uses a different format, so we'll use the Places API client library approach
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,review&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Places API');
    }

    const data = await response.json();

    if (!data.result || !data.result.reviews) {
      return res.status(200).json({ reviews: [] });
    }

    // Format reviews
    const formattedReviews = data.result.reviews.map((review) => ({
      author: review.author_name,
      rating: review.rating,
      text: review.text,
      time: review.time,
      relative_time: review.relative_time_description,
      profilePhotoUrl: review.profile_photo_url
    }));

    res.status(200).json({ reviews: formattedReviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews', reviews: [] });
  }
}
