import { useState, useEffect } from "react";

const baseURL = "http://franzer.net/api"

export function MobileAppUsersListScreen() {
    const [usersList, setusersList] = useState([])

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${baseURL}/users`)
            const users = await response.json();
            setusersList(users)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            <div className="mx-auto mb-8">
                <h2 className="text-2xl text-blue-800 font-bold mb-1">Liste des agents</h2>
                <p>
                    Vous pouvez rechercher un agent particulier en utilisant son numéro nom.
                </p>
            </div>
            <div className="bg-gray-50 p-8">
                <div className="text-lg font-bold">Liste des agents enregistrés</div>
                <div className="flex justify-end my-4">
                    <input type="text" placeholder="Matricule" className="border rounded px-2 py-1 border-gray-700 w-96" />
                </div>
                <hr />
                <div className="mt-4">
                    <ul className="flex w-full mb-2 gap-x-2">
                        <li className="font-semibold w-full py-1 px-1">Nom(s)</li>
                        <li className="font-semibold w-full py-1 px-1">Prénom(s)</li>
                        <li className="font-semibold w-full py-1 px-1">Téléphone</li>
                    </ul>
                    <div className="flex flex-col gap-y-2">
                        {usersList.map((user, i) => (
                            <ul key={i} className="flex w-full gap-x-2">
                                <li className="w-full py-1 px-1">{user.name}</li>
                                <li className="w-full py-1 px-1">{user.firstName}</li>
                                <li className="w-full py-1 px-1">{user.telephone}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>)
}
