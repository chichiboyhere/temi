import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { useUpdateProfileMutation } from "../hooks/userHooks";
import { useGetOrderSummaryQuery } from "../hooks/orderHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

export default function ProductUploadPage() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo!.name);
  const [email, setEmail] = useState(userInfo!.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const data = await updateProfile({
        name,
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <div className="container small-container">
      <Helmet>
        <title>Product Upload Page</title>
      </Helmet>
      <h1 className="my-3">Product Upload Page</h1>
    </div>
  );
}
