import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'

const Dashboard = () => {
    return (
        <>
            <Head title="Dashboard" />
        </>
    )
}

Dashboard.layout = page => <AppLayout children={page} title="Inertia" />

export default
    Dashboard
