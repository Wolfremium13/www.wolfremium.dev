import {GiDwarfHelmet} from "react-icons/gi";
import Link from 'next/link';

const AdminPage = () => {
    const links = [
        {href: '/admin/posts', label: 'Administrador de posts'},
    ];

    return (
        <div className="container mx-auto px-4 bg-gray-900/70 mt-2 p-2 rounded-2xl">
            <h1 className="text-2xl font-bold flex items-center mb-4 text-lightGreen">
                <GiDwarfHelmet className="mr-2"/>
                Panel de Administración
            </h1>
            <p className="mb-4">
                Bienvenido al panel de administración. Desde aquí puedes gestionar los posts.
            </p>
            <p className="mb-4 text-gray-400">
                Utiliza <span className="font-semibold">Ctrl + L</span> para alternar la visibilidad de los enlaces
                en el navbar.
            </p>
            <h2 className="text-xl font-bold mb-2">Enlaces</h2>
            <div className="space-y-2">
                {links.map(({href, label}) => (
                    <button key={href}
                            className="bg-darkViolet text-lightGreen px-4 py-2 rounded-lg hover:bg-mediumViolet hover:text-white border border-lightGreen">
                        <Link href={href}>{label}</Link>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
