import React, {useState, useEffect} from "react";
import {FaSearch} from "react-icons/fa"
import "./FilmList.css"

export const FilmList = ({ }) => {
    const [input, setInput] = useState("")

    useEffect(() => {
        // fetchData()
    },[]);

    // const fetchData = () => {
    //     fetch(`https://mdblist.com/lists/linaspurinis/top-10-pirated-movies-of-the-week-50/json`)
    //     .then((response) => {
    //         console.log(response.json())
    //     })
    // }

    // const handleChange = (value) => {
    //     setInput(value)
    //     fetchData(value)
    // }

    return (
    <div className="">
        List
    </div>
    )
}