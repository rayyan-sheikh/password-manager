import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/eye.png")) {
      ref.current.src = "/open-eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eye.png";

      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 1 &&
      form.username.length > 1 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" });
    } else {
      toast("Error: Check Password Length", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Delete Password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      {/* <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#da1a32_100%)]"></div> */}

      <div className="p-2 md:p-0 md:mycontainer">
        <div className="flex flex-col items-center">
          <div className="logo mt-10 font-logo text-4xl text-black ">
            PASSW*RD{" "}
            <span className="font-extrabold text-6xl text-primary ">
              MANAGER
            </span>
          </div>
          <p className="text-primary text-lg text-center font-mono">
            Manage all your Passwords in one place
          </p>
        </div>
        <div className="text-black flex flex-col p-4 gap-8 items-center pr-5">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-md border-primary border-2 w-full p-4 py-1 bg-transparent text-black"
            type="text"
            name="site"
            id="site"
            placeholder="Website URL"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className=" rounded-md border-primary border-2 w-full p-4 py-1 bg-transparent"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className=" rounded-md border-primary border-2 w-full p-4 py-1 bg-transparent"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <span
                className="absolute right-[-4px] top-[1px] p-4 py-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  src="/open-eye.png"
                  alt="open-eye"
                  width={25}
                  className="p-1 invert"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-primary rounded-md text-white px-4 py-2 w-fit font-medium text-lg hover:bg-secondary"
          >
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 text-primary uppercase">Your Passwords</h2>
          {passwordArray.length === 0 && <div className="font-bold">No Passwords. Start adding passwords now!</div>}
          {passwordArray.length !== 0 && (
            <div className="">
            <table className="border-collapse w-full">
              <thead className="">
                <tr className="">
                  <th className="p-3 font-bold uppercase bg-primary text-white border border-primary hidden lg:table-cell">Website</th>
                  <th className="p-3 font-bold uppercase bg-primary text-white border border-primary hidden lg:table-cell">Username</th>
                  <th className="p-3 font-bold uppercase bg-primary text-white border border-primary hidden lg:table-cell">Password</th>
                  <th className="p-3 font-bold uppercase bg-primary text-white border border-primary hidden lg:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0  bg-primary text-white px-2 py-1 text-xs font-bold uppercase">WEBSITE </span>
                        <div className="flex items-center justify-center">
                          <span
                            onClick={() => copyText(item.site)}
                            className="cursor-cell"
                          >
                            {item.site}
                          </span>
                        </div>
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0  bg-primary text-white px-2 py-1 text-xs font-bold uppercase">USERNAME </span>
                        <div className="flex items-center justify-center ">
                          <span
                            onClick={() => copyText(item.site)}
                            className="cursor-cell"
                          >
                            {item.username}
                          </span>
                        </div>
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0 bg-primary text-white px-2 py-1 text-xs font-bold uppercase">PASSWORD </span>
                        <div className="flex items-center justify-center">
                          <span
                            onClick={() => copyText(item.site)}
                            className="cursor-cell"
                          >
                            {item.password}
                          </span>
                        </div>
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span className="lg:hidden absolute top-0 left-0  bg-primary text-white px-2 py-1 text-xs font-bold uppercase">ACTIONS </span>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                          <span
                            onClick={() => editPassword(item.id)}
                            className="cursor-pointer"
                          >
                            <button
                              className="select-none rounded-lg bg-transparent py-2 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-primary border border-primary hover:bg-primary hover:text-white  shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="button"
                            >
                              Edit
                            </button>
                          </span>
                          <span
                            onClick={() => deletePassword(item.id)}
                            className="cursor-pointer"
                          >
                            <button
                              className="select-none rounded-lg bg-primary py-2 px-2 text-center align-middle font-sans text-xs font-bold hover:bg-white hover:border-primary hover:border hover:text-primary  uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="button"
                            >
                              Delete
                            </button>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Manager;
