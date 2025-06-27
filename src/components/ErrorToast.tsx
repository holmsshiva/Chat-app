import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ErrorDisplayProps } from "../types";

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage, delay = 8000 }) => {
    const [showError, setShowError] = useState(true);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setShowError(false);
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [delay]);

    if (!showError) {
        return null;
    }

    return (
        <div className="fixed top-0 right-0 border border-red-500 bg-red-400">
            <div className="flex gap-1 p-2 justify-center items-center">
                <p className="text-red-800 ">{errorMessage}</p>
                <XMarkIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowError(false)}
                />
            </div>
        </div>
    );
};

export default ErrorDisplay;