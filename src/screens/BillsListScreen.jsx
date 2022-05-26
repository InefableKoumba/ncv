import { Table } from "@mantine/core"
import { useEffect, useState } from "react"
import { Bill } from "./../components/Bill"
import moment from 'moment';
moment().format();

const baseURL = "https://ncvserver.herokuapp.com/api"

export function BillsListScreen() {
    const [billsList, setbillsList] = useState([])
    const [selectedBill, setselectedBill] = useState(null)
    const [isBillOpen, setisBillOpen] = useState(false)
    const [firstDate, setfirstDate] = useState(null)
    const [secondDate, setsecondDate] = useState(null)

    const filterBills = () => {
        const filteredBills = billsList.filter(bill =>
            moment(bill.readableCreationDateEnglish).isSameOrAfter(firstDate) &&
            moment(bill.readableCreationDateEnglish).isSameOrBefore(secondDate)
        )
        setbillsList(filteredBills)
    }
    const fetchBills = async () => {
        try {
            const response = await fetch(`${baseURL}/bills`)
            const bills = await response.json()
            setbillsList(bills)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(moment('2009-10-20').isSameOrAfter('2010-10-20'));
        fetchBills()
    }, [])

    return <div>
        <div>
            <div className="flex gap-x-4 mb-4 w-1/2">
                <input onChange={(e) => setfirstDate(e.target.value)} className="py-2 px-2 rounded border border-gray-700 w-full" type="date" name="" id="" />
                <input onChange={(e) => setsecondDate(e.target.value)} className="py-2 px-2 rounded border border-gray-700 w-full" type="date" name="" id="" />
                <button onClick={() => { filterBills() }} className="px-4 text-white rounded bg-blue-700">Filtrer</button>
            </div>
            {isBillOpen ? <div className="relative py-10 px-4">
                <span className="bg-gray-500 flex mx-auto mb-2 justify-center items-center text-white rounded-full w-10 h-10">
                    <button
                        onClick={() => setisBillOpen(false)}
                        className="w-full h-full">X</button>
                </span>
                <Bill data={{
                    billCode: selectedBill.code,
                    carOwnerFirstName: selectedBill.car.owner.firstName,
                    readableCreationDate: selectedBill.readableCreationDate,
                    readableExpirationDate: selectedBill.readableExpirationDate,
                    carOwnerId: selectedBill.car.ownerId,
                    carOwnerName: selectedBill.car.owner.name,
                    carOwnerTelephone: selectedBill.car.owner.telephone,
                    creationHour: selectedBill.creationHour
                }} />
            </div> : (
                <div className="bg-white py-10">
                    <Table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Matricule</th>
                                <th>Date création</th>
                                <th>Date expiration</th>
                                <th>Déjà imprimé</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billsList.map((bill) => (
                                <tr key={bill.code}>
                                    <td>{bill.code}</td>
                                    <td>{bill.car.matricule}</td>
                                    <td>{bill.readableCreationDate}</td>
                                    <td>{bill.readableExpirationDate}</td>
                                    <td>{bill.alreadyUsedForPrinting ? "Déjà" : "Pas encore"}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setselectedBill(bill)
                                                setisBillOpen(true)
                                            }}
                                            className="bg-blue-800 text-white px-2 py-1 rounded">
                                            Ouvrir
                                        </button>
                                    </td>
                                </tr>))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    </div>
}