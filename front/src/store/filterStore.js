import { atom } from "recoil";



export const filterStore = atom({
  key: "filterOptions",
  default: {
    bpm_from: 0,
    bpm_to: 999,
    generos: [],
    escalas: [],
    precio_from: 0,
    precio_to: 999,
    moods: [],
    destacado: false
  },
});

