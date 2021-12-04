import React, { useEffect, useState, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import { APIError } from "../../data/apiUtils";
import { confirmEmailApi } from "../../data/userApi";
import LoginPagesWrapper from "../../misc/loginPagesWrapper";

const PageConfirmEmail: React.FunctionComponent = () => {
  const history = useHistory();

  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const [error, setError] = useState<{
    message: string;
    showRetry: boolean;
  } | null>(null);

  const confirmEmailCallback = () => {
    const token = query.get("token");
    if (!token) {
      setError({
        message:
          "We don't have all the necessary information to confirm your email, make sure you opened this page from your email.",
        showRetry: true,
      });
      return;
    }

    setError(null);
    (async () => {
      try {
        await confirmEmailApi(token);
        history.push("/login");
        toast.success("Email successfully confirmed. Please login.");
      } catch (err) {
        if (err instanceof APIError) {
          setError({ message: err.message, showRetry: false });
        } else {
          setError({
            message:
              "There was an unexpected error, check your internet and try again.",
            showRetry: true,
          });
        }
      }
    })();
  };

  useEffect(confirmEmailCallback, []);

  if (error)
    return (
      <LoginPagesWrapper pageName="Confirm Email">
        <div className="text-center text-danger mb-2">
          <i className="fas fa-exclamation-triangle mr-1" /> {error.message}
        </div>
        {error.showRetry && (
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={confirmEmailCallback}
          >
            Retry?
          </button>
        )}
      </LoginPagesWrapper>
    );

  return (
    <LoginPagesWrapper pageName="Confirm Email">
      <div className="d-flex justify-content-center my-4">
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </LoginPagesWrapper>
  );
};

export default PageConfirmEmail;
