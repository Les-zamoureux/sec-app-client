const emailCheck = (email) => {
    if(email.includes('@') && email.includes('.')) return true
    else return false
}

export {emailCheck}