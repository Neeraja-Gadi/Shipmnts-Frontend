import React ,{useEffect}from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

const NavBar = () => {
  const [user, setUser] = React.useState("");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))

}, [])
  function logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
}
  return (
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img
            src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png"
            alt="Stack Overflow Logo"
            width="auto"
            height="32"
          />
        </IconButton>
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px', position: 'relative' }}>
            <SearchIcon style={{ marginRight: '10px', fontSize: "22px" , color: "#FFA500" }} />
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              style={{fontSize: "22px" , color: 'black' }}
            />
          </div>

          {/* <IconButton edge="end" color="inherit" aria-label="account">
            <AccountCircleIcon style={{ color: 'black' }} />
          </IconButton> */}
          {user ? (
              <button
                style={{ fontSize:"20px", background: "#FFA500", cursor: "pointer" }}
                onClick={logOut}
              >
                Log Out
              </button>
            ) : (
              <button>
                <a href="/login" >Login</a>
              </button>
            )} 
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
