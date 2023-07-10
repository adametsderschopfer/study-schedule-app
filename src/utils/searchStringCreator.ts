export const searchStringCreator = (query: string): string => {
  const searchText = query.trim().replace(/\s+/, " ");
  let newSearchText = "";

  for (let i = 0; i < searchText.length; i++) {
    switch (searchText[i].toLowerCase()) {
      case " ":
        newSearchText += "(.*)";
        break;

      case "а":
      case "о":
      case "a":
      case "o":
      case "e":
        newSearchText += "[а|о|a|o|e|э]";
        break;

      case "i":
      case "э":
      case "е":
        newSearchText += "[и|е|ё|i|э|e]";
        break;
      case "л":
        newSearchText += "[л|l]";
        break;
      case "к":
      case "x":
        newSearchText += "[к|x|c]";
        break;
      case "и":
        newSearchText += "[и|й|е]";
        break;
      case "т":
      case "t":
        newSearchText += "[т|t]";
        break;
      case "n":
      case "н":
        newSearchText += "[н|n]";
        break;
      case "ю":
        newSearchText += "[ю|u|y]";
        break;
      case "у":
        newSearchText += "[у|u]";
        break;
      case "д":
      case "d":
        newSearchText += "[d|д]";
        break;
      case "r":
      case "р":
        newSearchText += "[r|р]";
        break;
      case "с":
      case "s":
        newSearchText += "[s|с|з]";
        break;
      case "c":
      case "ц":
        newSearchText += "[ц|c|к]";
        break;
      case "м":
        newSearchText += "[m|м]";
        break;
      case "г":
        newSearchText += "[г|g]";
        break;
      case "х":
        newSearchText += "[h|х]";
        break;
      case "ш":
        newSearchText += "[sh]";
        break;
      case "y":
      case "й":
        newSearchText += "[и|й|y|а]";
        break;
      default: {
        if (searchText[i].match(/[^a-zA-Z0-9.]/g)) {
          newSearchText += `\\${searchText[i]}`;
          break;
        }

        newSearchText += searchText[i].toLowerCase();
      }
    }
  }

  return newSearchText;
};
