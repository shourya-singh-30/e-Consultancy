 const login=async(email,password)=>{

const response=await fetch('/api/auth/provider/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
})
return response;
}

export default login
