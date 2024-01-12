import axios from "axios"

export const getAllFiles = async () => {
    const res = await axios.get("/files")
    return res.data
}

export const setFile = async (file_name) => {
    const res = await axios.post(`/setfile/${file_name}`);
    return res.status === 200;
}

export const getFileData = async (file_name) => {
    const res = await axios.get(`/api/${file_name}`)
    return res
}

export const uploadFile = async (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile);

    const res = await axios.post('file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res;
}

export const deleteFile = async (file_name) => {
    const res = await axios.get(`/api/delete/${file_name}`)
    return res
}