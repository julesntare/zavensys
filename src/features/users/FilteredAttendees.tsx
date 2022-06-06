import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IUsers } from "../../InterfaceUserTypes";
import { RootState } from "../../store";

const FilteredAttendees = () => {
  const users = useSelector<RootState, IUsers[]>((store) => store.users);
  let { isConfirmed } = useParams<{
    isConfirmed: string;
  }>();
  let didConfirm: boolean = isConfirmed === "true";
  const renderCard = () => {
    const fetchedUsers = users.filter(
      (user) => user.isConfirmed === didConfirm
    );
    return fetchedUsers.length > 0 ? (
      fetchedUsers.map((user) => (
        <div
          className={`${
            user.isConfirmed ? "bg-green-300" : "bg-gray-300"
          } p-5 flex items-center justify-between`}
          key={user.id}
        >
          <div>
            <h3 className="font-bold text-lg text-gray-700">
              {user.firstName}
            </h3>
            <span className="font-normal text-gray-600">{user.email}</span>
          </div>
          <div className="flex gap-4">
            <Link to={`/get-user/${user.id}`}>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center col-span-2 text-gray-700 font-semibold">
        No Attendee Yet
      </p>
    );
  };

  return (
    <>
      <h4
        className="
                  text-dark
                  mb-6
                  uppercase
                  font-bold
                  text-center
                  text-[32px]
                  sm:text-[40px]
                  lg:text-[36px]
                  xl:text-[40px]
                  "
      >
        List of {didConfirm ? "Confirmed" : "Non Confirmed"} Attendees
      </h4>
      <div className="grid gap-5 md:grid-cols-2">{renderCard()}</div>
    </>
  );
};

export default FilteredAttendees;
