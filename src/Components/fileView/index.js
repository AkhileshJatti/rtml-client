import React from "react";

const FileView = (props) => {
    const {
        fileData,
        showTagHandler
    } = props
    return (
        <div className="h-screen container p-10 overflow-auto">
            <div>
                <input type="checkbox" id="tags" name="showTags" onChange={showTagHandler} /> Show Tags
            </div>
            <div className="p-10 bg-viewBG flex flex-col text-center">
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