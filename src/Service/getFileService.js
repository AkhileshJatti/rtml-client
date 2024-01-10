import axios from "axios"

export const getAllFiles = async () => {
    const res = await axios.get("http://0.0.0.0:8000/files")
    return res.data
}

export const setFile = async (file_name) => {
    const res = await axios.post(`http://0.0.0.0:8000/setfile/${file_name}`);
    if (res.status === 200) {
        return true
    }

    return false
}

export const getFileData = async (file_name) => {
    const res = await axios.get(`http://0.0.0.0:8000/api/${file_name}`)
    return res
}