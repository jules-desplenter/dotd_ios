import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.headers.get['Content-Type'] = 'application/json';

const useEditUser = (id:string | null, ob: any) => {
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const PostData = () => {
        console.log("called",ob, id)
        axios
            .post("https://dotdbelgium.azurewebsites.net/api/edituser?code=fPjc4X163YupKLOMmn4ahC8xrnhxKVvCnO5TdBGwjZPJeWHNkQuUjQ==", ob,{headers:{"Content-type":'application/json'}})
            .then((res) => {
                setResponse(res.data);
                console.log("edited");
            })
            .catch((err) => {
                setError(err);
                console.log("error",err)
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

export default useEditUser;