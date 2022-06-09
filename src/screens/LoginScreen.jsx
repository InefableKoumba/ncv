import { useState } from "react"

const baseURL = "https://ncvserver.herokuapp.com/api"

export function LoginScreen({ handleSetToken }) {
    const [errorMessage, seterrors] = useState(null)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)

    const handleSetErrorMessage = (value) => {
        seterrors(value)
    }
    const handleSetEmail = (value) => {
        setemail(value)
    }
    const handleSetPassword = (value) => {
        setpassword(value)
    }

    const login = async () => {
        try {
            const response = await fetch(`${baseURL}/administrators/login`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ email, password })
            })
            if (response.status === 201) {
                const token = await response.json()
                localStorage.setItem('token', JSON.stringify(token))
                handleSetToken(token)
            } else {
                handleSetErrorMessage("Mot de pass ou adresse email incorrect")
            }
        } catch (error) {
            handleSetErrorMessage("Une erreur s'est produite, veuillez contacter un administrateur")
            console.log(error)
        }
    }
    return <div>

        <div className="flex flex-col items-center justify-center">
            <div className="w-1/2 mt-20">
                {errorMessage ?
                    <div className="py-4 bg-red-600 rounded flex justify-center items-center">
                        <span className=" text-white">{errorMessage}</span>
                    </div> : null
                }
                <div className="my-8">
                    <h1 className="text-4xl font-bold text-center">Bienvenue</h1>
                </div>
                <form action="" className="bg-gray-100 p-10">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="">Adresse email</label>
                            <input onChange={(e) => handleSetEmail(e.target.value)} className="rounded px-3 py-2 border" type="text" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="">Mot de passe</label>
                            <input onChange={(e) => handleSetPassword(e.target.value)} className="rounded px-3 py-2 border" type="password" />
                        </div>
                        <div className="text-center">
                            <button onClick={(e) => { e.preventDefault(); login() }} className="text-white px-4 py-3 rounded bg-blue-700">Se connecter</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

}