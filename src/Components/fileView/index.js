import React from "react";

const FileView = (props) => {
    const {
        fileData,
    } = props
    return (
        <div className="container p-10 overflow-auto">
            <div className="p-10 bg-viewBG flex flex-col text-center bg-opacity-40">
                {fileData.length === 0 ? (
                    <>
                        Please select a file from the sidebar
                    </>
                ) : (
                    <>
                        {fileData.map((item) => (
                            <div key={item.id} id={item.id} className={`${item.highLight ? 'bg-blue-100' : ''}`}>
                                <p> {item.line}</p>
                            </div>
                        )
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default FileView;