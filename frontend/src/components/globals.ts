import waldoUrl from "../assets/waldo-128w.avif";
import wendaUrl from "../assets/wenda-128w.avif";
import odlawUrl from "../assets/odlaw-128w.avif";

interface CharacterDetails {
  name: string;
  imgUrl: string;
  done: boolean;
}

export const boundingBoxLength: number = 100;

export type Status = "unfound" | "found" | "wrong" | "done";
export type EventType<T> = React.MouseEvent<T>;
export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

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
