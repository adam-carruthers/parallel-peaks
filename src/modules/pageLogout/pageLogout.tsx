import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../data/hooks";
import { logout } from "../../data/userSlice";

const PageLogout = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(logout());
        history.push("/");
    },[])
    

    return <div>Logout</div>;
}

export default PageLogout;