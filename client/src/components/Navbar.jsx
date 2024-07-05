import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="bg-gray-800 p-4">
            <ul className="flex justify-center items-center">
                <li>
                    <Link to="/master" className="text-white px-10">
                        Master
                    </Link>
                </li>
                <li>
                    <Link to="/transaksi" className="text-white px-10">
                        Transaksi
                    </Link>
                </li>
            </ul>
        </nav>
	);
}
