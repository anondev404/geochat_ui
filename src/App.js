import { useEffect } from 'react';

import axios from 'axios';

function App() {
  useEffect(() => {
    const reqBody = {
      "username": "abc",
      "password": "123",
      "location": {
        "coordinate": {
          "lat": 22.3700471614417,
          "lon": 87.31945294244507
        }
      }
    };

    axios.post('/signIn', reqBody, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((res) => {
      console.log(res);

      axios.get('fetch/topic').then(res => {
        console.log(res.data);
      })
    }).catch((err) => {
      console.log(err);
    });

  })
  return (
    <div className="App">
      SIGNING IN...
    </div>
  );
}

export default App;
