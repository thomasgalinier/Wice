
export const fetchUsers = async (jwtToken: string | undefined) => {
    const res = await fetch("http://localhost:3000/auth/user/me", {
        method:'GET', 
        headers: { "Authorization": `Bearer ${jwtToken}` }
        
    })    
    if(!res.ok){
        return null
    }
    return res.json()
}