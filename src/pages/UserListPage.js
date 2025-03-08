import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { getError } from "../utils";
export default function UserListPage() {
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation();
    const submitHandler = async (e) => {
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
        }
        catch (err) {
            toast.error(getError(err));
        }
    };
    return (_jsxs("div", { className: "container small-container", children: [_jsx(Helmet, { children: _jsx("title", { children: "User List Page" }) }), _jsx("h1", { className: "my-3", children: "User List Page" })] }));
}
