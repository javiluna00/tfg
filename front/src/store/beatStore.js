import { atom } from "recoil";

export const beatState = atom({
  key: "beatData",
  default: {
    filteredBeats: [],
    allBeats: [],
    beatsPopulares: [],
    filter: {},
  },
});