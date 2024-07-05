import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function MasterPage() {
  const [barang, setBarang] = useState([]);
  const [params, setParams] = useState({ search: "" });
  const [edit, setEdit] = useState(null);
  const [input, setInput] = useState({
    nm_barang: "",
    harga: 0,
    Qty: 0,
  });
  const handleFormEdit = (id) => {
    const data = barang.find((item) => item.id === id);
    setInput({
      nm_barang: data.nm_barang,
      harga: data.harga,
      Qty: data.Qty,
    });
    setEdit(id);
  };
  const cancleEdit = () => {
    setEdit(null);
    setInput({
      nm_barang: "",
      harga: 0,
      Qty: 0,
    });
  };
  const handleDelete = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/master/${id}`,
      });
      FetchData();
      Swal.fire("Item Successfully Deleted");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (input.nm_barang === "" || input.harga === 0 || input.Qty === 0)
        return Swal.fire("data tidak boleh kosong");
      await axios({
        method: "put",
        url: `http://localhost:3000/master/${edit}`,
        data: input,
      });
      FetchData();
      setInput({
        nm_barang: "",
        harga: 0,
        Qty: 0,
      });
      setEdit(null);
      Swal.fire("Item Successfully Edited");
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (input.nm_barang === "" || input.harga === 0 || input.Qty === 0)
        return Swal.fire("data tidak boleh kosong");
      await axios({
        method: "post",
        url: `http://localhost:3000/master`,
        data: input,
      });
      FetchData();
      setInput({
        nm_barang: "",
        harga: 0,
        Qty: 0,
      });
      Swal.fire("Item Successfully Added");
    } catch (error) {
      console.log(error);
    }
  };
  function handleSearch(e) {
    setParams({
      ...params,
      search: e.target.value,
    });
  }
  async function FetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `http://localhost:3000/master`,
        params: params,
      });
      setBarang(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchData();
  }, [params]);
  return (
    <div className="p-20 bg-slate-300 h-screen">
      <h1 className="text-3xl font-bold">Master Page</h1>
      <div className="w-full">
        <label htmlFor="search">Search :</label>
        <input
          type="text"
          name="search"
          className="w-full h-10 border-gray-950 rounded-lg border-2"
          onChange={handleSearch}
        />
      </div>
      <div className="w-full">
        <form onSubmit={handleAdd}>
          <div className="w-full flex gap-10">
            <div className="flex flex-col">
              <label htmlFor="id_barang">Id :</label>
              <input
                type="text"
                id="id_barang"
                name="id"
                disabled
                className="border border-gray-950 rounded-md w-60 h-10 p-3"
              />
              <label htmlFor="nm_barang">Nama Barang:</label>
              <input
                type="text"
                id="nm_barang"
                name="nm_barang"
                className="border border-gray-950 rounded-md w-60 h-10 p-3"
                onChange={(e) =>
                  setInput({ ...input, nm_barang: e.target.value })
                }
                value={input.nm_barang}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="harga">Harga:</label>
              <input
                type="number"
                id="harga"
                min={1000}
                name="harga"
                className="border border-gray-950 rounded-md w-60 h-10 p-3"
                onChange={(e) => setInput({ ...input, harga: e.target.value })}
                value={input.harga}
              />
              <label htmlFor="Qty">Qty:</label>
              <input
                type="number"
                id="Qty"
                name="Qty"
                min={1}
                className="border border-gray-950 rounded-md w-60 h-10 p-3"
                onChange={(e) => setInput({ ...input, Qty: e.target.value })}
                value={input.Qty}
              />
            </div>
          </div>
          {!edit && (
            <button
              type="submit"
              className="bg-blue-500 mt-5 mb-5 hover:bg-blue-700 mr-6 w-44 text-white font-bold py-2 px-4 rounded-lg"
            >
              Add
            </button>
          )}
          {edit && (
            <div>
              <button onClick={handleEdit} type="button"  className="bg-slate-500 mt-5 mb-5 w-44 hover:bg-slate-700 mr-6 text-white font-bold py-2 px-4 rounded-lg">
                Save Edit
              </button>
              <br />
              <button onClick={cancleEdit} className="bg-slate-500 mb-5 hover:bg-slate-700 mr-6 w-44 text-white font-bold py-2 px-4 rounded-lg" type="button">
                Cancel Edit
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID Barang
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Barang
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Action / Option
              </th>
            </tr>
          </thead>
          <tbody>
            {barang.map((item, index) => {
              let display
              if (item.id < 10) {
                display = `BR-000${item.id}`;
              } else if (item.id < 100) {
                display = `BR-00${item.id}`;
              } else if (item.id < 1000) {
                display = `BR-0${item.id}`;
              } else if (item.id < 10000) display = `${item.id}`;
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {display}
                  </th>
                  <td className="px-6 py-4 text-white">{item.nm_barang}</td>
                  <td className="px-6 py-4 text-white">{item.harga}</td>
                  <td className="px-6 py-4 text-white">{item.Qty}</td>
                  <td className="px-6 py-4 text-white">
                    <button
                      onClick={() => handleFormEdit(item.id)}
                      className="bg-blue-500 hover:bg-blue-700 mr-6 text-white font-bold py-2 px-4 rounded-full"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-700 ml-6 text-white font-bold py-2 px-4 rounded-full"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MasterPage;
