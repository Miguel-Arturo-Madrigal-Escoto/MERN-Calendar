import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


export const FeedbackForm = ({ positive, negative }) => {
    return (
      <Fragment>
        
        {
            positive && 
            (
              <div className="valid-feedback">
                { positive }
              </div>
            )
            
        }

        {
            negative && 
            (
              <div className="invalid-feedback">
                { negative }
              </div>
            )
            
        }

      </Fragment>
  )
}


FeedbackForm.propTypes = {
    positive: PropTypes.string,
    negative: PropTypes.string
}

/* FeedbackForm.defaultProps = {
  positive: 'A positive feedback',
  negative: 'A negative feedback'
} */


