import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ViewAlarms = () => {
    const [alarms, setAlarms] = useState([]);
    const [message, setMessage] = useState("");
    const [editingAlarm, setEditingAlarm] = useState(null);
    const [formData, setFormData] = useState({ name: "", time: "", description: "" });
    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
    const [alarmToDelete, setAlarmToDelete] = useState(null); // Alarma a eliminar
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlarms = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/alarms");
                setAlarms(response.data);
            } catch (error) {
                console.error("Error al cargar las alarmas", error);
            }
        };

        fetchAlarms();
    }, []);

    // Mostrar el modal para confirmar la eliminación
    const confirmDelete = (alarm) => {
        setAlarmToDelete(alarm); // Guardar la alarma seleccionada
        setShowModal(true); // Mostrar el modal
    };

    // Manejar la eliminación de una alarma
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/alarms/${alarmToDelete.id}`);
            setAlarms(alarms.filter((alarm) => alarm.id !== alarmToDelete.id));
            setMessage("Alarma eliminada con éxito.");
        } catch (error) {
            setMessage("Error al eliminar la alarma.");
            console.error(error);
        } finally {
            setShowModal(false); // Cerrar el modal
        }
    };

    const handleEdit = (alarm) => {
        setEditingAlarm(alarm);
        setFormData({ name: alarm.name, time: alarm.time, description: alarm.description });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedAlarm = await axios.put(`http://localhost:4000/api/alarms/${editingAlarm.id}`, formData);
            setAlarms(alarms.map((alarm) => (alarm.id === editingAlarm.id ? updatedAlarm.data : alarm)));
            setMessage("Alarma actualizada con éxito.");
            setEditingAlarm(null);
        } catch (error) {
            setMessage("Error al actualizar la alarma.");
            console.error(error);
        }
    };

    const handleAddAlarm = () => {
        navigate("/alarms/addAlarms");
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Tus Alarmas</h2>
            <p>Tienes un máximo de <span className="font-bold">3 Alarmas</span> a registrar dentro del sistema.</p>

            {message && <p className="mb-4 text-center text-green-500">{message}</p>}

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
                        onClick={() => setEditingAlarm(null)}
                        className="ml-4 px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancelar
                    </button>
                </form>
            )}

            {alarms.length < 3 && (
                <button
                    onClick={handleAddAlarm}
                    className="mb-6 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Agregar Nueva Alarma
                </button>
            )}

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
                                <h3 className="text-xl font-semibold text-gray-800">{alarm.name}</h3>
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
                                    onClick={() => confirmDelete(alarm)}
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal de confirmación */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">¿Estás seguro de que quieres eliminar esta alarma?</h2>
                        <p>{alarmToDelete.name}</p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="ml-4 px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
