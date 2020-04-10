import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";

export default function ResetPassword() {
  let { token } = useParams();

  const [payload, setPayload] = useState({});
  const [isValid, setIsValid] = useState(true);

  async function checkToken() {
    await axios.get(`/api/auth/reset/${token}`);
  }

  useEffect(() => {
    checkToken();
  }, []);

  function handleInputChange({ target }) {
    setPayload({
      ...payload,
      [target.name]: target.value,
    });
  }

  async function reset() {
    if (!isValid) alert("token not valid");
    await axios.put(`/api/auth/reset/${token}`, payload);
  }

  return (
    <div className="auth-children">
      <div className="auth-children-wrapper">
        <div className="input-container">
          <CustomInput
            labelId="password"
            name="password"
            modifier="primary"
            type="password"
            onChange={handleInputChange}
          />
        </div>

        <div className="action-wrapper">
          <CustomButton
            titleId="sendPasswordToEmail"
            modifier="primary"
            onClick={reset}
          />
        </div>
      </div>
    </div>
  );
}
