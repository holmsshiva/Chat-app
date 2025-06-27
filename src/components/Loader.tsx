import { Loading } from "../types";

const Loader = ({isLoading, message="Loading ..."}: Loading)=>{

    return(
        <div className="flex justify-center items-center bg-white p-4 m-4">
            {isLoading ?
                <div className="flex justify-center items-center h-full w-full text-gray-500">
                    {message}
                </div>
            : null}
        </div>
    )
}
export default Loader;
