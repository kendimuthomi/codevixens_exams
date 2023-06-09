import React, { useState } from 'react';
import styled from 'styled-components';
import useApi from './UseApi';

const SearchInput = styled.input`
  margin-bottom: 16px;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
  margin-bottom: 8px;
`;

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users, error, loading } = useApi(
    'https://jsonplaceholder.typicode.com/users'
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <h2>Users</h2>
      {error && <p>Error: {error.message}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SearchInput
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <UserList>
            {filteredUsers.map((user) => (
              <UserItem key={user.id}>{user.name}</UserItem>
            ))}
          </UserList>
        </>
      )}
    </>
  );
};

export default Users;
