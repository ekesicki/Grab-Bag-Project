import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Device from './Device';
import reportWebVitals from './reportWebVitals';

const allGreetings = [
  {value: "Hello"},
  {value: "Howdy"},
  {value: "Salutations"},
  {value: "What's up"},
  {value: "Howie Doin"},
  {value: "Hey hey hey"}
]

function App() {
  const [greetings, setGreetings] = React.useState(allGreetings);

  return (
    <div>
      <ul>
        {greetings.map(greeting => (
          <li>
            {greeting.value}, I'm in a list tag! 
          </li>
        ))}
      </ul>
    </div>
  );

}
  
ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);

/*const mainElement = (
    <div className="container">
      <Device greeting = "Hello"></Device>
      <Device greeting = "Howdy"></Device>
      <Device greeting = "What's up"></Device>
    </div>
  )*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
