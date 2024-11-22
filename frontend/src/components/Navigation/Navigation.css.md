* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid lightgrey;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 100px;
  margin-right: 10px;
}

.logo-name {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.navigation ul {
  display: flex;
  list-style-type: none;
}

.navigation li {
  font-size: 19px;
}

.navigation a {
  color: white;
  text-decoration: none;
  font-size: 19px;
}

.navigation a.create-post-link {
  color: blue;
}


.navigation a:hover {
  text-decoration: underline;
}


.profile-dropdown {
  display: flex; 
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.profile-dropdown li {
  margin-bottom: 5px;
  list-style: none;
}

.profile-dropdown.hidden {
  display: none;
}

.profile-dropdown li:last-child {
  border-bottom: none;
}

.profile-dropdown .user-info {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
}

.profile-dropdown .user-email {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

/* Logout Button with rounded corners */
.profile-dropdown button {
  width: 100%;
  background-color: grey;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 25px;
  font-size: 18px;
}

.profile-dropdown button:hover {
  background-color: #d32f2f;
}

/* Profile Button */
button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}


.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.ham-button, .profile-icon {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 5px;
  border: 1px solid #000;
  border-radius: 25px;
  padding: 6px 8px;
}

.menu-dropdown, .profile-dropdown {
  position: absolute;
  right: 20px;
  top: 83px;
  list-style: none;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  min-width: 140px;
}

.profile-dropdown.hidden {
  display: none;
}

.menu-dropdown li {
  padding: 5px;
  cursor: pointer;
}

.menu-dropdown button {
  font-size: 20px;
}

.menu-dropdown li:hover {
  background-color: #f0f0f0;
}


.menu-dropdown a, .profile-dropdown a {
  color: #000;
}