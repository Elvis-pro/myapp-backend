// utils/generateSlug.js
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-')     // replace spaces with dashes
    .replace(/--+/g, '-');    // remove double dashes
};

module.exports = generateSlug;
