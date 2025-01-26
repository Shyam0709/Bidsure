import React, { useEffect } from 'react'

const Logout = () => {
    useEffect(()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    })
  return (
    <div>Logout</div>
  )
}

export default Logout