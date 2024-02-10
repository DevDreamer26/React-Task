import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('https://randomuser.me/api/?page=5&results=1&seed=abc')
      .then(response => {
        const user = response.data.results[0];
        const { first, last } = user.name;
        const { gender } = user;
        const { phone } = user;
        const picture = user.picture;

        setUserData({ first, last, gender, phone, picture });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-12 rounded-lg shadow-md flex">
        {userData && (
          <>
            <div className="flex-shrink-0 mr-12">
              {userData.picture && userData.picture.large && (
                <img src={userData.picture.large} alt="Profile" className="w-48 h-48 rounded-full" />
              )}
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">{`${userData.first} ${userData.last}`}</h1>
              </div>
              <div className="mt-auto font-bold">
                <h1 className="text-white">{`Gender: ${userData.gender}`}</h1>
                <h1 className="text-white">{`Phone no.: ${userData.phone}`}</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
