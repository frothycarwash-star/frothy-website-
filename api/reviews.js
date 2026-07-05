export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured', reviews: [] })
    }

    // Search for the place by name
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Frothy%20Carwash%20Lounge&inputtype=textquery&fields=place_id&key=${apiKey}`
    
    const searchResponse = await fetch(searchUrl)
    const searchData = await searchResponse.json()

    if (searchData.status !== 'OK' || !searchData.candidates?.[0]) {
      return res.status(200).json({ reviews: [] })
    }

    const placeId = searchData.candidates[0].place_id

    // Get place details with reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`
    const detailsResponse = await fetch(detailsUrl)
    const detailsData = await detailsResponse.json()

    if (detailsData.status !== 'OK' || !detailsData.result?.reviews) {
      return res.status(200).json({ reviews: [] })
    }

    // Format reviews
    const reviews = detailsData.result.reviews.map((review) => ({
      author: review.author_name || 'Anonymous',
      rating: review.rating || 5,
      text: review.text || '',
      time: review.time || 0,
      relative_time: review.relative_time_description || 'Recently'
    }))

    res.status(200).json({ reviews })
  } catch (error) {
    console.error('Reviews API error:', error)
    res.status(200).json({ error: error.message, reviews: [] })
  }
}
