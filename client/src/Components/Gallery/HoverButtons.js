import React from "react";

import Trash from "../../images/trash.png";
import Heart from "../../images/heart.png";
import Unheart from "../../images/unheart.png";
import PermanentlyDelete from "../../images/permanentlydelete.png";
import Restore from "../../images/restore.png";

function HoverButtons(props) {
  const { images, image, setImages, page } = props;

  function trashImage() {
    fetch("/api/manage/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameinserver: images[image.value].nameinserver,
        id: localStorage.getItem("id"),
      }),
    })
      .then((res) => {
        setImages((prevImages) => {
          prevImages.splice(image.value, 1);
          const newData = prevImages.map((newimage) => {
            return {
              ...newimage,
              value:
                newimage.value > image.value
                  ? newimage.value - 1
                  : newimage.value,
            };
          });
          return newData;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function likeUnlikeImage(image, bool) {
    fetch("/api/manage/likeunlike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("id"),
        nameinserver: image.nameinserver,
        value: bool,
      }),
    })
      .then(async (res) => {
        setImages((prevImages) => {
          if (!bool && page === "favorites") {
            prevImages.splice(image.value, 1);
            const newData = prevImages.map((newimage) => {
              return {
                ...newimage,
                value:
                  newimage.value > image.value
                    ? newimage.value - 1
                    : newimage.value,
              };
            });
            return newData;
          }
          const newData = prevImages.map((rerenderImage) => {
            return {
              ...rerenderImage,
              isfavorited:
                image === rerenderImage ? bool : rerenderImage.isfavorited,
            };
          });
          return newData;
        });
      })
      .catch((err) => {
        return console.log(err);
      });
  }
  return (
    <div id="hoverbuttons--buttons">
      {(() => {
        if (page === "gallery") {
          return (
            <>
              <img
                src={Trash}
                alt="trash"
                id="hoverbuttons--trash"
                title="Put in trash"
                onClick={() => {
                  trashImage();
                }}
              />
              {images[image.value].isfavorited ? (
                <img
                  src={Heart}
                  alt="liked"
                  title="Unlike image"
                  id="hoverbuttons--heart-unheart"
                  onClick={(e) => {
                    likeUnlikeImage(images[image.value], false);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              ) : (
                <img
                  src={Unheart}
                  alt="not liked"
                  title="Like image"
                  id="hoverbuttons--heart-unheart"
                  onClick={() => {
                    likeUnlikeImage(images[image.value], true);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              )}
            </>
          );
        }
        if (page === "trash") {
          return (
            <>
              <img
                src={PermanentlyDelete}
                alt="trash"
                id="hoverbuttons--permanently-delete"
                title="Permanently delete image"
                onClick={() => {}}
              />
              <img
                src={Restore}
                alt="restore"
                title="Restore image"
                onClick={() => {}}
              />
            </>
          );
        }
        if (page === "favorites") {
          return (
            <>
              <img
                src={Trash}
                alt="trash"
                id="hoverbuttons--trash"
                title="Put in trash"
                onClick={() => {
                  trashImage();
                }}
              />
              <img
                src={Heart}
                alt="liked"
                title="Unlike"
                id="hoverbuttons--heart-unheart"
                onClick={(e) => {
                  likeUnlikeImage(images[image.value], false);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </>
          );
        }
      })()}
    </div>
  );
}

export default HoverButtons;
