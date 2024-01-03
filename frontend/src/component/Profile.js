import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

function Profile({setprofile,profile}) {
    return (
        <div class={`w-60 z-50 ${profile ? "hidden" : "block"} bg-white border border-gray-200 rounded-lg shadow absolute top-16 right-10 z-10`}>
            <div class="flex justify-end px-4 pt-1">
                <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button" onClick={() => setprofile(true)}>
                    <FontAwesomeIcon icon={faCircleXmark} className="text-2xl" />
                </button>


            </div>
            <div class="flex flex-col items-center pb-10">
                <img src="https://randomuser.me/api/portraits/men/20.jpg" alt="" class="rounded-full w-16 h-16 object-cover" />
                <h5 class="mb-1 text-xl font-medium text-gray-900">email</h5>
                <span class="text-sm text-gray-500 dark:text-gray-400">user name</span>

            </div>
        </div>
    )
}

export default Profile;