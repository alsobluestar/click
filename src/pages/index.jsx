import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    const url = "/api/click";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  const handleClick = () => {
    const url = "/api/click";
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 300);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-zinc-800 h-screen">
        <div
          className="text-3xl font-bold mt-2 w-24 h-24 flex items-center justify-center bg-blue-500 hover:bg-red-500 text-white rounded-md shadow-md"
          onClick={() => {
            handleClick();
            fetchData();
          }}
        >
          {data.count}
        </div>
      </div>
    </>
  );
}
