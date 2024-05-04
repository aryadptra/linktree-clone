import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import NavigationLink from '@/Components/NavigationLink';
import DropdownMenu from '@/Components/DropdownMenu';
import NavigationBarResponsive from '@/Components/NavigationBarResponsive';

export default function NavigationBar() {
    const { auth } = usePage().props
    return (
        <>
            <NavigationBarResponsive />
            <nav className="hidden border-b border-dashed border-gray-700 bg-gray-800 py-4 shadow lg:block">
                <div className="mx-auto max-w-screen-2xl">
                    <div className="flex items-center justify-between">
                        <Link
                            href={route('home')}
                            className="mr-3 text-lg font-semibold capitalize text-white"
                        >
                            {import.meta.env.VITE_APP_NAME}
                        </Link>

                        <div className="flex flex-1 items-center justify-between">
                            <div>
                                <NavigationLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavigationLink>
                                <NavigationLink
                                    href={route('links.index')}
                                    active={route().current('links.*')}
                                >
                                    Links
                                </NavigationLink>
                            </div>
                            <div className="flex items-center">
                                {auth.user ? (
                                    <>
                                        <div className="flex items-center">
                                            <DropdownMenu label={auth.user.name}>
                                                <DropdownMenu.Link
                                                    href={route('dashboard')}
                                                >
                                                    Dashboard
                                                </DropdownMenu.Link>
                                                <DropdownMenu.Link href={'#'}>
                                                    My profile
                                                </DropdownMenu.Link>
                                                <DropdownMenu.Link href={'#'}>
                                                    Settings
                                                </DropdownMenu.Link>
                                                {/* <DropdownMenu.Link href={'#'}>
                                                    My articles
                                                </DropdownMenu.Link>
                                                <DropdownMenu.Link href={'#'}>
                                                    New article
                                                </DropdownMenu.Link> */}
                                                <DropdownMenu.Link
                                                    href={route('logout')}
                                                    method="POST"
                                                    as="button"
                                                >
                                                    Logout
                                                </DropdownMenu.Link>
                                            </DropdownMenu>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
                                            <NavigationLink href={route('login')}>
                                                Login
                                            </NavigationLink>
                                            <NavigationLink href={route('register')}>
                                                Register
                                            </NavigationLink>
                                        </div>
                                    </>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
