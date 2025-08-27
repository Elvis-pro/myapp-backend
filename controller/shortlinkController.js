const ShortLink = require('../models/shortLink');
const generateSlug = require('../Utils/generateSlug');

const createShortLink = async (req, res) => {
  const { fullUrls, title } = req.body;

  if (!Array.isArray(fullUrls) || fullUrls.length === 0) {
    return res.status(400).json({ error: 'fullUrls must be a non-empty array' });
  }

  const slug = generateSlug(title) + '-' + Math.random().toString(36).substring(2, 7);

  try {
    const short = new ShortLink({ title, fullUrls, slug });
    await short.save();
    res.json({ shortUrl: `/s/${slug}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create short link' });
  }
};

const redirectToFullUrl = async (req, res) => {
  const { slug } = req.params;

  try {
    const link = await ShortLink.findOne({ slug });
    if (!link || !Array.isArray(link.fullUrls) || link.fullUrls.length === 0) {
      return res.status(404).send('Link not found');
    }

    // Randomly pick one from fullUrls
    const randomUrl = link.fullUrls[Math.floor(Math.random() * link.fullUrls.length)];

    link.clicks++;
    await link.save();

    res.redirect(randomUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { createShortLink, redirectToFullUrl };
