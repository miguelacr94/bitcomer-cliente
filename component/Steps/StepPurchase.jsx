import React from 'react'
import PurchaseIndication from './PurchaseIndication'

const StepPurchase = () => {
    return (
        <div className="w-full lg:h-smallWindows lg:minScreen  ">
            <section className="w-full h-full 
             bg-grey-steps 
             flex justify-center 
             items-center lg:flex-row  flex-col-reverse">
                <div className="w-7/12">
                <PurchaseIndication />
            </div>
            <div className="lg:w-5/12 w-full flex flex-col justify-center lg:items-start items-center text-center lg:text-start mt-12 lg:mt-0">
                <h2 className="text-xl font-semibold text-textP">3 PASOS</h2>
                <h1 className="text-2xl font-black text-textP">PARA COMPRAR</h1>
                <div className="w-stepText  mt-8 flex lg:flex-col justify-center lg:justify-start">
                    <p className=" text-textP  font-semibold lg:w-full w-64">
                    Estamos simplificando las compras globales de criptomonedas.  Bitcomer te permite comprar bitcoin, ethereum y litecoin al instante a través de nuestro mercado global.
                    </p>
                    {/* <p className="text-textP font-semibold mt-6 lg:block hidden">
                        Curabitur congue efficitur ligula eu vestibulum. Nullam libero ipsum,
                        maximus sit amet accumsan at, sagittis ut orci.
                        Nunc vestibulum porta turpis, non fringilla eros dapibus ac.
                        Phasellus ut tincidunt lacus. Ut ultricies lacus nulla,
                        ac placerat nisl lobortis vitae. Ut ullamcorper velit vel velit egestas,
                        non aliquet mauris facilisis. Sed dignissim nunc eget tortor consectetur,
                        in rutrum libero eleifend.

                    </p> */}
                </div>

            </div>
            </section>
        </div>
    )
}

export default StepPurchase