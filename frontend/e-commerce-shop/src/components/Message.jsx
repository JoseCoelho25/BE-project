import React from 'react'

const Message = ({msg, type}) => {
return (
    <div className="p-7 flex justify-center align-middle bg-red-300 text-rose-900 rounded-md">
        <p>{msg}</p>
    </div>
)
}

export default Message