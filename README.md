# PRACTICE: REACT WHIT TYPESCRIPT FETCH API 02 (Promise with Async/Await and Try/Catch)

Practice react with typescript using basic fetch api for requests to the JSON Server.

## HTTP request methods

- Get
- Post
- Put
- Patch
- Delete

## Resources used

JSON Server: https://github.com/typicode/json-server

## Important Notes

1. Then handle responses from the server. These anwers can be positive or negative, that is, we can obtain the requested data or also some reason why the data could not delivered. An example of this is when the patch to the server is fine but the endpoint name is wrong. ( OK -> http://localhost:5000/users / Wrong -> http://localhost:5000/user), users and user. Request Ok -> response.ok === true or response.status === 200. Reason -> response.ok === false or response.status === 404.
2. Catch will handle errors that might occur when making request to the server, such as rejected build requests or server path errors. (OK -> http://localhost:5000 / Wrong -> http://localhost:500), 5000 and 500. Example: GET http://localhost:500/users net::ERR_CONNECTION_REFUSED
3. We can throw errors in the Then so that they are recived in the Catch using for example a throw new Error('string message'). Example: if(!response.ok) throw new Error(\`Error status: \${response.status} statusText: ${response.statusText}`).

## Examples

### Fetch Api whit promise

#### In Services

```js
const getAllUsers = () => {
  const res = { errorMessage: '', data: null };

  return fetch('http://localhost:5000/users').then(response => {
    if (!response.ok) {
      const { status, statusText, url } = response;
      res.errorMessage = `Code: ${status} - ${statusText || 'Not Found'} Url: ${url}`;
    } else {
      res.data = response;
    }
    return res;
  });
};
```

#### In App

```js
useEffect(() => {
  setError(null);

  getAllUsers()
    .then(response => {
      const { data, errorMessage } = response;
      if (errorMessage) throw new Error(errorMessage);
      else return data;
    })
    .then(data => data.json())
    .then(dataJson => setUsers(dataJson))
    .catch(error => {
      setError(error.message);
    });
});
```

### Fetch Api whit Async/Await

#### In Services

```js
const getAllUsers = async (): Promise<{ data: data, reason: reason }> => {
  let data: data = null;
  const reason: reason = { message: '' };

  const response: Response = await fetch('http://localhost:5000/users');
  if (!response.ok) {
    const { status, statusText, url } = response;
    reason.message = `Code: ${status || '00'} - ${statusText || 'Not Found'} Url: ${url}`;
  } else {
    data = await response.json();
  }
  return { data, reason };
};
```

#### In App

```js
useEffect(() => {
  setError(null);
  setIsLoading(true);

  getAllUsers()
    .then(response => {
      const { data, reason } = response;
      if (reson.message) throw new Error(reason.message);
      else setUsers(data!);
    })
    .catch(error => {
      if (error.message === 'Failed to fetch') error.message = 'ERROR: Server Connection Refuse, try again later';
      setError(error.message)
    })
    .finally(() => setIsLoading(false));
}, []);
```

---

## Author: Newman Ferrer

newmanferrer@gmail.com

Maracaibo - Venezuela

Practice date: 19/04/2022
