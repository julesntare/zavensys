import React, { ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import CheckBox from "../../components/CheckBox";
import TextField from "../../components/TextField";
import { IUsers } from "../../InterfaceUserTypes";
import { RootState } from "../../store";
import { editUser } from "./UserSlice";

const EditUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{
    id: string;
  }>();
  let paramId = id;
  const users: IUsers[] = useSelector<RootState, IUsers[]>(
    (store) => store.users
  );
  const navigate = useNavigate();
  const existingUser: IUsers[] = users.filter(
    (user: { id: number | undefined }) => user.id === paramId
  );
  const { firstName, lastName, mobileNo, email, isConfirmed } = existingUser[0];
  const [values, setValues] = useState({
    firstName,
    lastName,
    mobileNo,
    email,
    isConfirmed,
  });

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, isConfirmed: !values.isConfirmed });
  };

  const [isValid, setIsValid] = useState<boolean>(true);

  const handleEditUser = (e: ChangeEvent<HTMLInputElement>) => {
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

    setValues({
      firstName: "",
      lastName: "",
      mobileNo: "",
      email: "",
      isConfirmed: false,
    });
    dispatch(
      editUser({
        id: Number(paramId),
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, firstName: e.target.value })
        }
        inputProps={{ type: "text", placeholder: "John" }}
      />
      <br />
      <TextField
        label="Last Name"
        value={values.lastName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, lastName: e.target.value })
        }
        inputProps={{ type: "text", placeholder: "Doe" }}
      />
      <br />
      <TextField
        label="Mobile No."
        value={values.mobileNo}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, mobileNo: e.target.value })
        }
        inputProps={{ type: "text", placeholder: "0780674459" }}
      />
      <br />
      <TextField
        label="Email"
        value={values.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValues({ ...values, email: e.target.value })
        }
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
