import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Device from './Device';
import reportWebVitals from './reportWebVitals';

const allGreetings = [
  {id: "a", value: "Hello"},
  {id: "b", value: "Howdy"},
  {id: "c", value: "What's up"},
]

function App () {
  const [greetings, setGreetings] = React.useState(allGreetings);

  fetch("https://www.ifixit.com/api/2.0/wikis/CATEGORY?offset=0&limit=10")
    .then(response => response.json(0))
    .then(data => console.log(data) /*here is where we can manipulate the returned data*/);

  return (
    <div>
      <ul>
        {greetings.map(curGreeting => (
          <Device key = {curGreeting.id} greeting = {curGreeting.value}>
          </Device>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
