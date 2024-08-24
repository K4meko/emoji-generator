import React from "react";
import Star from "@mui/icons-material/Star";
import StarOutlined from "@mui/icons-material/StarOutline";
import {useEffect} from "react";
import {Paper, Typography} from "@mui/material";

interface EmojiProps {
  htmlTag: string[];
  category: string;
}
interface FavoriteItem {
  htmlTag: string;
  category: string;
}

function saveToFavorites(htmlTag: string, category: string) {
  const favorites: FavoriteItem[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  if (!favorites.some(item => item.htmlTag === htmlTag)) {
    favorites.push({htmlTag, category});
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("saved to favorites");
  }
}

function removeFromFavorites(htmlTag: string) {
  const favorites: FavoriteItem[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  const updatedFavorites = favorites.filter(item => item.htmlTag !== htmlTag);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  console.log("removed from favorites");
}
function Emoji(props: EmojiProps): JSX.Element {
  const [isFav, setIsFav] = React.useState(false);
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorite: boolean = favorites.some(
      (item: FavoriteItem) =>
        item.htmlTag.toString() === props.htmlTag.join("_")
    );
    console.log("favorites", favorites);
    setIsFav(isFavorite);
    console.log("prop" + props.htmlTag.join("_"));
  }, [props.htmlTag, props.category]);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFromFavorites(props.htmlTag.join("_"));
      //   setIsFav(false);
    } else {
      saveToFavorites(props.htmlTag.join("_"), props.category);
      //   setIsFav(true);
    }
    setIsFav(!isFav);
  };
  return (
    <Paper
      elevation={4}
      sx={{
        p: 1,
        width: "160px",
        height: "190px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.htmlTag.length > 1 ? (
        <div>
          <Typography
            variant="h1"
            dangerouslySetInnerHTML={{
              __html: props.htmlTag[0] + props.htmlTag[1],
            }}
          />
        </div>
      ) : (
        <div>
          <Typography
            variant="h1"
            dangerouslySetInnerHTML={{
              __html: props.htmlTag[0],
            }}
          />
        </div>
      )}
      {isFav ? (
        <Star onClick={handleFavoriteClick} sx={{color: "#eb9b3b"}} />
      ) : (
        <StarOutlined onClick={handleFavoriteClick} sx={{color: "#eb9b3b"}} />
      )}
    </Paper>
  );
}

export default Emoji;
