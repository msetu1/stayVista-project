import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";

const HostMenu = () => {
  return (
    <>
      {/* add room  */}
      <MenuItem icon={BsFillHouseAddFill} label="Add Room" address="add-room" />

      {/* my listings  */}
      <MenuItem icon={MdHomeWork} label="My Listings" address="my-listings" />

      {/* manage booking  */}
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Bookings"
        address="manage-bookings"
      />
    </>
  );
};

export default HostMenu;
