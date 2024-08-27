import React from "react";
import Star from "@mui/icons-material/Star";
import StarOutlined from "@mui/icons-material/StarOutline";
import {useEffect} from "react";
import {Paper, Typography} from "@mui/material";
import useFavStore from "../queries/favState";
interface EmojiProps {
  htmlTag: string[];
  category: string;
}
interface FavoriteItem {
  htmlTag: string;
  category: string;
}
function removeFromFavorites(htmlTag: string) {
  const favorites: FavoriteItem[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  const updatedFavorites = favorites.filter(item => item.htmlTag !== htmlTag);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  useFavStore.setState({favItems: updatedFavorites});
  console.log("removed from favorites");
}
function saveToFavorites(htmlTag: string, category: string) {
  const favorites: FavoriteItem[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  if (!favorites.some(item => item.htmlTag === htmlTag)) {
    favorites.push({htmlTag, category});
    localStorage.setItem("favorites", JSON.stringify(favorites));
    useFavStore.setState({favItems: favorites});
    console.log("saved to favorites");
  }
}
function EmojiXs(props: EmojiProps): JSX.Element {
  const [isFav, setIsFav] = React.useState(false);
  const favorites = useFavStore(state => state.favItems);
  useFavStore.subscribe(l => {
    l.update;
  });
  useEffect(() => {
    //  const favorites = useFavStore(state => state.favItems);

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
        width: "90px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.htmlTag.length > 1 ? (
        <div>
          <Typography
            variant="h2"
            dangerouslySetInnerHTML={{
              __html: props.htmlTag[0] + props.htmlTag[1],
            }}
          />
        </div>
      ) : (
        <div>
          <Typography
            variant="h2"
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

export default EmojiXs;
