import React, { useEffect, useState } from "react";
import FileSideBar from '../../Components/fileSideBar';
import FileView from '../../Components/fileView';
import NavBar from '../../Components/navbar';
import SearchBar from "../../Components/searchBar"
import { deleteFile, getAllFiles, getFileData, setFile } from "../../Service/getFileService"

const FileViewMain = () => {
    const [files, setFiles] = useState([]);
    const [fileData, setFileData] = useState({ data: "" });
    const [openState, setOpenState] = useState(false);
    const [searchText, setSearchText] = useState("")
    const [tags, setTags] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [condition, setCondition] = useState(/<.*>/g)
    const [fileDataHighLight, setFileDataHighLight] = useState([])
    const [fileDataShow, setFileDataShow] = useState()

    useEffect(() => {
        const asyncFn = async () => {
            const res = await getAllFiles();
            setFiles(res.files)
        };
        asyncFn();
    }, [])

    const buttonClick = async (file_name) => {
        setTags([])
        setSearchText("")
        const setFileStatus = await setFile(file_name)
        setIsLoading(true)
        if (setFileStatus) {
            const res = await getFileData(file_name);
            if (res.status === 200) {
                setIsLoading(false)
                setFileData(res.data)
            }
        }
    }

    useEffect(() => {
        let temp = []
        temp.push(fileData?.data?.replace(condition, ''))
        setFileDataShow([{ str: temp[0] }])
    }, [fileData, condition])

    const deleteClick = async (fileName) => {
        setTags([])
        setSearchText("")
        setIsLoading(true)

        const res = await deleteFile(fileName)
        if (res.status === 200) {
            setIsLoading(false)
            const filesRes = await getAllFiles();
            setFiles(filesRes.files)
        }
    }

    const onTextChange = (e) => {
        setSearchText(e.target.value)
    }

    const onClickSearch = () => {
        setTags(fileData.tags.filter((item) => item.name.includes(searchText) && item.pairs.length > 0))
    }

    const onTagClick = (tag) => {
        const fileStr = fileData?.data
        const startArr = tag.start_positions
        const endArr = tag.end_positions
        const startLen = startArr.length
        let temp = []
        temp.push({ str: fileStr.substring(0, startArr[0]) })
        for (let i = 0; i < startLen; i++) {
            temp.push({ str: fileStr.substring(startArr[i], endArr[i]), highLight: true ,id:i})
            temp.push({ str: fileStr.substring(endArr[i], startArr[i+1])})
        }
        let highLight = temp.filter((item)=>item.highLight)
        setFileDataHighLight(highLight.map((item)=>({name:tag.name,id:item.id})))
        setFileDataShow(temp.map((item) => ({ ...item, str: item.str.replace(condition, '') })))
    }

    const showTagHandler = (e) => {
        if (e.target.checked) {
            setCondition('')
        } else (
            setCondition(/<.*>/g)
        )
    }

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="flex flex-row h-[calc(100%-64px)]">
                <FileSideBar files={files} setFiles={setFiles} buttonClick={buttonClick} openState={openState} setOpenState={setOpenState} deleteClick={deleteClick} />
                <div className={`flex flex-row ${openState ? 'w-9/12' : 'w-full'}`}>
                    {!isLoading && (<FileView fileDataShow={fileDataShow} />)}
                    {isLoading && (
                        <div role="status" className="m-auto">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                    {(fileData?.data !== undefined) && (
                        <SearchBar searchText={searchText} showTagHandler={showTagHandler} onTextChange={onTextChange} onClickSearch={onClickSearch} tags={tags} onTagClick={onTagClick} fileDataHighLight={fileDataHighLight} />
                    )}
                </div>
            </div>
        </>
    )
}

export default FileViewMain