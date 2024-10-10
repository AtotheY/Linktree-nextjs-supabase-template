import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

// Initialize the library with English translations
countries.registerLocale(enLocale);

export function getCountryCode(countryName: string): string {
  // Attempt to get the country code
  const code = countries.getAlpha2Code(countryName, "en");

  // If a code is found, return it; otherwise, return the first two letters of the country name
  return code || countryName.slice(0, 2).toUpperCase();
}

export function getCountryFlag(countryName: string): string {
  if (!countryName) return "🌎"; // Fallback to world emoji if no country

  try {
    const countryCode = getCountryCode(countryName);

    // Convert to regional indicator symbols
    const flagEmoji = countryCode
      .split("")
      .map((char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      .join("");

    return flagEmoji || "🌎"; // Fallback to world emoji if conversion fails
  } catch (error) {
    console.error("Error generating country flag:", error);
    return "🌎"; // Fallback to world emoji on error
  }
}
