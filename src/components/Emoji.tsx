import React from "react";
import Icon from "@mui/material/Icon";
import Star from "@mui/icons-material/Star";
import StarOutlined from "@mui/icons-material/StarOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {useEffect} from "react";
import {Paper, Typography} from "@mui/material";

interface EmojiProps {
  htmlTag: string[];
}
function saveToFavorites(htmlTag: string) {
  localStorage.setItem(htmlTag, htmlTag);
  console.log("saved to favorites");
}
function removeFromFavorites(htmlTag: string) {
  console.log(htmlTag);
  localStorage.removeItem(htmlTag);
}
function Emoji(props: EmojiProps): JSX.Element {
  const [isFav, setIsFav] = React.useState(false);
  useEffect(() => {
    setIsFav(!!localStorage.getItem(props.htmlTag.join("_")));
  }, [props.htmlTag]);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFromFavorites(props.htmlTag.join("_"));
      //   setIsFav(false);
    } else {
      saveToFavorites(props.htmlTag.join("_"));
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
