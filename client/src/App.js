import React, { useState, useEffect } from 'react';
import { isEmpty } from './utils';
import Root from './routes';

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a scoped async function in the hook
    async function runAsync() {
      try {
        const response = await fetch('/user');
        const userResponse = await response.text();

        if (userResponse === '' || isEmpty(userResponse)) {
          window.location.replace('/login');
        } else {
          setUser(JSON.parse(userResponse));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error', error);
      }
    }

    runAsync();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return <Root />;
}

export default App;
