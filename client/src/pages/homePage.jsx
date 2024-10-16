import { Link } from "react-router-dom";

export const HomePage = () => {


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-blue-600 mb-4">PillsReminder</h1>
                    <p className="text-lg text-gray-700 mb-8">
                        Organiza tus medicamentos y nunca olvides una dosis.
                    </p>

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

    )
}