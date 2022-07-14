import query from "./query";

class ApiService {
  getServerBlock() {
    return query.get("block/");
  }

  getTransactionReceipt(hash: string) {
    return query.get(`/transaction/receipt/${hash}`);
  }

  getToken(address: string, amount: number, signature: string) {
    return query.post(`/contract/mint-token/`, {
      address,
      amount,
      signature,
    });
  }
}

export default new ApiService();
