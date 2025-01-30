import { EstadoJuego } from '../../type.d'

type WordFormProps = {
  checkTry: (event: React.FormEvent) => void
  wordInput: string
  setWordInput: (value: string) => void
  estadoJuego: EstadoJuego
}

const WordForm = ({
  checkTry,
  wordInput,
  setWordInput,
  estadoJuego,
}: WordFormProps) => {
  return (
    <div>
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
    </div>
  )
}

export default WordForm
