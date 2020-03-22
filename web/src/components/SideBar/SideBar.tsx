import React, { useState, useEffect } from "react";
import TagsInput from "react-tagsinput";
import "./SideBar.css"; // If using WebPack and style-loader.
import { readFromLS, writeIntoLS } from "../../utils/localStorage";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const SideBar = ({ setUpdateStatus }: any) => {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false);
  const [userDetails, setUserDetails] = useState<any>({
    name: null,
    pincode: null,
    contact: null,
    address: null,
    userId: null
  });

  useEffect(() => {
    const userDetailsFromLS = readFromLS();
    if (userDetailsFromLS) {
      const { items, ...others } = userDetailsFromLS;
      if (items) setTags(items);
      setUserDetails(others);
    }
  }, []);

  const handleTags = (selectedTags: any) => {
    setTags(selectedTags);
  };

  const handleChange = (event: any) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleSave = () => {
    const { name, pincode, contact } = userDetails;
    if (!(name && pincode && contact)) {
      setError(true);
      return;
    }
    const updatedDetails = {
      ...userDetails,
      items: tags
    };
    setUpdateStatus(true);
    writeIntoLS(updatedDetails);
  };

  const { name, pincode, contact, address } = userDetails;
  return (
    <div className="py-3 lg:min-h-screen xl:min-h-screen px-5 lg:w-1/3 xl:w-1/3 md:w-full sm:w-full bg-yellow shadow-inner">
      <Title />

      {/* Name  */}
      <div className="mb-5">
        <p className="text-sm mb-2">
          <FormattedMessage id="NAME" defaultMessage="Name" />{" "}
          <span className="text-red-700">*</span>
        </p>
        <input
          className=" border rounded-lg text-sm border-gray-400 p-2 w-full"
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
        />
        {error && !name && (
          <p className="text-sm text-red-600">
            <FormattedMessage id="required" defaultMessage="Required" /> *
          </p>
        )}
      </div>

      {/* Pincode  */}
      <div className="mb-5">
        <p className="text-sm mb-2">
          <FormattedMessage id="ZIP_CODE" defaultMessage="Zip Code" />{" "}
          <span className="text-red-700">*</span>
        </p>
        <input
          className=" border rounded-lg text-sm border-gray-400 p-2 w-full"
          type="number"
          value={pincode}
          name="pincode"
          onChange={handleChange}
        />
        {error && !pincode && (
          <p className="text-sm text-red-600">
            <FormattedMessage id="required" defaultMessage="Required" /> *
          </p>
        )}
      </div>

      {/* Contact details   */}
      <div className="mb-5">
        <p className="text-sm mb-2">
          <FormattedMessage
            id="contact_details"
            defaultMessage="Contact Details"
          />{" "}
          <span className="text-red-700">*</span>
        </p>
        <input
          placeholder="Email / Phone Number"
          className=" border rounded-lg text-sm border-gray-400 p-2 w-full"
          type="text"
          value={contact}
          name="contact"
          onChange={handleChange}
        />
        {error && !contact && (
          <p className="text-sm text-red-600">
            <FormattedMessage id="required" defaultMessage="Required" /> *
          </p>
        )}
      </div>

      {/* Address  */}
      <div>
        <p className="text-sm mb-2">
          <FormattedMessage id="address" defaultMessage="Address" />{" "}
          <FormattedMessage id="OPTIONAL" defaultMessage="Optional" />{" "}
        </p>
        <textarea
          className="border rounded-lg text-sm border-gray-400 p-2 w-full mb-5"
          value={address}
          name="address"
          onChange={handleChange}
        />
      </div>

      {/* Items */}
      <div className="tag-box">
        <p className="text-sm mb-2">Item</p>
        <TagsInput value={tags} onChange={handleTags} />
      </div>

      {/* Save button  */}
      <button
        onClick={handleSave}
        className="active:outline-none focus:outline-none p-2 text-lg font-semibold bg-primary text-white w-full mt-5 rounded-lg"
      >
        <FormattedMessage id="save" defaultMessage="Save" />
      </button>
    </div>
  );
};

export default SideBar;

const Title = () => (
  <div className="my-5">
    <p className="text-lg text-secondary-text font-bold">
      <FormattedMessage id="add_details" defaultMessage="Add your Details" />{" "}
    </p>
  </div>
);
