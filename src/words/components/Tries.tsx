import { EstadoJuego } from '../../type.d'

type TriesProps = {
  estadoJuego: EstadoJuego
  intentos: number
}

const Tries = ({ estadoJuego, intentos }: TriesProps) => {
  return (
    <div>
      {estadoJuego !== EstadoJuego.WIN && (
        <p className="ml-8 text-white">
          Número de intentos restantes:{' '}
          <span className="text-blue-400">{6 - intentos}</span>
        </p>
      )}
    </div>
  )
}

export default Tries
