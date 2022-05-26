import { useState, forwardRef, useRef, useEffect } from 'react';
import { Autocomplete, Modal } from '@mantine/core';
import QRCode from 'qrcode.react';
import ReactToPrint from 'react-to-print';

const baseURL = "https://ncvserver.herokuapp.com/api"

export function GenerateQRCodeScreen() {
    const [confirmationModalIsOpened, setconfirmationModalIsOpened] = useState(false);
    const QRCodeRef = useRef();
    const [selectedBillCode, setselectedBillCode] = useState(null)
    const [billsList, setbillsList] = useState([])
    const [alreadyPrintedBillsCode, setalreadyPrintedBillsCode] = useState([])
    const [notYetPrintedBillsCode, setnotYetPrintedBillsCode] = useState([])
    const [newPrinting, setnewPrinting] = useState(false)
    const [selectedBill, setselectedBill] = useState(null)

    const setBillAsAlreadyPrinted = async (code) => {
        try {
            await fetch(`${baseURL}/bills/setAsAlreadyPrinted/${selectedBillCode}`)
        } catch (error) {
            console.log(error)
        }
    }
    const handleNextTimePrinting = (code) => {
        const selectedBill = billsList.find(bill => bill.code === code)
        setselectedBill(selectedBill)
        setnewPrinting(false)
        setconfirmationModalIsOpened(true)
    }
    const handleFirstTimePrinting = (code) => {
        const selectedBill = billsList.find(bill => bill.code === code)
        setselectedBill(selectedBill)
        setnewPrinting(true)
        setselectedBillCode(code)
        setconfirmationModalIsOpened(true)
    }
    const fetchBills = async () => {
        try {
            const response = await fetch(`${baseURL}/bills`)
            const bills = await response.json();
            const alreadyPrintedBillsCodeList = [];
            const notYetPrintedBillsCodeList = [];
            bills.forEach(bill => {
                if (bill.alreadyUsedForPrinting) {
                    alreadyPrintedBillsCodeList.push(bill.code)
                } else {
                    notYetPrintedBillsCodeList.push(bill.code)
                }
            })
            setbillsList(bills)
            setalreadyPrintedBillsCode(alreadyPrintedBillsCodeList)
            setnotYetPrintedBillsCode(notYetPrintedBillsCodeList)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBills()
    }, [])


    return <div>
        <Modal
            opened={confirmationModalIsOpened}
            onClose={() => setconfirmationModalIsOpened(false)}
            title="Important !"
            centered
        >
            <p>Voulez-vous vraiment imprimer un code QR pour le matricule {selectedBill?.car.matricule}?</p>
            <div className='flex justify-center my-4'>
                <QRCodeComponent carId={selectedBill?.car.id} ref={QRCodeRef} />
            </div>
            <div className='flex gap-x-4 justify-center py-4'>
                <ReactToPrint
                    pageStyle={
                        `@page {
                            size: 210mm 297mm;
                        }
                        `
                    }
                    onBeforePrint={() => {
                        setconfirmationModalIsOpened(false)
                    }}
                    onAfterPrint={() => {
                        if (newPrinting) {
                            setnotYetPrintedBillsCode(notYetPrintedBillsCode.filter(item => (item !== selectedBillCode)))
                            const codes = alreadyPrintedBillsCode
                            codes.push(selectedBillCode)
                            setalreadyPrintedBillsCode(codes)
                            setBillAsAlreadyPrinted()
                            setnewPrinting(false)
                        }
                    }}
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <button className="bg-blue-700 px-4 py-2 text-white rounded">Imprimer</button>;
                    }}
                    content={() => QRCodeRef.current}
                />
            </div>
        </Modal>
        <div className="mx-auto mb-8">
            <h2 className="text-2xl text-blue-800 font-bold mb-1">Générer un code QR</h2>
            <p>
                Générer un code QR
            </p>
        </div>
        <div className="bg-gray-50 p-8">
            <div className="mt-4 flex gap-x-4">
                <div className="w-1/2 flex flex-col gap-y-2">
                    <div>
                        <Autocomplete
                            label="Rechercher un reçu"
                            placeholder="Rechercher un reçu"
                            data={notYetPrintedBillsCode}
                        />
                    </div>
                    {notYetPrintedBillsCode.map(
                        code => (<div key={code} className="flex justify-between items-center py-2 px-4 rounded bg-green-700">
                            <span className="text-white">{code}</span>
                            <button onClick={() => handleFirstTimePrinting(code)}>
                                <svg className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.326 31.326">
                                    <g id="Group_1458" data-name="Group 1458" transform="translate(-182.241 -243.241)">
                                        <g id="qr-code-svgrepo-com" transform="translate(182.241 243.241)">
                                            <g id="Group_18" data-name="Group 18">
                                                <g id="Group_17" data-name="Group 17">
                                                    <path id="Path_8" data-name="Path 8" d="M0,0V14.3H14.3V0ZM12.258,12.258H2.043V2.043H12.258Z" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_20" data-name="Group 20" transform="translate(4.086 4.086)">
                                                <g id="Group_19" data-name="Group 19">
                                                    <rect id="Rectangle_17" data-name="Rectangle 17" width="6.129" height="6.129" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_22" data-name="Group 22" transform="translate(17.025)">
                                                <g id="Group_21" data-name="Group 21">
                                                    <path id="Path_9" data-name="Path 9" d="M278.261,0V14.3h14.3V0Zm12.258,12.258H280.3V2.043h10.215Z" transform="translate(-278.261)" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_24" data-name="Group 24" transform="translate(21.111 4.086)">
                                                <g id="Group_23" data-name="Group 23">
                                                    <rect id="Rectangle_18" data-name="Rectangle 18" width="6.129" height="6.129" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_26" data-name="Group 26" transform="translate(0 17.025)">
                                                <g id="Group_25" data-name="Group 25">
                                                    <path id="Path_10" data-name="Path 10" d="M0,278.261v14.3H14.3v-14.3Zm12.258,12.258H2.043V280.3H12.258Z" transform="translate(0 -278.261)" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_28" data-name="Group 28" transform="translate(4.086 21.111)">
                                                <g id="Group_27" data-name="Group 27">
                                                    <rect id="Rectangle_19" data-name="Rectangle 19" width="6.129" height="6.129" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_30" data-name="Group 30" transform="translate(17.025 17.025)">
                                                <g id="Group_29" data-name="Group 29">
                                                    <path id="Path_11" data-name="Path 11" d="M282.347,280.3v-2.043h-4.086v14.3h4.086v-2.043H280.3v-4.086h2.043V284.39H280.3V280.3Z" transform="translate(-278.261 -278.261)" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_32" data-name="Group 32" transform="translate(29.283 17.025)">
                                                <g id="Group_31" data-name="Group 31">
                                                    <rect id="Rectangle_20" data-name="Rectangle 20" width="2.043" height="2.043" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_34" data-name="Group 34" transform="translate(27.24 21.792)">
                                                <g id="Group_33" data-name="Group 33">
                                                    <path id="Path_12" data-name="Path 12" d="M447.26,356.174v7.491h-2.043v2.043H449.3v-9.534Z" transform="translate(-445.217 -356.174)" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_36" data-name="Group 36" transform="translate(23.154 17.025)">
                                                <g id="Group_35" data-name="Group 35">
                                                    <rect id="Rectangle_21" data-name="Rectangle 21" width="4.086" height="2.043" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_38" data-name="Group 38" transform="translate(23.154 21.111)">
                                                <g id="Group_37" data-name="Group 37">
                                                    <path id="Path_13" data-name="Path 13" d="M382.521,347.086v-2.043h-4.086v6.129h4.086v-2.043h-2.043v-2.043Z" transform="translate(-378.435 -345.043)" fill="#fff" />
                                                </g>
                                            </g>
                                            <g id="Group_40" data-name="Group 40" transform="translate(23.154 29.283)">
                                                <g id="Group_39" data-name="Group 39">
                                                    <rect id="Rectangle_22" data-name="Rectangle 22" width="2.043" height="2.043" fill="#fff" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>)
                    )}
                </div>
                <div className="w-1/2 flex flex-col gap-y-2">
                    <div>
                        <Autocomplete
                            label="Rechercher un reçu"
                            placeholder="Rechercher un reçu"
                            data={alreadyPrintedBillsCode}
                        />
                    </div>
                    {alreadyPrintedBillsCode.map(
                        code => (
                            <div key={code} className="flex justify-between items-center py-2 px-4 rounded bg-red-700">
                                <span className="text-white">{code}</span>
                                <button onClick={() => handleNextTimePrinting(code)}>
                                    <svg className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.326 31.326">
                                        <g id="Group_1458" data-name="Group 1458" transform="translate(-182.241 -243.241)">
                                            <g id="qr-code-svgrepo-com" transform="translate(182.241 243.241)">
                                                <g id="Group_18" data-name="Group 18">
                                                    <g id="Group_17" data-name="Group 17">
                                                        <path id="Path_8" data-name="Path 8" d="M0,0V14.3H14.3V0ZM12.258,12.258H2.043V2.043H12.258Z" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_20" data-name="Group 20" transform="translate(4.086 4.086)">
                                                    <g id="Group_19" data-name="Group 19">
                                                        <rect id="Rectangle_17" data-name="Rectangle 17" width="6.129" height="6.129" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_22" data-name="Group 22" transform="translate(17.025)">
                                                    <g id="Group_21" data-name="Group 21">
                                                        <path id="Path_9" data-name="Path 9" d="M278.261,0V14.3h14.3V0Zm12.258,12.258H280.3V2.043h10.215Z" transform="translate(-278.261)" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_24" data-name="Group 24" transform="translate(21.111 4.086)">
                                                    <g id="Group_23" data-name="Group 23">
                                                        <rect id="Rectangle_18" data-name="Rectangle 18" width="6.129" height="6.129" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_26" data-name="Group 26" transform="translate(0 17.025)">
                                                    <g id="Group_25" data-name="Group 25">
                                                        <path id="Path_10" data-name="Path 10" d="M0,278.261v14.3H14.3v-14.3Zm12.258,12.258H2.043V280.3H12.258Z" transform="translate(0 -278.261)" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_28" data-name="Group 28" transform="translate(4.086 21.111)">
                                                    <g id="Group_27" data-name="Group 27">
                                                        <rect id="Rectangle_19" data-name="Rectangle 19" width="6.129" height="6.129" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_30" data-name="Group 30" transform="translate(17.025 17.025)">
                                                    <g id="Group_29" data-name="Group 29">
                                                        <path id="Path_11" data-name="Path 11" d="M282.347,280.3v-2.043h-4.086v14.3h4.086v-2.043H280.3v-4.086h2.043V284.39H280.3V280.3Z" transform="translate(-278.261 -278.261)" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_32" data-name="Group 32" transform="translate(29.283 17.025)">
                                                    <g id="Group_31" data-name="Group 31">
                                                        <rect id="Rectangle_20" data-name="Rectangle 20" width="2.043" height="2.043" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_34" data-name="Group 34" transform="translate(27.24 21.792)">
                                                    <g id="Group_33" data-name="Group 33">
                                                        <path id="Path_12" data-name="Path 12" d="M447.26,356.174v7.491h-2.043v2.043H449.3v-9.534Z" transform="translate(-445.217 -356.174)" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_36" data-name="Group 36" transform="translate(23.154 17.025)">
                                                    <g id="Group_35" data-name="Group 35">
                                                        <rect id="Rectangle_21" data-name="Rectangle 21" width="4.086" height="2.043" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_38" data-name="Group 38" transform="translate(23.154 21.111)">
                                                    <g id="Group_37" data-name="Group 37">
                                                        <path id="Path_13" data-name="Path 13" d="M382.521,347.086v-2.043h-4.086v6.129h4.086v-2.043h-2.043v-2.043Z" transform="translate(-378.435 -345.043)" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Group_40" data-name="Group 40" transform="translate(23.154 29.283)">
                                                    <g id="Group_39" data-name="Group 39">
                                                        <rect id="Rectangle_22" data-name="Rectangle 22" width="2.043" height="2.043" fill="#fff" />
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    </div>
}

const QRCodeComponent = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <QRCode size={250} value={props.carId} />
        </div>
    );
});