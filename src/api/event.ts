export const getEventById  = async (id: number, jwtToken: string | undefined) => {
    const res = await fetch(`http://localhost:3000/event/${id}`, {
        method:'GET', 
        headers: { "Authorization": `Bearer ${jwtToken}`}
    })
    if(!res.ok){
        return null
    }
    return res.json()
}

export const registerEvent = async(idEvent: number, jwtToken: string) => {
    const requestOption = {
        method: 'POST',
        headers:{ "Authorization": `Bearer ${jwtToken}`}
    }
    const res = await fetch(`http://localhost:3000/event/${idEvent}/register`, requestOption)
    if(!res.ok){
        return Error
    }
    return res
}
