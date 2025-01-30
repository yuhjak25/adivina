export enum EstadoJuego {
  PLAYING = 'playing',
  WIN = 'win',
  LOST = 'lost',
}

export interface WordsState {
  palabraOculta: string
  intentos: number
  maxIntentos: number
  pistas: string[]
  estadoJuego: EstadoJuego
}
