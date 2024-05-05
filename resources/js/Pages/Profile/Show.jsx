import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function Show({ user }) {
    console.log(user);
    const getInitials = (name) => {
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
    };
    return (
        <>
            <Head title={user.name} />
            <div className="w-full min-h-screen bg-slate-800 flex justify-center items-center"> {/* Menggunakan flexbox untuk konten di tengah */}
                <div className="container mx-auto max-w-2xl">
                    <div className="bg-white rounded-lg py-10 px-5 md:py-32 md:px-10"> {/* Hapus mx-auto */}
                        <div className="flex flex-col items-center justify-center mb-4">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-12 h-12 md:w-24 md:h-24 flex items-center justify-center text-gray-800 dark:text-white text-2xl font-bold mb-2">
                                {getInitials(user.name)}
                            </div>
                            <span className="text-gray-800 font-semibold text-2xl mb-10">{user.name}</span>
                            {/* Map links from user */}
                            {user.links
                                .filter(link => link.is_active) // Filter link yang memiliki is_active true
                                .sort((a, b) => a.order - b.order) // Urutkan link berdasarkan order mereka
                                .map((link, index) => (
                                    <a target="_blank" key={index} href={link.url} className="text-gray-800 bg-blue-600 w-full py-3 text-center rounded-md dark:text-white text-lg font-semibold my-2">
                                        {link.title}
                                    </a>
                                ))}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
