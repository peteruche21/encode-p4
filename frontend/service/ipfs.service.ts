import query from "./query";

class IpfsService {
  getAllData() {
    return query.get("/");
  }

  getById(id: number) {
    return query.get("/ipfs/:id");
  }

  createFile(file: Blob) {
    // formData
    let imageData = new FormData();
    imageData.append("file", file);

    return query.post("/file", imageData, {
      headers: {
        "Content-Type": "multipart/form",
      },
    });
  }
}

export default new IpfsService();
