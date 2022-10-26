import { toaster } from 'evergreen-ui';

const axios = require('axios');
const cloudinaryImageUploadAPI = "INSERT YOUR CLOUDINARY ENDPOINT HERE";





function log(logName, logData){
	console.log(`Logged: ${logName}`, logData);
}

function notify(state, message){

    switch (state) {
        case 1:
            toaster.success(message)
            break;
        case 2:
            toaster.warning(message)
            break;
        case 3:
            toaster.danger(message)
            break;
        default:
            toaster.notify(message)
    }

}


function prepareImageUploadData(data, upload_preset, owner_id=1) {

        let imageFiles = [data.file];

        if (imageFiles.length !== 0) {

            let image = imageFiles[0];
            const data = new FormData();

            data.append('file', image);
            data.append('upload_preset', upload_preset);
            data.append('public_id', `${owner_id}/${new Date().getTime()}`);
            data.append('tags', JSON.stringify(owner_id));
            data.append('folder', owner_id)

            if (image.size < 5000000 && image.type.includes('image')) {
                return data;
            } else {
                return false;
            }
    }
}


function uploadImageData(data) {
    return new Promise((resolve, reject) => {
        axios.default.post(cloudinaryImageUploadAPI, data)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error);
            });
    })
}


export default {
    log, 
    notify, 
    prepareImageUploadData,
    uploadImageData
}
