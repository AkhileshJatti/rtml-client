import React from "react";

const FileView = (props) => {
    const {
        fileDataShow,
    } = props
    return (
        <div className="container p-10 overflow-auto">
            <div className="p-10 bg-viewBG flex flex-col text-center bg-opacity-40">
                {fileDataShow?.map((lineItem) => {
                    if(typeof (lineItem.str)==="number"){
                        return (<>Please Select a File</>)
                    }
                    return (lineItem?.str?.split('\n').map((item) => <div id={lineItem?.id} className={lineItem?.highLight ? "bg-blue-100" : "bg-none"}>{item}</div>
                    ))
                })}
            </div>
        </div>
    );
}

export default FileView;