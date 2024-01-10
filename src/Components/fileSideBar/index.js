import React from "react";
import FileButton from "../fileButton";

const FileSideBar = (props) => {
    const {
        files,
        buttonClick,
        openState,
        setOpenState
    } = props;

    return (
        <>
            {openState ? (

                <div className="container p-5 w-3/12 bg-sideBG shadow-lg shadow-white gap-8 flex flex-col">
                    <button onClick={() => { setOpenState(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {files.map((item) => {
                        return <FileButton fileName={item} key={item} buttonClick={buttonClick} />
                    })}
                </div>

            ) : (
                <>
                    <div className="container p-5 w-14 bg-sideBG shadow-lg shadow-white gap-8 flex flex-col">
                        <button onClick={() => { setOpenState(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                        {files.map(() => {
                            return (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                            )
                        })}
                    </div>
                </>
            )}
        </>
    );
}

export default FileSideBar;