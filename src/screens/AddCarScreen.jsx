import { useState, useEffect, useRef } from "react";
import { Check } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import Modal from 'react-modal';

const baseURL = "https://franzer.net/api";


export function AddCarScreen() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [confirmModalIsOpen, setIsconfirmModalIsOpen] = useState(false);

    function openModal(carId) {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false)
        setIsconfirmModalIsOpen(false)
    }

    const [existingCarOwner, setexistingCarOwner] = useState(false)
    const photoField = useRef()

    // Propriétaire
    const [name, setname] = useState("")
    const [firstName, setfirstname] = useState("")
    const [nationalite, setnationalite] = useState("")
    const [adresse, setadresse] = useState("")
    const [telephone, settelephone] = useState("")
    const [type_piece, settype_piece] = useState("")
    const [num_piece, setnum_piece] = useState("")
    const [ownerId, setownerId] = useState("")

    // Voiture
    const [genre, setgenre] = useState("")
    const [matricule, setmatricule] = useState("")
    const [marque, setmarque] = useState("")
    const [num_chassis, setnum_chassis] = useState("")
    const [num_moteur, setnum_moteur] = useState("")
    const [source_energie, setsource_energie] = useState("")
    const [puissance_administrative, setpuissance_administrative] = useState("")
    const [nombre_places, setnombre_places] = useState("")
    const [poids_autorise, setpoids_autorise] = useState("")
    const [recepisse, setrecepisse] = useState("")
    const [annee_mise_circulation, setannee_mise_circulation] = useState("")

    function handleSetOwnerId(id) {
        setownerId(id)
    }

    const saveCardata = async () => {
        const formdata = new FormData();
        formdata.append("photo", photoField.current.files[0]);
        formdata.append("genre", genre);
        formdata.append("marque", marque);
        formdata.append("matricule", matricule);
        formdata.append("nombre_places", nombre_places);
        formdata.append("annee_mise_circulation", annee_mise_circulation);
        formdata.append("num_moteur", num_moteur);
        formdata.append("num_chassis", num_chassis);
        formdata.append("puissance_administrative", puissance_administrative);
        formdata.append("poids_autorise", poids_autorise);
        formdata.append("recepisse", recepisse);
        formdata.append("source_energie", source_energie);
        formdata.append("ownerId", ownerId);
        formdata.append("nationalite", nationalite);
        formdata.append("name", name);
        formdata.append("firstName", firstName);
        formdata.append("adresse", adresse);
        formdata.append("num_piece", num_piece);
        formdata.append("type_piece", type_piece);
        formdata.append("telephone", telephone);

        if (existingCarOwner) {
            try {
                const response = await fetch(`${baseURL}/cars`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    }, body: JSON.stringify({
                        annee_mise_circulation, genre,
                        marque, num_moteur,
                        nombre_places, num_chassis,
                        poids_autorise, puissance_administrative,
                        recepisse, source_energie, matricule,
                        ownerId
                    })
                })
                console.log(response)
                return await response.json()

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await fetch(`${baseURL}/cars/newOwner`, {
                    method: 'POST',
                    body: formdata
                })
                if (response.status === 201) {
                    showNotification({
                        autoClose: 30000,
                        title: "Notification",
                        message: 'Les données ont été enregistrées avec succès',
                        icon: <Check color="#" />,
                    })
                    closeModal()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const saveData = async () => {
        try {
            const car = await saveCardata();
            console.log(car)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="my-4">
            <div className="mx-auto mb-8">
                <h2 className="text-2xl text-blue-800 font-bold mb-1">Enregistrer une voiture</h2>
                <p>
                    Veuillez entrer les informations de la voiture à enregistrer ainsi que celles de son propriétaire.
                </p>
            </div>
            <form action="" className="mx-auto">
                <div className=" space-y-4 mb-10 border p-8 bg-gray-50">
                    <div className="text-lg font-bold">Informations du véhicule</div>
                    <hr />
                    <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Genre</label>
                            <input onChange={(e) => { setgenre(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Marque</label>
                            <input onChange={(e) => { setmarque(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1 " />
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">N° du châssis</label>
                            <input onChange={(e) => { setnum_chassis(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">N° du moteur</label>
                            <input onChange={(e) => { setnum_moteur(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Source d'énergie</label>
                            <input onChange={(e) => { setsource_energie(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Puissance administrative</label>
                            <input onChange={(e) => { setpuissance_administrative(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Places</label>
                            <input onChange={(e) => { setnombre_places(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Poids autorisé</label>
                            <input onChange={(e) => { setpoids_autorise(e.target.value) }} type="number" className="border border-gray-500 px-2 py-1" />
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Récépissé</label>
                            <input onChange={(e) => { setrecepisse(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Année de mise en circulation</label>
                            <input onChange={(e) => { setannee_mise_circulation(e.target.value) }} type="number" className="border border-gray-500 px-2 py-1" />
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="flex flex-col gap-y-1 w-full">
                            <label htmlFor="" className="font-semibold">Matricule</label>
                            <input onChange={(e) => { setmatricule(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex">
                        <div className={`text-center py-4 ${existingCarOwner ? 'bg-gray-500' : 'bg-gray-700'} w-1/2 text-white relative`}>
                            Nouveau propriétaire
                            <input onChange={() => { setexistingCarOwner(false) }} className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer" type="radio" name="existingCarOwner" />
                        </div>
                        <div className={`text-center py-4 ${existingCarOwner ? 'bg-gray-700' : 'bg-gray-500'} w-1/2 text-white relative`}>
                            <input onChange={() => { setexistingCarOwner(true) }} className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer" type="radio" name="existingCarOwner" />
                            Propriétaire déjà enregistré</div>
                    </div>
                    {!existingCarOwner ? <div className="space-y-4 border p-8 bg-gray-50 w-full">
                        <div className="text-lg font-bold">Informations du propriétaire</div>
                        <hr />
                        <div className="flex gap-x-4">
                            <div className="flex flex-col gap-y-1 w-full">
                                <label htmlFor="" className="font-semibold">Nom(s)</label>
                                <input onChange={(e) => { setname(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                            </div>
                            <div className="flex flex-col gap-y-1 w-full">
                                <label htmlFor="" className="font-semibold">Prénom(s)</label>
                                <input onChange={(e) => { setfirstname(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1 " />
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="flex flex-col gap-y-1 w-full">
                                <label htmlFor="" className="font-semibold">Nationalité</label>
                                <input onChange={(e) => { setnationalite(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                            </div>
                            <div className="flex flex-col gap-y-1 w-full">
                                <label htmlFor="" className="font-semibold">Adresse</label>
                                <input onChange={(e) => { setadresse(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="flex flex-col gap-y-1 w-full">
                                <label htmlFor="" className="font-semibold">Téléphone</label>
                                <input onChange={(e) => { settelephone(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                            </div>
                            <div className="flex flex-col gap-y-1 w-full">
                                <label htmlFor="" className="font-semibold">Type de la pièce d'enregistrement</label>
                                <div className="flex gap-x-8 border border-gray-500 py-1 px-2">
                                    <div className="flex gap-x-2 items-center">
                                        <input value="CNI" name="type_piece" onChange={(e) => { settype_piece(e.target.value) }} type="radio" className="border border-gray-500 px-2 py-1" />
                                        <label htmlFor="" className="">CNI</label>
                                    </div>
                                    <div className="flex gap-x-2 items-center">
                                        <input value="Passeport" name="type_piece" onChange={(e) => { settype_piece(e.target.value) }} type="radio" className="border border-gray-500 px-2 py-1" />
                                        <label htmlFor="" className="">Passeport</label>
                                    </div>
                                    <div className="flex gap-x-2 items-center">
                                        <input value="CSJ" name="type_piece" onChange={(e) => { settype_piece(e.target.value) }} type="radio" className="border border-gray-500 px-2 py-1" />
                                        <label htmlFor="" className="">Carte de séjour</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="flex flex-col gap-y-1 w-full">
                                <label htmlFor="" className="font-semibold">N° de la pièce</label>
                                <input onChange={(e) => { setnum_piece(e.target.value) }} type="text" className="border border-gray-500 px-2 py-1" />
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="flex flex-col gap-y-1 w-full">
                                <label htmlFor="" className="font-semibold">Photo (format identité)</label>
                                <input ref={photoField} type="file" accept="image/png, image/jpeg" className="border border-gray-500 px-2 py-1" />
                            </div>
                        </div>
                    </div> : <CarOwnersList handleSetOwnerId={handleSetOwnerId} />}

                </div>
                <div className="text-center mt-4">
                    <button onClick={(e) => { e.preventDefault(); setIsconfirmModalIsOpen(true) }} className="bg-blue-800 px-4 py-2 rounded text-white">Enregistrer</button>
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
            <Modal
                style={
                    {
                        overlay: {
                            background: "#000000d4"
                        }
                    }
                }
                isOpen={confirmModalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="w-2/3 mx-auto transform translate-y-20 bg-gray-50 shadow rounded"
            >
                <div className="h-full flex-col flex">
                    <div className="p-8">
                        <div className="grid grid-cols-4 gap-y-4">
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Nom(s)</span>
                                <span>{name}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Prénom(s)</span>
                                <span>{firstName}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Adresse</span>
                                <span>{adresse}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Téléphone</span>
                                <span>{telephone}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">N° Pièce</span>
                                <span>{num_piece}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Nationalité</span>
                                <span>{nationalite}</span>
                            </div>
                        </div>
                        <hr className="my-10" />
                        <div className="grid grid-cols-4 gap-y-4">
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Genre</span>
                                <span>{genre}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Marque</span>
                                <span>{marque}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">N° Châssis</span>
                                <span>{num_chassis}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">N° Moteur</span>
                                <span>{num_moteur}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Source d'énergie</span>
                                <span>{source_energie}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Puissance administrative</span>
                                <span>{puissance_administrative}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Nombre de places</span>
                                <span>{nombre_places}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Poids autorisé</span>
                                <span>{poids_autorise}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Récépissé</span>
                                <span>{recepisse}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Année de mise en circulation</span>
                                <span>{annee_mise_circulation}</span>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="font-bold">Matricule</span>
                                <span>{matricule}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-4 justify-center items-center my-8">
                        <button onClick={closeModal} className="px-4 py-2 rounded text-red-500 border border-red-500">Annuler</button>
                        <button onClick={saveData} className="px-4 py-2 rounded bg-blue-800 text-white">Confirmer</button>
                    </div>
                </div>

            </Modal>
        </div>
    );
}

function CarOwnersList({ handleSetOwnerId }) {
    const [carOwners, setcarOwners] = useState([])
    const fetchCarOwners = async () => {
        try {
            const response = await fetch(`${baseURL}/car-owners`)
            const carOwners = await response.json();
            setcarOwners(carOwners)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCarOwners()
    }, [])
    return (
        <div className="space-y-4 border p-8 bg-gray-50 w-full">
            <div className="flex justify-end mb-10">
                <input type="text" placeholder="Noms ou prénoms" className="border rounded px-2 py-1 border-gray-700 w-96" />
            </div>
            <hr />
            <div>
                <ul className="flex w-full mb-2 gap-x-2">
                    <li className="font-semibold w-full py-1 px-1">Noms</li>
                    <li className="font-semibold w-full py-1 px-1">Prénoms</li>
                    <li className="font-semibold w-full py-1 px-1">Adresse</li>
                    <li className="font-semibold w-full py-1 px-1">Téléphone</li>
                    <li className="font-semibold py-1 px-1">
                        <div className="bg-gray-500 rounded-full">
                            <svg className="w-6 p-1" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="okIconTitle" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#fff"> <title id="okIconTitle">Ok</title> <polyline points="4 13 9 18 20 7" /> </svg>
                        </div>
                    </li>
                </ul>

                <div className="flex flex-col gap-y-2">
                    {carOwners.map((carOwner, i) => (
                        <ul key={i} className={`flex w-full gap-x-2 ${i % 2 === 0 ? "bg-gray-50" : "bg-gray-200"} `}>
                            <li className="w-full py-1 px-1">{carOwner.name}</li>
                            <li className="w-full py-1 px-1">{carOwner.firstName}</li>
                            <li className="w-full py-1 px-1">{carOwner.adresse}</li>
                            <li className="w-full py-1 px-1">{carOwner.telephone}</li>
                            <li className="py-1 px-1">
                                <input value={carOwner.id} onClick={(e) => { handleSetOwnerId(e.target.value) }} name="carOwnerId" type="radio" className="w-6 h-6" />
                            </li>
                        </ul>))}
                </div>
            </div>
        </div>
    )
}

