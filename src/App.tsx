import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks/store'
import { showHint, tryWord } from './words/reducers/words'
import { EstadoJuego } from './type.d'
import Notification from './words/components/Notification'
import WordForm from './words/components/WordForm'
import Title from './words/components/Title'
import Tries from './words/components/Tries'

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
      <Title />
      <Notification
        message={message}
        intentos={intentos}
        palabraOculta={palabraOculta}
        pistas={pistas}
        estadoJuego={estadoJuego}
      />
      <WordForm
        checkTry={checkTry}
        estadoJuego={estadoJuego}
        setWordInput={setWordInput}
        wordInput={wordInput}
      />
      <Tries estadoJuego={estadoJuego} intentos={intentos} />
    </>
  )
}

export default App
