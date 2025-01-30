import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks/store'
import { showHint, tryWord } from './words/reducers/words'
import { EstadoJuego } from './type.d'

const App = () => {
  const dispatch = useAppDispatch()
  const intentos = useAppSelector((state) => state.words.intentos)
  const palabraOculta = useAppSelector((state) => state.words.palabraOculta)
  const estadoJuego = useAppSelector((state) => state.words.estadoJuego)
  const pistas = useAppSelector((state) => state.words.pistas)

  const [wordInput, setWordInput] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (estadoJuego === EstadoJuego.LOST) {
      setMessage('❌ Has perdido, se acabaron los intentos!')
    }
  }, [estadoJuego])

  useEffect(() => {
    if (intentos === 2) {
      dispatch(showHint())
    } else if (intentos === 4) {
      dispatch(showHint())
    }
  }, [intentos, dispatch])

  const checkTry = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(tryWord(wordInput))

    if (palabraOculta === wordInput) {
      setMessage('🪅 Has ganado!')
    } else {
      setMessage(
        `❌ Inténtalo de nuevo, todavía te quedan ${6 - intentos - 1} intentos`
      )
    }

    setWordInput('')
  }

  return (
    <>
      <h1 className="flex items-center justify-center p-4 text-4xl font-bold text-white ">
        ¡Adivina la palabra!
      </h1>

      {message && (
        <p
          className={`${
            estadoJuego === EstadoJuego.WIN
              ? 'text-green-500 ml-5'
              : estadoJuego === EstadoJuego.LOST
              ? 'text-red-500 ml-5'
              : 'text-red-300 ml-5'
          }`}>
          {message}
        </p>
      )}
      {estadoJuego === EstadoJuego.LOST && (
        <p className="text-white ml-5">La palabra era: {palabraOculta}</p>
      )}
      {estadoJuego === EstadoJuego.PLAYING && intentos >= 2 && (
        <p className="text-yellow-300 ml-5">
          🔎 Pista: {pistas[pistas.length - 1]}
        </p>
      )}

      <form onSubmit={checkTry} className="text-white p-4">
        <input
          type="text"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          disabled={estadoJuego !== EstadoJuego.PLAYING}
          placeholder="Intenta adivinar la palabra!"
          className="p-3 m-2 bg-gray-800 rounded-full disabled:cursor-not-allowed disabled:hover:bg-gray-600"
        />
        <button
          type="submit"
          className="p-3 m-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-800 
             disabled:cursor-not-allowed disabled:bg-gray-800 disabled:hover:bg-gray-600"
          disabled={estadoJuego !== EstadoJuego.PLAYING}>
          Intentar
        </button>
      </form>
      {estadoJuego !== EstadoJuego.WIN && (
        <p className="ml-8 text-white">
          Número de intentos restantes:{' '}
          <span className="text-blue-400">{6 - intentos}</span>
        </p>
      )}
    </>
  )
}

export default App
