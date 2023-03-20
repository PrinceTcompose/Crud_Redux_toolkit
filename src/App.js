import { React, useState, useEffect, createContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { WhisperSpinner } from 'react-spinners-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from './Component/List';
import Modal from './Component/Modal';
import { axiosAPICall } from './utils';
import "./style.css";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { showAllUser, addUser, deleteUser, updateUser } from './Store/slices/UserSlice';

const mycontext = createContext();

const App = () => {

  const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  // const { data } = useSelector((state) => state.users.data);
  const { isLoading, userData, isError } = useSelector((state) => state);

  // const data = useSelector((state) => state.users.data);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_no: "",
    date_of_birth: "",
    address: ""
  });

  const [user, setUser] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedItem, seteditedItem] = useState(null);
  const [mobileError, setMobileError] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    // setLoading(true);
    try {
      // const respone = axiosAPICall('users', 'get');

      respone.then((result) => {
        // setUser(result);
        // setLoading(false);


        dispatch(showAllUser(result));
      });
    }
    catch (error) {
      console.log(error);
    }
    dispatch(showAllUser());

  }
  console.log("User Details ", userData);

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("Local Data ==> ", user);

  const onAdduserFun = () => {
    setEdit(false);
    setFormData({
      name: "",
      email: "",
      contact_no: "",
      date_of_birth: "",
      address: ""
    });
    seteditedItem(null);
  }

  const setApiData = async () => {
    const editedDataObj = {
      name: formData.name,
      email: formData.email,
      contact_no: formData.contact_no,
      date_of_birth: formData.date_of_birth,
      address: formData.address
    };
    console.log("Add Data");
    const respone = await axiosAPICall('users', 'post', editedDataObj);

    console.log("Add Data ==> ", respone);

    setUser(prev => [...prev, respone]);
  }

  const setEditApiData = (id) => {
    const editedDataObj = {
      name: formData.name,
      email: formData.email,
      contact_no: formData.contact_no,
      date_of_birth: formData.date_of_birth,
      address: formData.address
    };

    const respone = axiosAPICall(`users/${id}`, 'put', editedDataObj);
    console.log('Edit respone :>> ', respone);

    respone.then((result) => {
      (result === "") && setUser(user.map((detail) => {
        if (detail._id === id) return editedDataObj
        return detail;
      }));
    });

  }




  const getData = (e) => {
    e.preventDefault();

    if (formData.name === "" || formData.email === "" || formData.contact_no === "" || formData.date_of_birth === "" || formData.address === "" || mobileError !== "") {
      toast.error('Please Fill All Data !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    else if (edit && (formData.name !== "" && formData.email !== "" && formData.contact_no !== "" && formData.date_of_birth !== "" && formData.address !== "" && mobileError === "")) {

      console.log("Edit Email .... ");
      let email = userData.find((val) => {
        return formData.email !== editedEmail && val.email === formData.email;
      });
      if (!email) {
        setEditApiData(editedItem._id);

        setEdit(false);
        seteditedItem(null);
        setFormData({
          name: "",
          email: "",
          contact_no: "",
          date_of_birth: "",
          address: ""
        })
        toast.success('Task Updated Successfully !', {
          position: toast.POSITION.TOP_RIGHT
        });

      }
      else {
        toast.error('This Email is Already registered !', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
    else {
      // setUser([...user, formData]);
      let email = userData.find((val) => {
        return val.email === formData.email;
      });

      console.log(email);
      if (!email) {
        console.log("Calling Add Data API .....");
        setApiData();

        setFormData({
          name: "",
          email: "",
          contact_no: "",
          date_of_birth: "",
          address: ""
        });
        toast.success('Task Added Successfully !', {
          position: toast.POSITION.TOP_RIGHT
        });

      }
      else {
        // alert("Your Email is Already registered");
        toast.error('This Email is Already registered !', {
          position: toast.POSITION.TOP_RIGHT
        });
      }


    }

  }


  const setDelApiData = async (id) => {
    const respone = axiosAPICall(`users/${id}`, 'delete');
    console.log('Delete respone :>> ', respone);

    respone.then((result) => {
      (result === "") && setUser(userData.filter((detail) => {
        return detail._id !== id;
      }));
    });


  }
  const deleteItem = (id) => {
    // setUser(user.filter((val) => val._id !==id));
    setDelApiData(id);

    toast.error('Task Deleted Successfully !', {
      position: toast.POSITION.TOP_RIGHT
    });

  }


  const handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setFormData({ ...formData, [name]: val })
  }

  const updateItem = (id) => {
    setEdit(true);
    let mydata = userData.find((val) => {
      return val._id === id;
    })
    seteditedItem(mydata);
    setEditedEmail(mydata.email);

    setFormData({
      name: mydata.name,
      email: mydata.email,
      contact_no: mydata.contact_no,
      date_of_birth: mydata.date_of_birth,
      address: mydata.address
    });
  }


  const validateMobile = () => {
    if (formData.contact_no.length !== 10 || isNaN(formData.contact_no)) {
      setMobileError("Please Enter 10 Digit Number")
    }
  }

  return (
    <>
      {(loading) ? <div className="text-center mx-auto" style={{ height: "100vh", width: "100wh" }}>
        <WhisperSpinner size={100} className="" color="#585858" />
      </div> :
        <>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
            theme="light"
          />

          <div className="container">
            <div className="row text-center mt-5">
              <h3>User Data</h3>
            </div>

            <button type="button" className="btn btn-add mb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={onAdduserFun}>
              Add User
            </button>

            <div className="table-responsive">
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className='text-center'>Name</th>
                    <th scope="col" className='text-center'>Email</th>
                    <th scope="col" className='text-center'>Contact No</th>
                    <th scope="col" className='text-center'>DOB</th>
                    <th scope="col" className='text-center'>Address</th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (userData.length > 0) && userData.map((val, ind) => {
                      return (
                        <List key={ind} val={val} deleteItem={deleteItem} updateItem={updateItem} />
                      )
                    })
                  }
                  {
                    // console.log(data)
                    // console.log("Selector ==> ", selector)

                    console.log("State Data Log == > ", data)
                  }
                </tbody>
              </table>
              {!userData.length > 0 && <div className='mt-2 text-center w-100'>No Data Found</div>}
            </div>

            <mycontext.Provider value={[formData, edit, setEdit, mobileError, setMobileError]}>
              <Modal handleChange={handleChange} getData={getData} onAdduserFun={onAdduserFun} validateMobile={validateMobile} />
            </mycontext.Provider>
          </div >

        </>
      }
    </>
  )
}

export default App;
export { mycontext };
