import { useState, useEffect } from 'react';
import axios from 'axios';
import alarmSound from '../../../assets/sacame-del-bolsillo-ringtones-f.mp3';  // Asegúrate de agregar el archivo de sonido

export const AlarmChecker = () => {
    const [alarms, setAlarms] = useState([]);
    const [currentAlarm, setCurrentAlarm] = useState(null);
    const [isRinging, setIsRinging] = useState(false);
    const audio = new Audio(alarmSound);  // Cargar el sonido de alarma

    useEffect(() => {
        const fetchAlarms = async () => {
            try {
                const response = await axios.get("https://pillsreminder.onrender.com/alarms");
                setAlarms(response.data);  // Cargar las alarmas desde el servidor
            } catch (error) {
                console.error("Error al cargar las alarmas", error);
            }
        };

        fetchAlarms();

        // Verificar la hora cada segundo
        const interval = setInterval(() => {
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5); // HH:mm

            const alarmToRing = alarms.find(alarm => alarm.time === currentTime);
            if (alarmToRing) {
                console.log(alarmToRing);
                setCurrentAlarm(alarmToRing);
                setIsRinging(true);
                audio.play();  // Reproducir el sonido
            }
        }, 2000);

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, [alarms]);

    const stopAlarm = () => {
        setIsRinging(false);
        setCurrentAlarm(null);
        audio.pause();  // Detener el sonido
        audio.currentTime = 0;  // Reiniciar el sonido
    };




    return (
        <div>
            {isRinging && currentAlarm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Es hora de tomar tu medicamento</h2>
                        <p><strong>Medicamento:</strong> {currentAlarm.name}</p>
                        <p><strong>Hora:</strong> {currentAlarm.time}</p>
                        <p><strong>Descripción:</strong> {currentAlarm.description}</p>
                        <button
                            onClick={stopAlarm}
                            className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Detener alarma
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
