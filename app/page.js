"use client";
import React, { useContext, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { GlobalContext } from "@/context/GlobalContext";
import { HiLightBulb } from "react-icons/hi";
import { LiaLightbulbSolid } from "react-icons/lia";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "./components/Modal/Modal";
import Loading from "./components/Loading/Loading";

const Home = () => {
  const {
    mode,
    toggleMode,
    setGetEditTaskValue,
    setGetEditTaskValueId,
    toggleModal,
    setGoSpinner,
    goSpinner,
  } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const session = useSession();
  const router = useRouter();

  const email = session?.data?.user?.email;

  // хэрэглэгч нэвтрээгүй үед шууд логин луу үсэрнэ

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  // бүх таскаа дуудаж буй

  const fetchTodo = () => {
    fetch(`/api/todo/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // real time аар өөрчлөгдөх нэг секунд тутам

  useEffect(() => {
    fetchTodo();

    const intervalId = setInterval(fetchTodo, 1000);

    return () => clearInterval(intervalId);
  }, [email]);

  // шинээр таск үүсгэх

  const addTodo = () => {
    setGoSpinner(true);
    if (inputValue.trim() !== "") {
      const orderData = {
        email: email,
        todo: inputValue,
      };

      fetch("api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          setGoSpinner(false);
          console.log(response);
        })
        .catch((err) => {
          setGoSpinner(false);
          console.log(err);
        });

      setInputValue("");
    }
  };

  // enter товчоор нэмэх

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Бүх таскаа устгах

  const deleteAllTodo = () => {
    setGoSpinner(true);

    fetch(`api/todos/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setGoSpinner(false);
        if (response.ok) {
          setGoSpinner(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setGoSpinner(false);
      });
  };

  // Нэг таскаа устгах

  const deleteOneItem = (el) => {
    setGoSpinner(true);
    fetch(`api/todo/${el}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setGoSpinner(false);
        if (response.ok) {
          setGoSpinner(false);
        }
      })
      .catch((err) => {
        setGoSpinner(false);
        console.log(err);
      });
  };

  const editTask = (el, id) => {
    toggleModal();
    setGetEditTaskValue(el);
    setGetEditTaskValueId(id);
  };

  return (
    <div
      className={`${
        mode === "light" ? "light-mode whiteScreen" : "dark-mode overlay"
      } flex flex-col items-center min-h-full  `}
    >
      {goSpinner ? <Loading /> : null}

      <Modal />
      <div className="flex md:flex-row flex-col justify-between w-[700px] mt-20 mb-6">
        <h1 className="text-2xl  font-bold text-center md:text-normal">Хийх зүйлсийн жагсаалт</h1>
        {mode === "light" ? (
          <HiLightBulb onClick={toggleMode} color="yellow" size={30} />
        ) : (
          <LiaLightbulbSolid onClick={toggleMode} size={30} />
        )}
      </div>

      <div className="flex flex-col rounded-md md:w-[800px] w-[400px] py-6 px-6 text-white">
        <div className="flex items-center gap-3 rounded-md mb-10 bg-mainColor py-3 px-3 w-full text-white">
          <IoMdAdd
            onClick={addTodo}
            className="border-[1px] border-white rounded-full hover:border-gray-500 duration-500"
            color="white"
            size={18}
          />
          <input
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyPress}
            value={inputValue}
            className="bg-mainColor py-3 text-md placeholder:bg-mainColor h-full w-full focus:bg-mainColor border-none"
            type="text"
            placeholder="Шинээр жагсаалт үүсгэх..."
          />
        </div>

        <div className="flex flex-col w-auto text-white overflow-y-auto max-h-[250px]">
          {todos.map((el, index) => (
            <div
              key={el._id}
              className=" w-auto text-sm md:text-md bg-mainColor px-3 py-3 rounded-md border-b-white border-b-[1px]"
            >
              {index + 1}. {el.todo}
              <div className="flex justify-between mt-3 items-center">
                <div className="text-sm  text-gray-500 font-bold">
                  {el.createdData}
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => deleteOneItem(el._id)}
                    className="text-red-500 text-[12px]"
                  >
                    УСТГАХ
                  </button>
                  <button
                    onClick={() => editTask(el.todo, el._id)}
                    className="text-blue-500 text-[12px]"
                  >
                    ЗАСАХ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-md bg-mainColor px-4 py-4 text-gray-400">
          <div>{todos.length} жагсаалт байна</div>

          <button onClick={deleteAllTodo}>бүгдийг устгах</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
