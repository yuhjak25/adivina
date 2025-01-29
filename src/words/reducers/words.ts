import { createSlice } from '@reduxjs/toolkit'
import { EstadoJuego, WordsState } from '../../type.d'

const initialState: WordsState = {
  palabraOculta: 'ejemplo',
  intentos: 0,
  maxIntentos: 6,
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
  },
})

export const { tryWord } = wordsSlice.actions
export default wordsSlice.reducer
