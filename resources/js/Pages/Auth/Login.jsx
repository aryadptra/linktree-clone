import ApplicationLogo from '@/Components/ApplicationLogo'
import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputText from '@/Components/InputText'
import Label from '@/Components/Label'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    }

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="text-center my-5">
                    <h1 className="text-4xl">Login</h1>
                    <p className="text-gray-500  mt-2">Please login to use our services</p>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <Label htmlFor="email">Email</Label>
                            <InputText value={data.email} name='email' type='email' onChange={handleChange} />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="password">Password</Label>
                            <InputText value={data.password} name='password' type='password' onChange={handleChange} />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="block mt-4">
                            <label className="flex justify-between items-center">
                                <div className="">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2  text-gray-600">Remember me</span>
                                </div>
                                <Link href="/forgot-password" className='text-blue-500'>Forgot Password?</Link>
                            </label>
                        </div>
                        <div className="flex justify-between mb-3">
                            {/* <Link href="/register" className='text-blue-500'>Register</Link> */}
                        </div>
                        <button className='bg-gray-800 rounded-lg text-white w-full px-5 py-2' type="submit" disabled={processing}>
                            {processing ? 'Loading...' : 'Login'}
                        </button>
                        <Link className='block text-center mt-3' href={route('register')}>Register</Link>
                    </form>
                </div >

            </div >
        </>
    )
}
