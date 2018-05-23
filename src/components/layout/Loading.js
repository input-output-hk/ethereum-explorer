import React from 'react';
import FullScreen from 'react-fullscreen';
import ReactLoading from 'react-loading';

const containerStyle = {
  width:"10%",
  height: "70vh", 
  margin:"0 auto"
}

const Loading = () => {
  return (
    <FullScreen>
      <div style={containerStyle}>
        <ReactLoading height='100' width='10' color="#832dc4" type="cylon"/>
      </div>
    </FullScreen>
  )
}

export default Loading;