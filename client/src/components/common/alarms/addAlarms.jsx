// src/components/AddAlarm.js
import { useState } from "react";
import axios from "axios";

export const AddAlarm = () => {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAlarm = {
            name,
            time,
            description,
        };

        try {
            const response = await axios.post("https://pillsreminder.onrender.com/api/alarms", newAlarm);
            if (response.status === 201) {
                setMessage("Alarma añadida con éxito.");
                setName("");
                setTime("");
                setDescription("");
            }
        } catch (error) {
            setMessage("Hubo un error al añadir la alarma.");
            console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Añadir Alarma</h2>
            {message && <p className="mb-4 text-center text-green-500">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Nombre del Medicamento
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Ibuprofeno"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">
                        Hora de Toma
                    </label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descripción de la dosis o instrucciones adicionales"
                    ></textarea>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Añadir Alarma
                    </button>
                </div>
            </form>
        </div>
    );
}
