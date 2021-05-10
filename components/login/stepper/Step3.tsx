import React from "react";
import {useShopListQuery} from "../../../typing";
import DriveSelection from "../../driveSelect/DriveSelection";


const Step3 = () => {

    const {data, loading} = useShopListQuery();

    return (
        <>
            {!loading &&
            <DriveSelection data={data}/>
            }
        </>
    )
}

export default Step3;