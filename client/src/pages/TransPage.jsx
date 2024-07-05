import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function TransPage() {
  const [barang, setBarang] = useState([]);
  const [params, setParams] = useState({ search: "" });
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  function addCart(event) {
    event.preventDefault();
    let newItems = {
      id: event.target[0].value,
      Qty: parseInt(event.target[1].value),
      harga: parseInt(event.target[2].value),
      nm_barang: event.target[3].value,
    };
    setItems((prev) => {
      let found = false;
      let newData = prev.map((item) => {
        if (item.id === newItems.id) {
          found = true;
          return {
            id: item.id,
            Qty: item.Qty + newItems.Qty,
          };
        }
        return item;
      });
      if (!found) {
        newData = [...newData, newItems];
      }
      setTotal(total + newItems.harga * newItems.Qty);
      return newData;
    });
    Swal.fire({
      title: "success added to cart",
      icon: "success",
    });
  }
  const handleAddTrans = async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: `http://localhost:3000/transaksi`,
        data: {
          items,
          total,
        },
      });
      setItems([]);
      Swal.fire("Success Adding Transaction");
    } catch (error) {
      console.log(error);
      Swal.fire(error.message);
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
    <div className="p-28 bg-slate-300 h-max">
      <h1 className="text-3xl font-bold mb-4">Transaction Page</h1>
      <div className="w-full mb-9">
        <label htmlFor="search">Search :</label>
        <input
          type="text"
          name="search"
          className="w-full border-gray-950 rounded-lg border-2 h-12"
          onChange={handleSearch}
        />
      </div>
      {items.length > 0 && (
        <div>
          <h1>Cart : </h1> <br />
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
              {items.map((item, index) => {
                let display;
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
                        onClick={() => {
                          setItems((prev) => {
                            let newData = prev.filter(
                              (item) => item.id !== item.id
                            );
                            setTotal(total - item.harga * item.Qty);
                            return newData;
                          });
                        }}
                        className="bg-red-500 hover:bg-red-700 mr-6 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            onClick={handleAddTrans}
            className="bg-green-500 hover:bg-green-700 mr-6 text-white font-bold py-2 px-4 rounded-lg mt-4 mb-7"
          >
            Purchase Now
          </button>
          <h1 className="text-black font-extrabold mb-9">
            Total :{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(total)}
          </h1>
        </div>
      )}
      <div className=" mb-4 relative overflow-x-auto shadow-md sm:rounded-lg">
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
              let display;
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
                    <div key={index}>
                      <form onSubmit={addCart}>
                        <input name="id" type="hidden" value={item.id} />
                        <label
                          htmlFor="numberInput"
                          className="text-white mr-4"
                        >
                          Total Pieces:
                        </label>
                        <input
                          type="number"
                          id="numberInput"
                          min="1"
                          name="Qty"
                          className="h-10 w-48 text-black text-center"
                        />
                        <input name="harga" type="hidden" value={item.harga} />
                        <input
                          name="nm_barang"
                          type="hidden"
                          value={item.nm_barang}
                        />
                        <button
                          className="bg-green-500 -mr-48 ml-10 hover:bg-green-600 px-4 py-2 text-white rounded-md mt-3"
                          type="submit"
                        >
                          Add to Cart
                        </button>
                      </form>
                    </div>
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

export default TransPage;
