import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';


const Navbar = styled.nav`
  background: ${(props) => props.theme.navbarBackground};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
`;

const NavLink = styled.li`
  margin-right: 1rem;
`;

const PageContainer = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.pageBackground};
`;

const darkTheme = {
  navbarBackground: '#333',
  pageBackground: '#222',
  textColor: '#fff',
};

const lightTheme = {
  navbarBackground: '#eee',
  pageBackground: '#fff',
  textColor: '#333',
};

const ThemeToggle = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  background: ${(props) => props.theme.navbarBackground};
  color: ${(props) => props.theme.textColor};
`;

function App() {
const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar>
          <NavLinks>
            <NavLink>
              <Link to="/">Home</Link>
            </NavLink>
            <NavLink>
              <Link to="/about">About</Link>
            </NavLink>
            <NavLink>
              <Link to="/users">Users</Link>
            </NavLink>
          </NavLinks>
          <ThemeToggle onClick={toggleTheme}>
            {theme === lightTheme ? 'Dark Mode' : 'Light Mode'}
          </ThemeToggle>
        </Navbar>

        <Routes>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/users" element={<Users/>}/>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
    </Router>
    </ThemeProvider>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to my app!</h1>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About us</h2>
    </div>
  )
}

const useApiData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: users, loading, error } = useApiData('https://jsonplaceholder.typicode.com/users');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <PageContainer>Loading users...</PageContainer>;
  }

  if (error) {
    return <PageContainer>Error: {error.message}</PageContainer>;
  }

  return (
    <PageContainer>
      <input type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearch} />
      {filteredUsers.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </PageContainer>
  );
};

export default App;