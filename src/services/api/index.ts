import { user, userPartial, usersArray } from '../../models';
import { generateId } from '../../utilities';

type reason = { message: string };
type data = usersArray | null;

const BASE_URL = 'http://localhost:5000';
const ALL_USERS = 'users';
const ONE_USER = 'users?id=';

const getAllUsers = async (): Promise<{ data: data; reason: reason }> => {
  let data: data = null;
  const reason: reason = { message: '' };

  const response: Response = await fetch(`${BASE_URL}/${ALL_USERS}`);
  if (!response.ok) {
    const { status, statusText, url } = response;
    reason.message = `Error Code: ${status || '00'} - ${statusText || 'Not Found'} Url: ${url}`;
  } else {
    data = await response.json();
  }

  return { data, reason };
};

const getOneUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${ONE_USER}${id}`);
  const userJson: user = await response.json();
  return userJson;
};

const createUser = async ({ name, username, email }: user) => {
  const response = await fetch(`${BASE_URL}/${ALL_USERS}`, {
    method: 'POST',
    body: JSON.stringify({
      id: generateId(),
      name,
      username,
      email
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  const user: user = await response.json();
  return user;
};

const updateUserPut = async ({ id, name, username, email }: user) => {
  const response = await fetch(`${BASE_URL}/${ALL_USERS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      name,
      username,
      email
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  const dataJson: user = await response.json();
  return dataJson;
};

const updateUserPatch = async ({ id, ...rest }: userPartial) => {
  const response = await fetch(`${BASE_URL}/${ALL_USERS}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      id,
      name: rest.name && rest.name,
      username: rest.username && rest.username,
      email: rest.email && rest.email
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  const dataJson: user = await response.json();
  return dataJson;
};

const deleteUser = async (id: string) => {
  return await fetch(`${BASE_URL}/${ALL_USERS}/${id}`, {
    method: 'DELETE'
  });
};

export const ApiEndPoints = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUserPut,
  updateUserPatch,
  deleteUser
};
