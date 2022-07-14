import React, { FC, useState } from "react";
import IpfsService from "../service/ipfs.service";

const Store: FC = () => {
  const [file, setFile] = useState<File>(undefined!);
  const upload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    IpfsService.createFile(file)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div>
      <form className="inline-flex justify-evenly">
        <input
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={(e) => setFile(e.target.files![0])}
        />
        <button
          type="button"
          disabled={file ? false : true}
          onClick={async (e) => await upload(e)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          upload
        </button>
      </form>
    </div>
  );
};

export default Store;
