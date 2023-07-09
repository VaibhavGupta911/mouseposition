import './App.css';
import { useState, useEffect } from 'react';


//this is enhancer
const withMousePosition = (WrappedComponent) => {
  return (props) => {
    const [mousePosition, setMousePosition] = useState(
      {
        x: 0,
        y: 0,
      }
    )
    useEffect(
      () => {
        const handleMousePosition = (e) => {
          setMousePosition(
            {
              x: e.clientX,
              y: e.clientY,
            }
          );
        }

        window.addEventListener("mousemove", handleMousePosition);
        //we have to closed event also
        return () => {
          window.removeEventListener("mousemove", handleMousePosition);
        }
      }, []
    );
    return (<WrappedComponent {...props} mousePosition={mousePosition} />)
    //we are retuning WrappedCom as enhenced whivh will be assifgned to another com
  };
}


//this com will be enhanced
const positionMouseLogger = ({ mousePosition }) => {
  if (!mousePosition) {
    return null;
  }
  return (
    <>
      {mousePosition.x},{mousePosition.y}
    </>
  )
};

//this is higher order component with mouse pointer
const EnhencedPointer=withMousePosition(positionMouseLogger);


function App() {
  return (
    <div className="App">
      <h1>Mouse Pointer Position</h1>
      <h3 >(<EnhencedPointer/>)</h3>
    </div>
  );
}

export default App;
