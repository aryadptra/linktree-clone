import ApplicationLogo from '@/Components/ApplicationLogo'
import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputText from '@/Components/InputText'
import Label from '@/Components/Label'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    }

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="text-center my-5">
                    <h1 className="text-4xl">Register</h1>
                    <p className="text-gray-500  mt-2">Register your account to use our services</p>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <Label htmlFor="name">Name</Label>
                            <InputText value={data.name} name='name' type='text' onChange={handleChange} />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="email">Email</Label>
                            <InputText value={data.email} name='email' type='email' onChange={handleChange} />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="username">Username</Label>
                            <InputText value={data.username} name='username' onChange={handleChange} />
                            <InputError message={errors.username} className="mt-2" />
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="password">Password</Label>
                            <InputText value={data.password} name='password' type='password' onChange={handleChange} />
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="password">Password Confirmation</Label>
                            <InputText value={data.password_confirmation} name='password_confirmation' type='password' onChange={handleChange} />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="block mb-4">
                            <label className="flex justify-between items-center">
                                <Link href={route('login')} className='text-blue-500'>Already have an account?</Link>
                            </label>
                        </div>
                        <button className='bg-gray-800 rounded-lg text-white w-full px-5 py-2' type="submit" disabled={processing}>
                            {processing ? 'Loading...' : 'Register'}
                        </button>
                    </form>
                </div >

            </div >
        </>
    )
}
