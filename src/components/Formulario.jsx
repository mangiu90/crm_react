import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = yup.object().shape({
        nombre: yup.string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        empresa: yup.string().required('El nombre de la empresa es obligatorio'),
        email: yup.string().email('Email debe ser válido').required('El email es obligatorio'),
        telefono: yup.number().positive().integer().typeError('Número no válido'),
        notas: yup.string(),
    });

    const handleSubmit = async (values) => {
        try {
            if (cliente.id) {
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                const respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await respuesta.json()
                navigate(`/clientes/${cliente.id}`)
            } else {
                const url = import.meta.env.VITE_API_URL
                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await respuesta.json()
                navigate('/clientes')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='font-bold text-gray-600 text-xl uppercase text-center'>{cliente?.id ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? '',
                    }}

                    enableReinitialize={true}

                    validationSchema={nuevoClienteSchema}

                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)

                        resetForm()
                    }}
                >
                    {({ errors, touched }) => {

                        return (
                            <Form className='mt-10'>
                                <div className='mb-4'>
                                    <label
                                        htmlFor="nombre"
                                        className='text-gray-800'
                                    >
                                        Nombre:
                                    </label>

                                    <Field
                                        id='nombre'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Nombre del cliente'
                                        name='nombre'
                                    />

                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="empresa"
                                        className='text-gray-800'
                                    >
                                        Empresa:
                                    </label>

                                    <Field
                                        id='empresa'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Empresa del cliente'
                                        name='empresa'
                                    />

                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="email"
                                        className='text-gray-800'
                                    >
                                        Email:
                                    </label>

                                    <Field
                                        id='email'
                                        type='email'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Email del cliente'
                                        name='email'
                                    />

                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="telefono"
                                        className='text-gray-800'
                                    >
                                        Teléfono:
                                    </label>

                                    <Field
                                        id='telefono'
                                        type='tel'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Teléfono del cliente'
                                        name='telefono'
                                    />

                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="notas"
                                        className='text-gray-800'
                                    >
                                        Notas:
                                    </label>

                                    <Field
                                        id='notas'
                                        type='text'
                                        as='textarea'
                                        className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                        placeholder='Notas del cliente'
                                        name='notas'
                                    />

                                    {errors.notas && touched.notas ? (
                                        <Alerta>{errors.notas}</Alerta>
                                    ) : null}
                                </div>

                                <input
                                    type="submit"
                                    value={cliente?.id ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className='mt-5 w-full p-3 bg-blue-800 text-white uppercase font-bold text-lg'
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
