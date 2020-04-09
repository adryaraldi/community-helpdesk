import React from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import {FormattedMessage} from 'react-intl'
import {Link} from "react-router-dom"

function Intro () {

  return (
    <div className="request">
      <div className="request-wrapper">
        <div className="request-children intro">
          <div className="request-children-wrapper">
            <div className="text-wrapper">
              <h1 className="text-alpha">
                <FormattedMessage id="introHead"/>
              </h1>
              <h3 className="text-alpha">
                <FormattedMessage id="introBody"/>
              </h3>
            </div>
            <div className="action-wrapper">
              <Link to="/request">
                <CustomButton
                  titleId="iNeedHelp"
                  modifier="primary"/>
              </Link>
              <CustomButton
                titleId="iWantToHelp"
                modifier="secondary"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro