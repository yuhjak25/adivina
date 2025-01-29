import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks/store'
import { tryWord } from './words/reducers/words'
import { EstadoJuego } from './type.d'

const App = () => {
  const dispatch = useAppDispatch()
  const intentos = useAppSelector((state) => state.words.intentos)
  const palabraOculta = useAppSelector((state) => state.words.palabraOculta)
  const estadoJuego = useAppSelector((state) => state.words.estadoJuego)

  const [wordInput, setWordInput] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (estadoJuego === EstadoJuego.LOST) {
      setMessage('❌ Has perdido, se acabaron los intentos!')
    }
  }, [estadoJuego])

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
      <h1>Adivina la palabra!</h1>

      {message && <p>{message}</p>}
      <form onSubmit={checkTry}>
        <input
          type="text"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          placeholder="Intenta adivinar la palabra!"
        />
        <button type="submit">Intentar</button>
      </form>
      <p>Número de intentos: {6 - intentos}</p>
    </>
  )
}

export default App
