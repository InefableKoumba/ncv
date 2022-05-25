import { useState, forwardRef, useRef, useEffect } from "react";
import Modal from 'react-modal';
import QRCode from 'qrcode.react';
import ReactToPrint from 'react-to-print';

const baseURL = "http://franzer.net/api"

export function CarsListScreen() {
    const [carId, setcarId] = useState("")
    const [carsList, setcarsList] = useState([])

    const fetchCars = async () => {
        try {
            const response = await fetch(`${baseURL}/cars`)
            const cars = await response.json();
            setcarsList(cars)
        } catch (error) {
            console.log(error)
        }

    }

    const QRCodeRef = useRef();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(carId) {
        setcarId(carId)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        fetchCars()
    }, [])

    return (
        <div>
            <div className="mx-auto mb-8">
                <h2 className="text-2xl text-blue-800 font-bold mb-1">Liste des véhicules enregistrés</h2>
                <p>
                    Vous pouvez rechercher un véhicule particulier en utilisant son numéro matricule.
                </p>
            </div>
            <div className="bg-gray-50 p-8">
                <div className="text-lg font-bold">Liste des véhicules enregistrés</div>
                <div className="flex justify-end my-4">
                    <input type="text" placeholder="Matricule" className="border rounded px-2 py-1 border-gray-700 w-96" />
                </div>
                <hr />
                <div className="mt-4">
                    <ul className="flex w-full mb-2 gap-x-2">
                        <li className="font-semibold w-full py-1 px-1">Matricule</li>
                        <li className="font-semibold w-full py-1 px-1">Marque</li>
                        <li className="font-semibold w-full py-1 px-1">Propriétaire</li>
                        <li className="font-semibold w-full py-1 px-1">Téléphone</li>
                        <li className="font-semibold w-full py-1 px-1">QR</li>

                    </ul>
                    <div className="flex flex-col gap-y-2">
                        {carsList.map((car, i) => (
                            <ul key={i} className="flex w-full gap-x-2">
                                <li className="w-full py-1 px-1">{car.matricule}</li>
                                <li className="w-full py-1 px-1">{car.marque}</li>
                                <li className="w-full py-1 px-1">{car.owner.name} {car.owner.firstName}</li>
                                <li className="w-full py-1 px-1">{car.owner.telephone}</li>
                                <li className="w-full py-1 px-1">
                                    <button onClick={() => { openModal(car.id) }}>
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="qrIconTitle" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="#000000"> <title id="qrIconTitle">QR Code</title> <rect x="10" y="3" width="7" height="7" transform="rotate(90 10 3)" /> <rect width="1" height="1" transform="matrix(-1 0 0 1 7 6)" /> <rect x="10" y="14" width="7" height="7" transform="rotate(90 10 14)" /> <rect x="6" y="17" width="1" height="1" /> <rect x="14" y="20" width="1" height="1" /> <rect x="17" y="17" width="1" height="1" /> <rect x="14" y="14" width="1" height="1" /> <rect x="20" y="17" width="1" height="1" /> <rect x="20" y="14" width="1" height="1" /> <rect x="20" y="20" width="1" height="1" /> <rect x="21" y="3" width="7" height="7" transform="rotate(90 21 3)" /> <rect x="17" y="6" width="1" height="1" /> </svg>
                                    </button>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                style={
                    {
                        overlay: {
                            background: "#000000d4"
                        }
                    }
                }
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="w-1/2 h-1/2 mx-auto translate-y-1/2 bg-gray-50 shadow rounded"
            >
                <div className="h-full flex-col flex gap-y-8 justify-center items-center">
                    <QRCodeComponent carId={carId} ref={QRCodeRef} />
                    <ReactToPrint
                        trigger={() => {
                            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                            // to the root node of the returned component as it will be overwritten.
                            return <button className="bg-blue-800 px-4 py-2 text-white rounded">Imprimer</button>;
                        }}
                        content={() => QRCodeRef.current}
                    />

                </div>
            </Modal>
        </div>)
}

export const QRCodeComponent = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <QRCode size={250} value={props.carId} />
        </div>
    );
});