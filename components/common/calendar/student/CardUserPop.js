import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { getLinkById } from "@/lib/exportablefunctions";

const CardUserPop = ({ hidefun, popupValue, id }) => {
  const [link, setLink] = useState("");
  console.log("link", link);
  const handleJoinClick = () => {
    // Redirect to the link when the "Join" button is clicked
    // window.location.href = link;
    window.open(link, "_blank");
  };

  const hideschedule = (e) => {
    e.preventDefault();
    hidefun();
  };
  useEffect(() => {
    const fetchLinkFromDb = async () => {
      const val = await getLinkById(id);
      setLink(val);
    };
    fetchLinkFromDb();
  }, [id]);

  return (
    <div className="w-screen h-screen top-0 left-0 absolute">
      <div className="w-full h-full flex justify-center">
        <div className="text-white text-3xl my-auto z-10">
          <div
            className="border-l-8 flex p-6 relative"
            style={{ background: "rgba(161, 69, 205, 0.75)" }}
          >
            <button
              className="absolute right-3 top-2 text-xl"
              onClick={hideschedule}
            >
              <RxCross2 />
            </button>
            <div className="rounded-lg">
              <div className="w-fit px-6 py-3">
                <p>
                  {popupValue?.addTitle}({popupValue?.addBatch})
                </p>
                <p>
                  {popupValue?.startTime}-{popupValue?.endTime}
                </p>
              </div>
              <div>
                <div className="text-lg">
                  <p>Meeting Link</p>
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="meet"
                    className="bg-transparent border border-gray-300 text-slate-200 pr-16 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="join meet..."
                    required
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    readOnly
                  />
                  <button
                    // className="flex absolute inset-y-0 right-1 text-lg items-center rounded px-3 py-1 m-1 pointer-events-none"
                    className="flex absolute inset-y-0 right-1 text-lg items-center rounded px-3 py-1 m-1 "
                    style={{ background: "#E1348B" }}
                    onClick={handleJoinClick}
                  >
                    join
                  </button>
                </div>
                <p className="text-sm text-slate-400">
                  Join 5 minutes prior to the meeting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserPop;
