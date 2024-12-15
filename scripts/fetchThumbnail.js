import ogs from 'open-graph-scraper';

// Fetch OpenGraph data
async function fetchThumbnail(url) {
  try {
    const { result } = await ogs({ url });
    return result.ogImage?.[0].url || null; // Return the OpenGraph image URL
  } catch (error) {
    console.error(`Error fetching thumbnail for ${url}:`, error.message);
    return null;
  }
}

// Main function
(async () => {
  const thumbnail = await fetchThumbnail("https://medium.com/devil-is-in-the-details/filtering-arrays-using-type-predicates-in-typescript-cf554afc76a3")
  console.log("Thumbnail URL:", thumbnail)
})();