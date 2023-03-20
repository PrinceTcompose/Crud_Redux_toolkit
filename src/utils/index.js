import axios from "axios";

export const axiosAPICall = async (endPoint, method, obj) => {
    try {
        if (method == "post" || method == "put") {
            const response = await axios[method](`https://crudcrud.com/api/b10f69ee44c14f48a8e15e765c686d43/${endPoint}`, obj)
            if ((method == "put" && response.status == 200) || (method == "post" && response.status == 201)) {
                return response.data;
            } else {
                return "something went wrong";
            }
        }
        else {
            const response = await axios[method](`https://crudcrud.com/api/b10f69ee44c14f48a8e15e765c686d43/${endPoint}`)
            if (response.status == 200) {
                console.log("Responce Data == = > ", response.data);
                return response.data;
            } else {
                return "something went wrong";
            }
        }

    } catch (error) {
        console.log(error);
    }
}