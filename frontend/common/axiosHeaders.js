export const axiosHeaders = () => {
    const dataHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
  
    const formHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "multipart/form-data",
    };
  
    return { dataHeaders, formHeaders };
  };