import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function MockupMobile({ links }) {
    const { auth } = usePage().props;

    // Fungsi untuk mendapatkan huruf awal dari nama pengguna
    const getInitials = (name) => {
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
    };

    return (
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] dark:bg-slate-800 flex flex-col justify-center items-center">
                {auth.user && (
                    <div className="flex flex-col items-center justify-center mb-4">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center text-gray-800 dark:text-white text-xl font-bold mb-2">
                            {getInitials(auth.user.name)}
                        </div>
                        <span className="text-gray-800 dark:text-white font-semibold text-lg">{auth.user.name}</span>
                    </div>
                )}
                {links.data.map((link, index) => (
                    <a target="_blank" key={index} href={link.url} className="text-gray-800 bg-blue-600 w-full text-center rounded-md dark:text-white text-lg font-semibold my-1">
                        {link.title}
                    </a>
                ))}
            </div>
        </div>
    )
}
