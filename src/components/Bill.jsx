
import franzerLogo from "./../img/franzer-logo.png"
import ReactToPrint from 'react-to-print';
import { Table } from "@mantine/core";
import { useRef } from "react";

export function Bill({ data }) {
    const {
        billCode, carOwnerFirstName,
        carOwnerId, carOwnerName,
        carOwnerTelephone,
        readableCreationDate,
        readableExpirationDate
    } = data
    const billRef = useRef();
    const pageStyle = `
        @page {
            size: 210mm 297mm;
        }
        
        `;

    return <div className="">
        <div className="px-14 bg-white">
            <div className=' bg-white py-6' ref={billRef}>
                <div className='flex items-center justify-between'>
                    <span className='text-4xl text-blue-800 font-bold'>Reçu</span>
                    <img className='w-16 h-16' src={franzerLogo} alt='franzer logo' />
                </div>
                <hr className='bg-blue-800 h-1 my-6 w-full' />
                <div className='flex flex-col gap-y-2'>
                    <span className='text-blue-800 text-4xl font-bold'>{billCode}</span>
                    <span className='font-light text-sm w-1/2'>
                        Utiliser ce code dans l'application mobile NCV et dans nos agences
                        pour la génération du code QR de votre véhicule
                    </span>
                </div>
                <div className='flex flex-col my-10'>
                    <span className='text-xl font-bold'>NCV - Numerical Cars Verification</span>
                    <span>22 Rue Bakoukouyas, Poto-Poto II, Brazzaville</span>
                    <span>Téléphone : +242066650750</span>
                </div>
                <div className='bg-gray-100 p-8 rounded flex w-max gap-x-20'>
                    <div className='flex flex-col gap-y-2'>
                        <span className='whitespace-nowrap'>Paiement éffectué le :</span>
                        <span className='whitespace-nowrap'>Paiement éffectué à :</span>
                        <span className='whitespace-nowrap'>Expire le :</span>
                        <span className='whitespace-nowrap'>ID du client :</span>
                        <span className='whitespace-nowrap'>Nom du client:</span>
                        <span className='whitespace-nowrap'>Contact client :</span>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <span className='whitespace-nowrap'>{readableCreationDate}</span>
                        <span className='whitespace-nowrap'>14H37
                        </span>
                        <span className='whitespace-nowrap'>{readableExpirationDate}</span>
                        <span className='whitespace-nowrap'>{carOwnerId}</span>
                        <span className='whitespace-nowrap'>{carOwnerName} {carOwnerFirstName}</span>
                        <span className='whitespace-nowrap'>{carOwnerTelephone}</span>
                    </div>
                </div>
                <div className='my-10'>
                    <hr className='bg-blue-800 h-1 w-full' />
                    <div className='bg-gray-100 py-4'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Quantité</th>
                                    <th>PU HT</th>
                                    <th>Durée (année)</th>
                                    <th>TVA</th>
                                    <th>CA</th>
                                    <th>Total TTC</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Achat de code <br /> numérique QR</td>
                                    <td>1</td>
                                    <td>2200 XAF</td>
                                    <td>1</td>
                                    <td>396 XAF</td>
                                    <td>19.8 XAF</td>
                                    <td>2615.8 XAF</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className='flex justify-end gap-x-6 mt-20'>
                    <div className='flex flex-col'>
                        <span className='text-lg font-bold'>Siège social</span>
                        <span className='text-sm'>22 Rue Bakoukouyas, <br />
                            Poto-Poto, Brazzaville, <br />
                            Rep. Congo
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-lg font-bold'>Coordonnées</span>
                        <span className='text-sm'>Téléphone : +242066650750</span>
                        <span className='text-sm'>Email : contact@franzer.org</span>
                        <span className='text-sm'>www.franzer.org</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-4 text-center">
            <ReactToPrint
                pageStyle={pageStyle}
                trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <button className="bg-blue-700 px-6 py-3 text-white rounded">Imprimer</button>;
                }}
                content={() => billRef.current}
            />
        </div>
    </div>
}