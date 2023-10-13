import { useEffect } from "react";

export default function NotFoundPage() {

    useEffect(()=> {
        async function fetchFromServer() {
            await fetch('/redirect', {
                method: 'GET'
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setTimeout(function() {
                    window.location.href = data.redirectUrl
                }, 1000)
            })
        }
        fetchFromServer()
    },[])

    return (
        <div>Invalid route, redirecting</div>
    )
}