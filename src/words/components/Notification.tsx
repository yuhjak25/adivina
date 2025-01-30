import { EstadoJuego } from '../../type.d'

type NotificationProps = {
  message: string | null
  palabraOculta: string
  intentos: number
  pistas: string[]
  estadoJuego: EstadoJuego
}

const Notification = ({
  message,
  palabraOculta,
  intentos,
  pistas,
  estadoJuego,
}: NotificationProps) => {
  return (
    <div>
      {message && (
        <p
          className={`${
            estadoJuego === EstadoJuego.WIN
              ? 'text-green-500 ml-8'
              : estadoJuego === EstadoJuego.LOST
              ? 'text-red-500 ml-8'
              : 'text-red-300 ml-8'
          }`}>
          {message}
        </p>
      )}
      {estadoJuego === EstadoJuego.LOST && (
        <p className="text-white ml-8">La palabra era: {palabraOculta}</p>
      )}
      {estadoJuego === EstadoJuego.PLAYING && intentos >= 2 && (
        <p className="text-yellow-300 ml-8">
          🔎 Pista: {pistas[pistas.length - 1]}
        </p>
      )}
    </div>
  )
}

export default Notification
