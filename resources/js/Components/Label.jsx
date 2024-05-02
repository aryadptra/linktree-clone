import React from 'react'

export default function Label({ children, ...props }) {
    return (
        <>
            <label className='block font-medium text-gray-700 mb-2'>{children}</label>
        </>
    )
}
