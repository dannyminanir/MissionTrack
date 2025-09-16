import { SiTicktick } from "react-icons/si";
import Header from "./HeaderDash";
import Sidebar from "./Sidebar";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";

const NotificationPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row mt-20 min-h-screen bg-primaryColor-10 gap-6">
        <Sidebar />
        <div className="flex flex-col flex-1 px-4 md:px-8">
          <div className="w-full max-w-4xl py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50 mx-auto">
            <h1 className="font-bold text-2xl text-center">Notifications</h1>
          </div>

          <ul className="flex flex-col gap-4 mt-10 w-full max-w-4xl mx-auto">
            <li className="rounded-lg border-l-4 border-green-500 bg-white shadow-sm flex gap-4 p-4 items-start w-full">
              <div className="bg-gray-100 p-2 rounded flex-shrink-0">
                <SiTicktick size={26} className="text-green-500" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold">
                  Imena Growth Initiative
                </h1>
                <p className="text-sm text-gray-800">
                  Your Mission to London was approved. Congratulations
                </p>
                <p className="text-xs text-gray-500">Completed 2 months ago</p>
              </div>
            </li>

            <li className="rounded-lg border-l-4 border-green-500 bg-white shadow-sm flex gap-4 p-4 items-start w-full">
              <div className="bg-gray-100 p-2 rounded flex-shrink-0">
                <FaCheck size={26} className="text-green-500" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold">
                  Agaciro Business Drive
                </h1>
                <p className="text-sm text-gray-800">
                  Mission to Saturn is waiting for your approval. Please review
                  the details.
                </p>
                <p className="text-xs text-gray-500">Approved 2 days ago</p>
              </div>
            </li>

            <li className="rounded-lg border-l-4 border-[#FFB361] bg-white shadow-sm flex gap-4 p-4 items-start w-full">
              <div className="bg-gray-100 p-2 rounded flex-shrink-0">
                <MdOutlinePendingActions size={26} className="text-[#FFB361]" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold">
                  Umurava Leadership Summit
                </h1>
                <p className="text-sm text-gray-800">
                  Mission to Saturn is waiting for your approval. Please review
                  the details.
                </p>
                <p className="text-xs text-gray-500">Pending since 3 days ago</p>
              </div>
            </li>

            <li className="rounded-lg border-l-4 border-red-400 bg-white shadow-sm flex gap-4 p-4 items-start w-full">
              <div className="bg-gray-100 p-2 rounded flex-shrink-0">
                <RiFileCloseLine size={26} className="text-[#FA7878]" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold">
                  Gukunda Igihugu Corporate Pathway
                </h1>
                <p className="text-sm text-gray-800">
                  Mission to Venus has been successfully completed. Well done
                  team!
                </p>
                <p className="text-xs text-gray-500">
                  Mission rejected 1 month ago
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
