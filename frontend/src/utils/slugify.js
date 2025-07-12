// utils/slugify.js
export const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(
      /[çğıöşü]/g,
      (c) => ({ ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" }[c])
    )
    .replace(/[^\w-]/g, "");
