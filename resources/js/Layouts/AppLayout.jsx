import React from 'react'
import NavigationBar from '@/Components/NavigationBar'

export default function AppLayout({ children }) {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    )
}
