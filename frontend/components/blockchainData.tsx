import React, { FC, useState, useEffect } from "react";
import blockchainService from "../service/blockchain.service";

const BlockchainData: FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      blockchainService.address(),
      blockchainService.etherBalance(),
      blockchainService.tokenAddress(),
      blockchainService.tokenName(),
      blockchainService.symbol(),
    ])
      .then((values) => {
        console.log(values);
        setData(values);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const renderList = (): JSX.Element[] => {
    return data.map((element, index) => {
      return (
        <div
          key={index}
          className="block py-2 px-4 w-full text-white bg-blue-700 rounded-t-lg border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600"
        >
          {element}
        </div>
      );
    });
  };

  return (
    <div className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {renderList()}
    </div>
  );
};

export default BlockchainData;
