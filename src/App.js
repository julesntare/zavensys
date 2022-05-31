import { Route, Routes } from "react-router-dom";
import "./App.css";
import Contact from "./components/Contact";
import Header from "./components/Header";
import AddUser from "./features/users/AddUser";
import EditUser from "./features/users/EditUser";
import FilteredAttendees from "./features/users/FilteredAttendees";
import UserDetailed from "./features/users/UserDetailed";
import UserList from "./features/users/UserList";

function App() {
  return (
    <div className="container mx-auto px-2 max-w-5xl pt-2 md:pt-1">
      <h1 className="text-center font-bold pb-2 text-2xl text-gray-700">
        <Header />
      </h1>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/get-user/:id" element={<UserDetailed />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route
          path="/users/confirmed/:isConfirmed"
          element={<FilteredAttendees />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
