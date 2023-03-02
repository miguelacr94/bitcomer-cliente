import React, { useEffect } from 'react'
import { useState } from 'react'
import MainLayout from '../component/Layouts/MainLayout';
import OtcDetails from '../component/Otc/OtcDetails';
import TableOtc from '../component/tables/TableOtc';
import { getOtcList } from '../provider/api/user.queries'
import { Otc } from '../utils/data';
import { useDebounce } from 'use-debounce';

const otcList = () => {

    const [otc, setOtc] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [otcSelected, setOtcSelected] = useState(null);
    const [search, setSearch] = useState(null);
    const [value] = useDebounce(search, 500);

    const getOtc = async (p, search) => {
        const res = await getOtcList(p, search);
        if (res) {
            setOtc(res.data.docs);
            setTotalPages(res?.data?.totalPages)
        }
    }


    useEffect(() => {
        getOtc(page,);
    }, [setOtc, page]);


    useEffect(() => {
        if (value) {
            console.log(value);
            getOtc(page, value);
        } else {
            getOtc(page);
        }
    }, [value])


    return (
        <MainLayout>
            <div className="overflow-auto  py-2 lg:pl-12 lg:pr-16 pb-8 lg:px-0 px-2 lg:h-window">
                <h2 className=" font-bold ml-2 text-md text-menu mt-12 ">Ordenes OTC</h2>
                {!otcSelected ?
                    <TableOtc
                        otc={Otc}
                        data={otc}
                        totalPages={totalPages}
                        onSelected={(e) => setOtcSelected(e)}
                        onPageChange={(e) => setPage(e.selected + 1)}
                        query={(e) => setSearch(e)}

                    />
                    :

                    <OtcDetails
                        detailOtc={otcSelected}
                        onBack={() => setOtcSelected('')}
                    />
                }

            </div>

        </MainLayout>
    )
}

export default otcList