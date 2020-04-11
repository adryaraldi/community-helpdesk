import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormikContext } from "formik";
import { Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";

function Confirmed() {
  const { isValid } = useFormikContext();

  useEffect(() => {
    if (!isValid) {
      history.replace("/request/details");
    }
  }, []);

  return (
    <div className="request-children confirmed">
      <div className="request-children-wrapper">
        <div className="text-wrapper">
          <h1 className="text-alpha">
            <FormattedMessage id="confirmedHead" />
          </h1>
          <h3 className="text-alpha">
            <FormattedMessage id="confirmedBody" />
          </h3>
          <Link to="/">
            <Button color="primary" variant="contained">
              <FormattedMessage id="back" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Confirmed;
