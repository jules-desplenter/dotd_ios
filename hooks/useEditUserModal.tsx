import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.headers.get['Content-Type'] = 'application/json';

const useEditUserModal = (id:string | null, ob: any) => {
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const PostData = () => {
        axios
            .post("https://dotdbelgium.azurewebsites.net/api/edituser?code=FRtQBvMwg3/HUqRJ569RxIvzEO1fldLhv9tWUSkjtni/HfPrtJ2hLg==" + (id ? id : ""), ob)
            .then((res) => {
                setResponse(res.data);
                console.log("edited");
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        PostData();
    }, [ob]);

    // custom hook returns value
    return { response, error, loading, PostData };
};

export default useEditUserModal;