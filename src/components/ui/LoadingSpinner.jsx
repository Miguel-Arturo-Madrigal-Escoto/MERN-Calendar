
import React from 'react';
import { MutatingDots as Icon } from  'react-loader-spinner';
import '../../css/loading.css';

export const LoadingSpinner = () => {
  return (
    <div className="loading_icon">
        <Icon
            height="100"
            width="100"
            color='grey'
            ariaLabel='loading'
        />
    </div>
  )
}
