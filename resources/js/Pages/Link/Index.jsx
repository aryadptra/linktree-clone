import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import MocukupMobile from '@/Components/MocukupMobile';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/InputText';
import Textarea from '@/Components/Textarea';
import InputError from '@/Components/InputError';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { RiPencilLine, RiEyeLine } from 'react-icons/ri';
const Index = ({ links }) => {
    const { auth } = usePage().props
    const [isFormVisible, setIsFormVisible] = useState(false);

    function handleAddLink() {
        setIsFormVisible(!isFormVisible);
    }

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        url: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('links.store'), {
            onSuccess: () => {
                setIsFormVisible(false);
                reset();
            }
        });
    }

    // State untuk menyimpan data edit sementara
    const [editIndex, setEditIndex] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editUrl, setEditUrl] = useState('');

    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    // Fungsi untuk menangani klik tombol edit
    const handleEdit = (link, index) => {
        setEditIndex(index);
        setEditTitle(link.title);
        setEditUrl(link.url);
        setIsEditFormVisible(true);
    }

    const cancelEdit = () => {
        setIsEditFormVisible(false);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();

        router.put(route('links.update', editIndex), {
            title: editTitle,
            url: editUrl,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditFormVisible(false);
                reset();
            }
        })
    }

    return (
        <>
            <Head title="Manage Links" />
            <section className="container mx-auto my-5">
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-12 md:col-span-4">
                        <MocukupMobile links={links} />
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="rounded-lg py-3 px-5 bg-blue-500 text-white text-lg">🔥 Your Linktree is live: <span className="font-semibold">https://aryadwiputra.com/{auth.user.username}</span>
                        </div>

                        <Transition
                            show={isFormVisible}
                            enter="transition-opacity ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <form onSubmit={handleSubmit} className="relative bg-gray-200 rounded-lg p-6 mt-5 mb-5 w-full  mx-auto">
                                <button type="button" onClick={handleAddLink} className="absolute md:top-[-5px] md:right-0 m-3 p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="mb-3">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <Input type="text" id="title" onChange={handleChange} maxLength={15} value={data.title} name="title" placeholder="Ex: My Website" />
                                    <span id='title-words'>{data.title.length}/15</span>
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                                    <Input type="text" id="url" onChange={handleChange} value={data.url} name="url" placeholder="Ex: https://example.com" />
                                    <InputError message={errors.url} className="mt-2" />
                                </div>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Link'}
                                </button>
                            </form>
                        </Transition>

                        <Transition
                            show={!isFormVisible}
                            enter="transition-opacity ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <button type="button" className="bg-slate-700 w-full my-5 rounded-lg text-center py-5 text-white font-bold text-xl" onClick={handleAddLink}>Add Link</button>
                        </Transition>

                        {links.data.length > 0 ? (
                            <div className="grid grid-cols-12 gap-6">
                                {links.data.map((link, index) => (
                                    <React.Fragment key={link.id}>
                                        <div className="col-span-12 bg-gray-200 rounded-lg shadow-md p-6">
                                            <div className="flex justify-between items-center">
                                                <h1 className="text-xl font-semibold mb-2">{link.title}
                                                </h1>
                                                <div className="flex items-center">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" value="" className="sr-only peer" />
                                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                        <span className="ms-3 text-sm font-medium text-black">{link.is_active ? 'Active' : 'Inactive'}</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mb-4">{link.url}</p>
                                            <div className="flex gap-5">
                                                {/* <button onClick={() => handleEdit(link)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                                <RiEyeLine className="w-6 h-6" />
                                            </button> */}
                                                <button onClick={() => handleEdit(link, link.id)} className="text-gray-500 hover:text-gray-700 focus:outline-none">

                                                    <RiPencilLine className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>


                                        {/* Transisi untuk form edit */}
                                        {editIndex === link.id && (
                                            <div className="col-span-12">
                                                <Transition
                                                    show={isEditFormVisible}
                                                    enter="transition-opacity ease-out duration-300"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="transition-opacity ease-in duration-200"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <form onSubmit={handleEditSubmit} className="relative bg-gray-200 rounded-lg p-6 mt-5 mb-5 w-full  mx-auto">
                                                        <button type="button" onClick={cancelEdit} className="absolute md:top-[-5px] md:right-0 m-3 p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                        <div className="mb-3">
                                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                                            <Input type="text" id="title" onChange={(e) => setEditTitle(e.target.value)} maxLength={15} value={editTitle} name="title" placeholder="Ex: My Website" />
                                                            <span id='title-words'>{data.title.length}/15</span>
                                                            <InputError message={errors.title} className="mt-2" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                                                            <Input type="text" id="url" onChange={(e) => setEditUrl(e.target.value)} value={editUrl} name="url" placeholder="Ex: https://example.com" />
                                                            <InputError message={errors.url} className="mt-2" />
                                                        </div>
                                                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full" disabled={processing}>
                                                            {processing ? 'Saving...' : 'Save Link'}
                                                        </button>
                                                    </form>
                                                </Transition>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                        ) : (
                            <p>No links added yet</p>
                        )}

                        {/* <form >
                            <input type="hidden" name="id" value={editData.id} />
                            <div className="mb-3">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" id="title" onChange={(e) => setEditData('title', e.target.value)} value={editData.title} name="title" placeholder="Ex: My Website" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                                <input type="text" id="url" onChange={(e) => setEditData('url', e.target.value)} value={editData.url} name="url" placeholder="Ex: https://example.com" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="is_active" className="block text-sm font-medium text-gray-700">Status</label>
                                <select id="is_active" onChange={(e) => setEditData('is_active', e.target.value)} value={editData.is_active} name="is_active" className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                </select>
                            </div>
                        </form> */}
                    </div>
                </div>
            </section>
        </>
    );
}

Index.layout = page => <AppLayout children={page} title="Inertia" />;

export default Index;
