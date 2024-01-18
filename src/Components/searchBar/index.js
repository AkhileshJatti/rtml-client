import React, { useState } from "react";

const SearchBar = (props) => {
    const {
        onTextChange,
        onClickSearch,
        tags,
        onTagClick,
        searchText,
        fileDataHighLight,
        showTagHandler
    } = props

    const [tagView, setTagView] = useState(true);

    tags.sort(function (a, b) {
        if (a.start_positions[0] > b.start_positions[0]) {
            return 1
        } else {
            return 0
        }
    })

    return (
        <div className="flex flex-col bg-sideBG overflow-auto w-1/3 px-5">
            <div className="mx-auto pt-5">
                <input type="checkbox" id="tags" name="showTags" onChange={showTagHandler} /> Show Tags
            </div>
            <div className="h-32 py-10 px-5 flex flex-row mx-auto">
                <input value={searchText} className="rounded-l-lg p-2" type="text" placeholder="Search" onChange={onTextChange} />
                <button onClick={()=>{onClickSearch();setTagView(true)}} className="w-auto flex justify-end items-center text-Navy p-2 hover:text-black bg-viewBG rounded-r-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                        </path>
                    </svg>
                </button>
            </div>
            {tags.length > 0 && (
                <div className="flex flex-col">
                    <div className="m-2 rounded bg-blue-100 flex flex-col">
                        <div className="px-5 font-black text-xl rounded-md bg-blue-300 flex flex-row relative"> <p className="py-2">Tags</p>
                            <button className="absolute right-6" onClick={() => setTagView((prev) => !prev)}>
                                {tagView ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="m-2 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="m-2 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {tagView && (
                            <>
                                {tags.map((item) => {
                                    return (<button key={item.id} className="px-10 py-3" onClick={() => { onTagClick(item); setTagView(false) }}>{item.name}</button>)
                                })}
                            </>
                        )}
                    </div>
                    {fileDataHighLight.length > 0 && (
                        <div className="overflow-auto flex flex-col gap-4 mt-10 bg-blue-100 text-center w-auto">
                            <div className="px-5 font-black text-xl rounded-md bg-blue-300 relative">
                                <p className="text-sm py-2">Instances of Selected Tag</p>
                            </div>
                            {fileDataHighLight.map((item) => (
                                <button key={item.id} className="m-auto" onClick={() => {
                                    window.location.href = window.location.href.split("/#")[0] + `#${item.id}`
                                }}>
                                    {item.name}
                                </button>
                            )
                            )}

                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;