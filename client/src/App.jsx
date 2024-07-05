import * as React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import MasterPage from "./pages/MasterPage";
import TransPage from "./pages/TransPage";
import MainLayout from "./components/MainLayout";

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Navigate to="/master" replace />,
			},
			{
				path: "/transaksi",
				element: <TransPage />,
			},
			{
				path: "/master",
				element: <MasterPage />,
			},
		],
	},
]);

export default function App() {
	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}