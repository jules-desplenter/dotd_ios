import { useState, useEffect } from "react";
import axios from "axios";
var FormData = require('form-data');

axios.defaults.headers.get["Content-Type"] = "application/json";

const fetchImageFromUri = (uri:any) => {
    let chill:Blob;
    return fetch(uri)
    .then(response => response.blob())
    .then((res) => {chill = res;}).then(() => {return chill});
};

function dataURItoBlob(dataURI:any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

const useUploadProfile = (id: string | null) => {
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const UploadProfile = async (photo: any, id: any) => {
    const image = await fetchImageFromUri("cool");
    let formData = new FormData();
    const file = new File([image], "flubber.jpg", {
        type: 'image/*'
    });
    var blob = dataURItoBlob(photo);
    formData.append("profile", blob);
    formData.append("name", "flubber.jpg");
    // console.log(formData, "iuygiufiuf ");
    // axios
    //   .post(
    //     "https://dotdbelgium.azurewebsites.net/api/uploadprofile?code=tAxHCD4T3Fl5F2jYY4Ws8Oqhvg1giHiA2C8GCEsqSl8NaGFBBZtlxg==",
    //     formData,{headers: {
    //         "Content-Type": "multipart/form-data"
    //     }}
    //   )
    //   .then((res) => {
    //     // setResponse(res.body);
    //     console.log(res.body, "posted");
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     console.log(err, "error");
    //     console.log(err.response.data);
    //     console.log(err.response.status);
    //     console.log(err.response.headers);
    //   })
    //   .finally(() => {
    //     setloading(false);
    //   });

    fetch("https://dotdbelgium.azurewebsites.net/api/uploadprofile?code=tAxHCD4T3Fl5F2jYY4Ws8Oqhvg1giHiA2C8GCEsqSl8NaGFBBZtlxg==",{method: 'POST',
    body: formData,
//     headers: {
//         'content-type': `multipart/form-data; boundary=${formData._boundary}`
// }, 
    redirect: 'follow'}).then((res) => res).then((res)=> console.log(res.headers));
  };

  // custom hook returns value
  return { response, error, loading, UploadProfile };
};

export default useUploadProfile;
