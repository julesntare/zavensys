import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { addUser } from "./UserSlice";
import { v4 as uuidv4 } from "uuid";
import CheckBox from "../../components/CheckBox";

const AddUser = () => {
  const users = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    isConfirmed: false,
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleCheck = (e) => {
    setValues({ ...values, isConfirmed: !values.isConfirmed });
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (
      values.firstName.trim() === "" ||
      values.lastName.trim() === "" ||
      values.mobileNo.trim() === "" ||
      values.email.trim() === ""
    ) {
      setIsValid(false);
      return;
    }

    const emailFound = users.findIndex(
      (attendee) => attendee.email === values.email
    );

    const mobileFound = users.findIndex(
      (attendee) => attendee.mobileNo === values.mobileNo
    );

    if (emailFound !== -1 || mobileFound !== -1) {
      setIsRegistered(true);
      return;
    }

    setValues({
      firstName: "",
      lastName: "",
      mobileNo: "",
      email: "",
      isConfirmed: false,
    });

    dispatch(
      addUser({
        id: uuidv4(),
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
      {isRegistered && (
        <div
          className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
          role="alert"
        >
          Whoops - This Attendee already registered!
        </div>
      )}
      {!isValid && (
        <div
          className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
          role="alert"
        >
          Whoops - There are some empty fields!
        </div>
      )}
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
        inputProps={{ type: "number", placeholder: "0780674459" }}
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
      <Button onClick={handleAddUser}>Save</Button>
    </div>
  );
};

export default AddUser;