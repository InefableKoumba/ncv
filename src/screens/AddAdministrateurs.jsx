import { useState } from "react";
import Modal from 'react-modal';

const baseURL = "https://ncvserver.herokuapp.com/api";

export function AddAdministrateurs() {
    const [name, setname] = useState("")
    const [firstName, setfirstName] = useState("")
    const [fonction, setfonction] = useState("")
    const [bloc, setbloc] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const saveData = async () => {
        try {
            const response = await fetch(`${baseURL}/administrateurs`, {
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
                openModal()
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
                            <input onChange={(e) => { setbloc(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Fonction</label>
                            <input onChange={(e) => { setfonction(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1 " />
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
                    <svg className="w-24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                        <path className="stroke-blue-700" d="M14 24L15.25 25.25M44 14L24 34L22.75 32.75" stroke-width="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path className="stroke-blue-700" d="M4 24L14 34L34 14" stroke-width="4" stroke-linecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-semibold text-xl">Données enregistrées avec succès</span>
                </div>
            </Modal>
        </div>
    )
}