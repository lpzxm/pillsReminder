import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirección

export const ViewAlarms = () => {
    // Estado para almacenar las alarmas
    const [alarms, setAlarms] = useState([]);
    const [message, setMessage] = useState("");
    const [editingAlarm, setEditingAlarm] = useState(null); // Alarma en edición
    const [formData, setFormData] = useState({ name: "", time: "", description: "" }); // Datos del formulario
    const navigate = useNavigate(); // Hook para redirección

    // Cargar las alarmas al montar el componente
    useEffect(() => {
        const fetchAlarms = async () => {
            try {
                const response = await axios.get("https://pillsreminder.onrender.com/api/alarms");
                setAlarms(response.data); // Guardar las alarmas en el estado
            } catch (error) {
                console.error("Error al cargar las alarmas", error);
            }
        };

        fetchAlarms();
    }, []);

    // Manejar la eliminación de una alarma
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://pillsreminder.onrender.com/api/alarms/${id}`);
            setAlarms(alarms.filter((alarm) => alarm.id !== id)); // Eliminar del estado
            setMessage("Alarma eliminada con éxito.");
        } catch (error) {
            setMessage("Error al eliminar la alarma.");
            console.error(error);
        }
    };

    // Manejar la edición de una alarma
    const handleEdit = (alarm) => {
        setEditingAlarm(alarm);
        setFormData({ name: alarm.name, time: alarm.time, description: alarm.description }); // Prellenar datos
    };

    // Manejar el cambio en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Manejar la actualización de una alarma
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedAlarm = await axios.put(`https://pillsreminder.onrender.com/api/alarms/${editingAlarm.id}`, formData);
            setAlarms(alarms.map((alarm) => (alarm.id === editingAlarm.id ? updatedAlarm.data : alarm))); // Actualizar en el estado
            setMessage("Alarma actualizada con éxito.");
            setEditingAlarm(null); // Cerrar el formulario
        } catch (error) {
            setMessage("Error al actualizar la alarma.");
            console.error(error);
        }
    };

    // Manejar la redirección para agregar una nueva alarma
    const handleAddAlarm = () => {
        navigate("/alarms/addAlarms"); // Cambia esto a la ruta que estés usando para agregar alarmas
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Tus Alarmas</h2>

            {/* Mensaje de éxito o error */}
            {message && <p className="mb-4 text-center text-green-500">{message}</p>}

            {/* Mostrar formulario de edición si hay una alarma en edición */}
            {editingAlarm && (
                <form onSubmit={handleUpdate} className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Editar Alarma</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Actualizar Alarma
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditingAlarm(null)} // Cerrar el formulario
                        className="ml-4 px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancelar
                    </button>
                </form>
            )}

            {/* Botón para agregar una nueva alarma */}
            {alarms.length < 3 && ( // Mostrar el botón solo si hay menos de 3 alarmas
                <button
                    onClick={handleAddAlarm}
                    className="mb-6 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Agregar Nueva Alarma
                </button>
            )}

            {/* Mostrar lista de alarmas */}
            {alarms.length === 0 ? (
                <p className="text-center text-gray-500">No hay alarmas disponibles.</p>
            ) : (
                <ul className="space-y-4">
                    {alarms.map((alarm) => (
                        <li
                            key={alarm.id}
                            className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {alarm.name}
                                </h3>
                                <p className="text-gray-600">Hora: {alarm.time}</p>
                                <p className="text-gray-600">{alarm.description}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleEdit(alarm)}
                                    className="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(alarm.id)}
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
