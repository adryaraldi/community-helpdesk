import React from "react";
import mobileApplication from "../../assets/mobileApplication.png";
import { ReactComponent as AppStore } from "../../assets/appStore.svg";
import { ReactComponent as PlayStore } from "../../assets/playStore.svg";
import { FormattedMessage } from "react-intl";

function AppLanding() {
  return (
    <div className="app-landing absolute-center">
      <div className="app-landing__text">
        <h1 className="text-alpha">
          <FormattedMessage id="appLanding.content.header" />
        </h1>
        <h3 className="text-alpha">
          <FormattedMessage id="appLanding.content.body" />
        </h3>
        <div className="app-landing__links">
          <a
            href="https://apps.apple.com/us/app/zelos-team-management/id1441089536"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppStore className="app-landing__link" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.zelos.client&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayStore className="app-landing__link" />
          </a>
        </div>
      </div>
      <img
        className="app-landing__img"
        src={mobileApplication}
        alt="mobileApplication"
      />
    </div>
  );
}

export default AppLanding;
