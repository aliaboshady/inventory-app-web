const fs = require("fs");
const path = require("path");

const localesPath = path.join(__dirname, "../../public/locales");

// List of all language folders in the locales directory
const languages = fs
  .readdirSync(localesPath)
  .filter((file) => fs.statSync(path.join(localesPath, file)).isDirectory());

// English folder to use as the base for comparison
const englishFolder = path.join(localesPath, "en");

// Get a list of JSON files in the 'en' (English) folder
const englishFiles = fs
  .readdirSync(englishFolder)
  .filter((file) => file.endsWith(".json"));

// Function to sort the keys of an object based on a given order
function sortKeysByOrder(obj, order) {
  const sortedObj = {};
  order.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      sortedObj[key] = obj[key];
    }
  });
  return sortedObj;
}

// Function to match and update the keys in the other language files
function syncLanguageKeys(languageFolder) {
  const langPath = path.join(localesPath, languageFolder);

  // Loop through each English file and sync the keys in the language file
  englishFiles.forEach((file) => {
    const englishFilePath = path.join(englishFolder, file);
    const langFilePath = path.join(langPath, file);

    // Only continue if the language file exists
    if (fs.existsSync(langFilePath)) {
      const englishContent = JSON.parse(
        fs.readFileSync(englishFilePath, "utf-8")
      );
      const langContent = JSON.parse(fs.readFileSync(langFilePath, "utf-8"));

      let updated = false;

      // Check and add missing keys or remove extra keys
      Object.keys(englishContent).forEach((key) => {
        if (!(key in langContent)) {
          // Key is missing in the language file, add it with a placeholder value
          langContent[key] = englishContent[key];
          updated = true;
          console.log(
            `Added missing key: ${key} in ${file} for ${languageFolder}`
          );
        }
      });

      Object.keys(langContent).forEach((key) => {
        if (!(key in englishContent)) {
          // Key exists in the language file but not in the English file, remove it
          delete langContent[key];
          updated = true;
          console.log(
            `Removed extra key: ${key} from ${file} for ${languageFolder}`
          );
        }
      });

      // Sort the keys of the language file based on the order of the English file's keys
      const sortedLangContent = sortKeysByOrder(
        langContent,
        Object.keys(englishContent)
      );

      // Write the modified content back to the file (whether it was updated or not)
      // Add a line break at the end of the file
      fs.writeFileSync(
        langFilePath,
        JSON.stringify(sortedLangContent, null, 2) + "\n"
      );
      if (updated) {
        console.log(`Updated and sorted: ${file} for ${languageFolder}`);
      } else {
        console.log(`Sorted (no changes): ${file} for ${languageFolder}`);
      }
    }
  });
}

// Loop through each language and sync the keys
languages.forEach((language) => {
  if (language !== "en") {
    // Skip English since it's the base
    syncLanguageKeys(language);
  }
});
