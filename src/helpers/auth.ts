const storeLoginToken = async (access_token : string , days : number = 10) => {
    await fetch('/api/login' , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ access_token })
    })
}


const removeLoginToken = async () => {
    await fetch('/api/logout' , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
}

export { storeLoginToken , removeLoginToken };