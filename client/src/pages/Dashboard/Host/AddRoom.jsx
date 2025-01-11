import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
    const navigate=useNavigate()
  const axiosSecure = useAxiosSecure();
  const { user,loading,setLoading } = useAuth();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // date range handler
  const handleDates = (item) => {
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post(`/room`, roomData);
      return data;
    },
    onSuccess:()=>{
        toast.success('Room Added successfully !')
        navigate('/dashboard/my-listings')
        setLoading(false)
    }
  });

  // Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    };

    try {
      const image_url = await imageUpload(image);
      const roomData = {
        location,
        category,
        title,
        to,
        from,
        price,
        guests,
        bedrooms,
        bathrooms,
        description,
        image: image_url,
        host,
      };
      console.table(roomData);

      // post request to server
      await mutateAsync(roomData)
    } catch (err) {
      toast.error(err.message);
      setLoading(false)
    }
  };

  // handle image changes
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };
  return (
    <>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      {/* Form  */}
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      />
    </>
  );
};

export default AddRoom;
