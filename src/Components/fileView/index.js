import React from "react";

const FileView = (props) => {
    const {
        fileDataShow,
    } = props

    console.log(fileDataShow)
    return (
        <div className="container p-10 overflow-auto">
            <div className="p-10 bg-viewBG flex flex-col text-center bg-opacity-40">
                {fileDataShow?.map((lineItem) => {
                    if((lineItem.str)===""){
                        return (<>Please Select a File from the Sidebar</>)
                    }
                    return (lineItem?.str?.split('\n').map((item) => <div id={lineItem?.id} className={lineItem?.highLight ? "bg-blue-100 scroll-mt-10" : "bg-none"}>{item}</div>
                    ))
                })}
            </div>
        </div>
    );
}

export default FileView;