import { useState, useEffect } from "react";
import { Autocomplete, Table, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Check, X } from 'tabler-icons-react';
import { Bill } from "../components/Bill";

const baseURL = "https://ncvserver.herokuapp.com/api"

export function GenerateBillScreen() {
    let selectedCarId = null
    const [confirmationModalIsOpened, setconfirmationModalIsOpened] = useState(false);
    const [carMatricules, setcarMatricules] = useState([])
    const [generatedBill, setgeneratedBill] = useState(null)
    const [cars, setcars] = useState([])
    const [selectedCarMatricule, setselectedCarMatricule] = useState("")
    const [isBillGenerationConfirmed, setisBillGenerationConfirmed] = useState(false)

    const fetchCars = async () => {
        try {
            const response = await fetch(`${baseURL}/cars`)
            const cars = await response.json();
            const matricules = cars.map(car => car.matricule)
            setcars(cars)
            setcarMatricules(matricules)
        } catch (error) {
            console.log(error)
        }
    }

    const generateBill = async (carId) => {
        showNotification({
            loading: true,
            title: 'Notification',
            message: 'Opération en cours',
        })
        try {
            const response = await fetch(`${baseURL}/bills`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ carId })
            })
            setgeneratedBill(await response.json())
            if (response.status === 201) {
                setisBillGenerationConfirmed(true)
                showNotification({
                    icon: <Check size={18} />,
                    title: 'Notification',
                    message: 'Reçu généré avec succès',
                })
            } else {
                showNotification({
                    icon: <X size={18} />,
                    title: 'Notification',
                    message: 'Opération échouée',
                })
            }

        } catch (error) {
            showNotification({
                icon: <X size={18} />,
                title: 'Notification',
                message: 'Opération échouée',
            })
        }
    }
    useEffect(() => {
        fetchCars()
    }, [])


    return <div>
        <Modal
            opened={confirmationModalIsOpened}
            onClose={() => setconfirmationModalIsOpened(false)}
            title="Important !"
            centered
        >
            <p>Voulez-vous vraiment générer un reçu ?</p>
            <div className='flex gap-x-4 justify-center py-4'>
                <button onClick={async () => {
                    setconfirmationModalIsOpened(false)
                }} className='bg-red-600 text-white rounded px-4 py-2'>Annuler</button>
                <button onClick={() => {
                    generateBill(selectedCarId)
                    setconfirmationModalIsOpened(false)
                }} className='bg-blue-600 text-white rounded px-4 py-2'>Confirmer</button>
            </div>
        </Modal>
        <div>
            {isBillGenerationConfirmed ?
                <Bill data={{
                    billCode: generatedBill.code,
                    carOwnerFirstName: generatedBill.car.owner.firstName,
                    readableCreationDate: generatedBill.readableCreationDate,
                    readableExpirationDate: generatedBill.readableExpirationDate,
                    carOwnerId: generatedBill.car.ownerId,
                    carOwnerName: generatedBill.car.owner.name,
                    carOwnerTelephone: generatedBill.car.owner.telephone
                }} /> :
                (<>
                    <div className="mx-auto mb-8">
                        <h2 className="text-2xl text-blue-800 font-bold mb-1">Générer un reçu</h2>
                        <p>Générer un reçu</p>
                    </div><div className="bg-gray-50 p-8">
                        <div className="mt-4 gap-x-4">
                            <div className="w-full">
                                <Autocomplete
                                    label="Rechercher un véhicule"
                                    placeholder="Rechercher un véhicule par matricule"
                                    data={carMatricules}
                                    onChange={(value) => setselectedCarMatricule(value)} />
                            </div>
                            {cars.map(car => {
                                if (car.matricule === selectedCarMatricule) {
                                    selectedCarId = car.id
                                    return (<div className='shadow bg-gray-100' key={car.matricule}>
                                        <Table className='mt-14'>
                                            <thead>
                                                <tr>
                                                    <th>Nom(s)</th>
                                                    <th>Prénom(s)</th>
                                                    <th>Téléphone</th>
                                                    <th>Matricule véhicule</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{car.owner.name}</td>
                                                    <td>{car.owner.firstName}</td>
                                                    <td>{car.owner.telephone}</td>
                                                    <td>{car.matricule}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                setconfirmationModalIsOpened(true)
                                                            }}
                                                            className='text-white px-2 py-1 rounded bg-blue-700'>
                                                            Générer
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>);
                                } else {
                                    return null
                                }
                            })}

                        </div>
                    </div>
                </>)
            }
        </div>


    </div>
}

