import react from "react";
import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    //this is going to fire when the component renders
    // as second argument inside the useEffect we need to pass in our dependencies, which is url. So if something change for some reason then use effect will run again.
    useEffect(() => {

        //you can only make the function inside useEffect async
        const fetchData = async () => {
            //reset the loading to true when we try to fetch the data
            setLoading(true)

            try {
                const res = await fetch(url) //fetch api and pass in the url
                const json = await res.json() //get the data that we got from fetch and pass it as an javascript object

                //update data
                setData(json)
                setLoading(false) //because we finished the fetch
            } catch (error) {
                setError(error) //set with whatever error we get
                setLoading(false)
            }
        }
        //invoke the fetchData function so it runs
        fetchData()
    }, [url])

    return {loading, error, data}
}

export default useFetch