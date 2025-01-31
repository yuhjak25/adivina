import { createSlice } from '@reduxjs/toolkit'
import { EstadoJuego, WordsState } from '../../type.d'

const initialState: WordsState = {
  palabraOculta: 'ejemplo',
  intentos: 0,
  maxIntentos: 6,
  pistas: [''],
  estadoJuego: EstadoJuego.PLAYING,
}

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    tryWord: (state, action) => {
      if (state.palabraOculta === action.payload) {
        state.estadoJuego = EstadoJuego.WIN
      } else {
        state.intentos++
        if (state.intentos >= state.maxIntentos) {
          state.estadoJuego = EstadoJuego.LOST
        }
      }
    },
    showHint: (state) => {
      if (state.intentos === 2) {
        state.pistas = ['La palabra empieza por la letra E']
      } else if (state.intentos === 4) {
        state.pistas = ['La palabra termina por la letra O']
      }
    },
  },
})

export const { tryWord, showHint } = wordsSlice.actions
export default wordsSlice.reducer
