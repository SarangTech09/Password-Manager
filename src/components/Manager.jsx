import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "password";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );

      setform({ site: "", username: "", password: "" });
      toast(" Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Please fill all the fields Correctly!");
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((i) => i.id !== id));
  };

  const deletePassword = (id) => {
    let c = confirm("Do you sure about deleting this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast(" Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const copyText = (text) => {
    toast("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="p-3 md:p-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP</span>
          <span className="text-green-500">/&gt;</span>
        </h1>
        <p className="text-center text-green-900 text-lg">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col items-center p-4 gap-8">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full p-4 py-1 border border-green-500 w-full"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full p-4 py-1 border border-green-500 w-full text-black"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full md:w-auto">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter password"
                className="rounded-full p-4 py-1 border border-green-500 w-full text-black"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eyecross.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 gap-2 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto rounded-md overflow-hidden mb-10 min-w-full">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Site</th>
                    <th className="py-2 px-4">Username</th>
                    <th className="py-2 px-4">Passwords</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="border border-white py-2 text-center px-4">
                          <div className="flex justify-center items-center gap-2">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{ width: "25px", height: "25px" }}
                                src="https://cdn.lordicon.com/depeqmsz.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center border border-white py-2 px-4">
                          <div className="flex justify-center items-center gap-2">
                            <span>{item.username}</span>
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{ width: "25px", height: "25px" }}
                                src="https://cdn.lordicon.com/depeqmsz.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center border border-white py-2 px-4">
                          <div className="flex justify-center items-center gap-2">
                            <span>{"*".repeat(item.password.length)}</span>
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{ width: "25px", height: "25px" }}
                                src="https://cdn.lordicon.com/depeqmsz.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center border border-white py-2 px-4">
                          <div className="flex justify-center items-center gap-2">
                            <span
                              className="cursor-pointer"
                              onClick={() => editPassword(item.id)}
                            >
                              <img
                                src="icons/edit-icon.png"
                                alt=""
                                style={{ width: "25px", height: "25px" }}
                              />
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => deletePassword(item.id)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
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
