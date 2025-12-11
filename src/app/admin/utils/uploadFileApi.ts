import parseError from "@luz-catalogue/utils/parseError";
import { UploadFileResponse } from "@luz-catalogue/app/api/catalogue/upload-file/types";

const uploadFileApi = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/catalogue/upload-file", {
      method: "POST",
      body: formData,
    });
    const data: UploadFileResponse = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    const error = parseError(e);
    console.error(error);
    return { error };
  }
};

export default uploadFileApi;
