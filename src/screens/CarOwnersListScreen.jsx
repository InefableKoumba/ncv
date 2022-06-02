import { useState, useEffect } from "react";
import { Modal, Table } from '@mantine/core';

const baseURL = "https://ncvserver.herokuapp.com/api"

export function CarOwnersListScreen() {
    const [carOwners, setcarOwners] = useState([])
    const [cars, setcars] = useState([])
    const [opened, setOpened] = useState(false)

    const findCarsByOwnerId = async (id) => {
        try {
            const response = await fetch(`${baseURL}/cars/findByOwnerId/${id}`)
            const cars = await response.json();
            console.log("RESPONSE")
            console.log(cars)
            setcars(cars)
            setOpened(true)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCarOwners = async () => {
        try {
            const response = await fetch(`${baseURL}/car-owners`)
            const carOwners = await response.json();
            setcarOwners(carOwners)
            console.log(cars)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchCarOwners()
    }, [])
    return <div>
        <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title="Liste des véhicules"
            size="50%"

        >
            <Table className="w-max">
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Genre</th>
                        <th>Marque</th>
                        <th>Numéro de moteur</th>
                        <th>Mise en circulation</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.matricule}>
                            <td>{car.matricule}</td>
                            <td>{car.genre}</td>
                            <td>{car.marque}</td>
                            <td>{car.num_moteur}</td>
                            <td>{car.annee_mise_circulation}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Modal>
        <div className="mx-auto mb-8">
            <h2 className="text-2xl text-blue-800 font-bold mb-1">Liste propriétaires de véhicules enregistrés</h2>
            <p>
                Vous pouvez rechercher un propriétaire de véhicule particulier par son nom ou son prénom.
            </p>
        </div>
        <div className="bg-gray-50 p-8">
            <div className="text-lg font-bold">Liste des propriétaires de véhicules enregistrés</div>
            <div className="flex justify-end my-4">
                <input type="text" placeholder="Recherchez par nom(s) ou prénom(s)" className="border rounded px-2 py-1 border-gray-700 w-96" />
            </div>
            <hr />
            <div className="mt-4">
                <ul className="flex w-full mb-2 gap-x-2">
                    <li className="font-semibold w-full py-1 px-1">Noms</li>
                    <li className="font-semibold w-full py-1 px-1">Prénoms</li>
                    <li className="font-semibold w-full py-1 px-1">Adresse</li>
                    <li className="font-semibold w-full py-1 px-1">Téléphone</li>
                    <li className="font-semibold w-full py-1 px-1">Action</li>

                </ul>
                <div className="flex flex-col gap-y-2">
                    {carOwners.map((carOwner, i) => (<ul key={i} className="flex w-full gap-x-2">
                        <li className="w-full py-1 px-1">{carOwner.name}</li>
                        <li className="w-full py-1 px-1">{carOwner.firstName}</li>
                        <li className="w-full py-1 px-1">{carOwner.adresse}</li>
                        <li className="w-full py-1 px-1">{carOwner.telephone}</li>
                        <li className="w-full py-1 px-1">
                            <button onClick={() => { findCarsByOwnerId(carOwner.id) }} className="bg-blue-700 text-xs text-white p-2 rounded">Voir véhicules</button>
                        </li>
                    </ul>))}
                </div>
            </div>
        </div>
    </div>
}