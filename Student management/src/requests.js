import axios from "axios";

let URL = `http://localhost:8000/studentDetails`;

export const fetchData = async (
  setLength,
  setData,
  setError,
  page = 1,
  limit = 5,
  query = "name",
  order = "asc",
  searchQuery,
  id
  // setIsLoading = false
) => {
  // setIsLoading(true);
  let url = `${URL}?_page=${page}&_limit=${limit}&_sort=${query}&_order=${order}&id_ne=${id}`;
  if (searchQuery === "") {
    page = 1;
  }
  if (searchQuery.length > 0) {
    url = `${URL}?_page=${page}&_limit=${limit}&_sort=${query}&_order=${order}&q=${searchQuery}&id_ne=${id}`;
  }
  try {
    let urlForLength = `${URL}`;
    if (searchQuery.length > 0) {
      urlForLength = `${URL}?q=${searchQuery}`;
    }
    const res = await axios.get(urlForLength);
    setLength(res.data.length);
    const response = await axios.get(url);

    setData(response.data);
  } catch (e) {
    setError("Something went wrong!");
  }
  // setIsLoading(false);
};

export const addData = async (obj, setError) => {
  try {
    await axios({
      method: "post",
      url: `${URL}?_page=last&_limit=5`,
      "Content-Type": "application / json",
      data: obj,
    });
  } catch {
    setError("Can not add data. Please try again later!");
  }
};

export const updateData = async (id, obj, setError) => {
  try {
    await axios({
      method: "put",
      url: `${URL}/${id}`,
      "Content-Type": "application / json",
      data: { ...obj },
    });
  } catch {
    setError("Can not update data. Please try again later!");
  }
};

export const removeData = async (id, setError) => {
  try {
    await axios.delete(`${URL}/${id}`);
  } catch {
    setError(`Can't delete. Please try again`);
  }
};
