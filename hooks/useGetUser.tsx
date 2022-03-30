import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.headers.get['Content-Type'] = 'application/json';

const useGetUser = (id:string | null) => {
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const fetchData = () => {
        axios
            .get("https://dotdbelgium.azurewebsites.net/api/getuser?code=XJ312iaiqxMTfwLqPCyzPNU6MJkPMIhTDVCiiMWihcmOQ01cPxUi5g==&id=" + (id ? id : ""))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // custom hook returns value
    return { response, error, loading };
};

export default useGetUser;