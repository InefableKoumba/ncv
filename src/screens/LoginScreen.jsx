import { useState } from "react"

const baseURL = "https://franzer.net/api"

export function LoginScreen({ setToken }) {
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)

    const login = async () => {
        try {
            const response = await fetch(`${baseURL}/admins/login`, {
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
                setToken(token)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return <div className="flex items-center justify-center">
        <div className="w-1/2 mt-20">
            <div className="my-8">
                <h1 className="text-4xl font-bold text-center">Bienvenue</h1>
            </div>
            <form action="" className="bg-gray-100 p-10">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="">Adresse email</label>
                        <input onChange={(e) => setemail(e.target.value)} className="rounded px-3 py-2 border" type="text" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="">Mot de passe</label>
                        <input onChange={(e) => setpassword(e.target.value)} className="rounded px-3 py-2 border" type="password" />
                    </div>
                    <div className="text-center">
                        <button onClick={() => login()} className="text-white px-4 py-3 rounded bg-blue-700">Se connecter</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
}