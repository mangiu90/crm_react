import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Spinner from "../components/Spinner";

const VerCliente = () => {

    const { id } = useParams()

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error);
            }
            setCargando(false)
        }

        obtenerClienteAPI()
    }, [])

    return (
        <>
            {cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <h1>No hay resultado</h1> : (
                <>
                    <h1 className='font-black text-4xl text-blue-900'>Ver Cliente</h1>

                    <p className="mt-3">Informacion del cliente</p>

                    {cliente.nombre && (
                        <p className="text-4xl text-gray-700 mt-10">
                            <span className="text-gray-800 uppercase font-bold">Nombre: </span>
                            {cliente.nombre}
                        </p>
                    )}

                    {cliente.email && (
                        <p className="text-2xl text-gray-700 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Email: </span>
                            {cliente.email}
                        </p>
                    )}

                    {cliente.telefono && (
                        <p className="text-2xl text-gray-700 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Teléfono: </span>
                            {cliente.telefono}
                        </p>
                    )}

                    {cliente.empresa && (
                        <p className="text-2xl text-gray-700 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Empresa: </span>
                            {cliente.empresa}
                        </p>
                    )}

                    {cliente.notas && (
                        <p className="text-2xl text-gray-700 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Notas: </span>
                            {cliente.notas}
                        </p>
                    )}
                </>
            )}

        </>
    )
}

export default VerCliente
