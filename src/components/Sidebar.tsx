import {Typography, Box} from "@mui/material";
import {useEffect, useState, useRef} from "react";
import useFavStore from "../queries/favState";
import EmojiXs from "./EmojiSmaller.tsx";
import MenuIcon from "@mui/icons-material/Menu";

function FavouriteBar({setIsSideBarOpen}: any) {
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
  const favouriteItems = useFavStore(state => state.favItems);
  useFavStore.subscribe(l => {
    l.update;
  });

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
  } else {
    console.log("favouriteItems is not an array");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: {xs: "85vw", xl: "15vw"},
        overflow: "hidden",
        marginTop: 2,
        bgcolor: "background.paper",
      }}
    >
      {favCategories.map((category: string, categoryIndex: number) => (
        <div key={categoryIndex}>
          <Box sx={{display: "flex", flexDirection: "row"}}>
            <Typography variant="h5" sx={{}}>
              {convertTextFormat(category)}
            </Typography>
            {categoryIndex === 0 && (
              <MenuIcon
                sx={{fontSize: 40}}
                onClick={() => setIsSideBarOpen(false)}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: {xs: "85vw", xl: "15vw"},
              overflow: "scroll",
              position: "relative",
            }}
          >
            {favouriteItems.map(
              (item: {category: string; htmlTag: string}, itemIndex: number) =>
                item.category === category && (
                  <Box
                    key={itemIndex}
                    sx={{flexShrink: 0, paddingY: 2, paddingLeft: 1}}
                  >
                    <EmojiXs
                      htmlTag={item.htmlTag.split("_")}
                      category={item.category}
                    />
                  </Box>
                )
            )}{" "}
          </Box>
        </div>
      ))}
    </Box>
  );
}

export default FavouriteBar;
