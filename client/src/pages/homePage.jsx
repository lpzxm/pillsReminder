import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
    const [currentTime, setCurrentTime] = useState("");

    // Función para formatear la hora en formato de 12 horas
    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convertir a formato de 12 horas
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
        const secondsStr = seconds < 10 ? `0${seconds}` : seconds;
        return `${hours}:${minutesStr}:${secondsStr} ${ampm}`;
    };

    // Actualizar el tiempo cada segundo
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(formatTime(now));
        };
        updateClock(); // Actualizar de inmediato
        const intervalId = setInterval(updateClock, 1000); // Actualizar cada segundo

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-blue-600 mb-4">PillsReminder</h1>
                    <p className="text-lg text-gray-700 mb-8">
                        Organiza tus medicamentos y nunca olvides una dosis.
                    </p>

                    {/* Mostrar el reloj */}
                    <div className="text-2xl font-semibold text-gray-800 mb-8">
                        Hora actual: {currentTime}
                    </div>

                    <div className="flex justify-center space-x-4">
                        <Link to="/alarms/addAlarms">
                            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                Añadir Alarma
                            </button>
                        </Link>
                        <Link to="/alarms">
                            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                                Ver Alarmas
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
