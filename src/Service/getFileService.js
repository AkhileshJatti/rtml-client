import axios from "axios"

export const getAllFiles = async () => {
    const res = await axios.get("/files")
    return res.data
}

export const setFile = async (file_name) => {
    const res = await axios.post(`/setfile/${file_name}`);
    if (res.status === 200) {
        return true
    }

    return false
}

export const getFileData = async (file_name) => {
    const res = await axios.get(`/api/${file_name}`)
    return res
}