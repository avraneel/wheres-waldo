import waldoUrl from "./assets/waldo.png";
import wendaUrl from "./assets/wenda.png";
import odlawUrl from "./assets/odlaw.png";

interface CharacterDetails {
  name: string;
  imgUrl: string;
  done: boolean;
}

export const boundingBoxLength: number = 100;

export const characters: CharacterDetails[] = [
  {
    name: "Waldo",
    imgUrl: waldoUrl,
    done: false,
  },
  {
    name: "Wenda",
    imgUrl: wendaUrl,
    done: false,
  },
  {
    name: "Odlaw",
    imgUrl: odlawUrl,
    done: false,
  },
];
