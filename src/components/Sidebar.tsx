import {Typography, Box} from "@mui/material";
import {useEffect} from "react";
import Emoji from "./Emoji";
function FavouriteBar() {
  function convertTextFormat(text: string): string {
    return text
      .split("-") // Split the text by hyphen (-)
      .map((word, index) => {
        // Capitalize the first letter of the first word, lowercase others
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word.toLowerCase();
      })
      .join(" "); // Join the words with a space
  }
  const favouriteItems = JSON.parse(localStorage.getItem("favorites") || "[]");

  const favCategories: string[] = [];
  if (Array.isArray(favouriteItems)) {
    for (let i = 0; i < favouriteItems.length; i++) {
      try {
        const item = favouriteItems[i];
        if (item && item.category && !favCategories.includes(item.category)) {
          favCategories.push(item.category);
        }
      } catch (e) {
        console.error(`Error processing item at index ${i}:`, e);
      }
    }
  }
  useEffect(() => {
    console.log(favouriteItems);
    console.log(favCategories);
  }, []);
  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      {favCategories.map((category: string, categoryIndex: number) => (
        <div key={categoryIndex}>
          <Typography>{convertTextFormat(category)}</Typography>
          {favouriteItems.map(
            (item: {category: string; htmlTag: string}, itemIndex: number) =>
              item.category === category && (
                <Emoji
                  key={itemIndex}
                  htmlTag={item.htmlTag.split("_")}
                  category={item.category}
                />
              )
          )}
        </div>
      ))}
    </Box>
  );
}

export default FavouriteBar;
