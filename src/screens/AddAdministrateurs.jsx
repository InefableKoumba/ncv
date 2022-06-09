import { useState } from "react";
import Modal from 'react-modal';
import { Check, Error404 } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

const baseURL = "https://ncvserver.herokuapp.com/api";

export function AddAdministrateurs() {
    const [name, setname] = useState("")
    const [firstName, setfirstName] = useState("")
    const [fonction, setfonction] = useState("")
    const [bloc, setbloc] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const saveData = async () => {
        try {
            const response = await fetch(`${baseURL}/administrators`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": name,
                    "firstName": firstName,
                    "email": email,
                    "fonction": fonction,
                    "bloc": bloc,
                    "password": password
                })
            })
            if (response.status === 201) {
                showNotification({
                    autoClose: 30000,
                    title: "Notification",
                    message: 'Les données ont été enregistrées avec succès',
                    icon: <Check color="#" />,
                })
            } else {
                showNotification({
                    autoClose: 30000,
                    title: "Notification",
                    message: "Echec de l'enregistrement",
                    icon: <Error404 color="#" />,
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="my-4">
            <div className="mx-auto mb-8">
                <h2 className="text-2xl text-blue-800 font-bold mb-1">Enregistrer un administrateur</h2>
                <p>
                    Veuillez entrer les informations de l'administrateur que vous voulez ajouter.
                </p>
            </div>
            <form action="" className="mx-auto">
                <div className=" space-y-4 mb-10 border p-8 bg-gray-50">
                    <div className="text-lg font-bold">Informations de l'agent</div>
                    <hr />
                    <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Nom(s)</label>
                            <input onChange={(e) => { setname(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Prénom(s)</label>
                            <input onChange={(e) => { setfirstName(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1 " />
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Bloc</label>
                            <select onChange={(e) => { setbloc(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1 " name="" id="">
                                <option value="TALANGAI">TALANGAI</option>
                                <option value="POTO-POTO">POTO-POTO</option>
                                <option value="BACONGO">BACONGO</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Fonction</label>
                            <select onChange={(e) => { setfonction(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1 " name="" id="">
                                <option value="Caisse">Caisse</option>
                                <option value="Enrollement">Enrollement</option>
                                <option value="Administration">Administration</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Email</label>
                            <input onChange={(e) => { setemail(e.target.value) }} type="email" className="border border-gray-500 px-2 py-1" />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Mot de passe</label>
                            <input onChange={(e) => { setpassword(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={(e) => { e.preventDefault(); saveData() }} className="bg-blue-800 px-4 py-2 rounded text-white">Enregistrer</button>
                    </div>
                </div>
            </form>
        </div>
    )
}