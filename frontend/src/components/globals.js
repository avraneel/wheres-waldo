import waldoUrl from "../assets/waldo-128w.avif";
import wendaUrl from "../assets/wenda-128w.avif";
import odlawUrl from "../assets/odlaw-128w.avif";

export const boundingBoxLength = 100;

export const characters = [
  {
    name: "Waldo",
    imgUrl: waldoUrl,
    found: false,
    clickedX: 0,
    clickedY: 0,
    drawn: false,
  },
  {
    name: "Wenda",
    imgUrl: wendaUrl,
    found: false,
    clickedX: 0,
    clickedY: 0,
    drawn: false,
  },
  {
    name: "Odlaw",
    imgUrl: odlawUrl,
    found: false,
    clickedX: 0,
    clickedY: 0,
    drawn: false,
  },
];

export const url = "https://wheres-waldo-a5ua.onrender.com";
