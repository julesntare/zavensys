import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import CheckBox from "../../components/CheckBox";
import TextField from "../../components/TextField";
import { editUser } from "./UserSlice";

const EditUser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const users = useSelector((store) => store.users);
  const navigate = useNavigate();
  const existingUser = users.filter((user) => user.id === params.id);
  const { firstName, lastName, mobileNo, email, isConfirmed } = existingUser[0];
  const [values, setValues] = useState({
    firstName,
    lastName,
    mobileNo,
    email,
    isConfirmed,
  });

  const handleCheck = (e) => {
    setValues({ ...values, isConfirmed: !values.isConfirmed });
  };

  const handleEditUser = () => {
    setValues({
      firstName: "",
      lastName: "",
      mobileNo: "",
      email: "",
      isConfirmed: false,
    });
    dispatch(
      editUser({
        id: params.id,
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNo: values.mobileNo,
        email: values.email,
        isConfirmed: values.isConfirmed,
      })
    );
    navigate("/");
  };

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="First Name"
        value={values.firstName}
        onChange={(e) => setValues({ ...values, firstName: e.target.value })}
        inputProps={{ type: "text", placeholder: "John" }}
      />
      <br />
      <TextField
        label="Last Name"
        value={values.lastName}
        onChange={(e) => setValues({ ...values, lastName: e.target.value })}
        inputProps={{ type: "text", placeholder: "Doe" }}
      />
      <br />
      <TextField
        label="Mobile No."
        value={values.mobileNo}
        onChange={(e) => setValues({ ...values, mobileNo: e.target.value })}
        inputProps={{ type: "text", placeholder: "0780674459" }}
      />
      <br />
      <TextField
        label="Email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        inputProps={{ type: "email", placeholder: "johndoe@gmail.com" }}
      />
      <br />
      <CheckBox
        label="Confirm"
        checked={values.isConfirmed}
        onChange={handleCheck}
      />
      <br />
      <Button onClick={handleEditUser}>Modify</Button>
    </div>
  );
};

export default EditUser;
