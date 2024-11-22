/* General Styling */
.navigation-header {
    background-color: black;
    color: white;
    padding: 10px;
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  
  .logo img {
    height: 50px;
  }
  
  .nav-buttons {
    display: flex;
    gap: 10px;
  }
  
  .nav-button {
    padding: 10px 20px;
    background-color: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 25px;
    text-decoration: none;
    text-align: center;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .nav-button:hover {
    background-color: white;
    color: black;
  }
  
  /* Dropdown Menu */
  .dropdown {
    position: relative;
  }
  
  .dropdown-toggle {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 24px;
  }
  
  .menu-dropdown {
    position: absolute;
    right: 0;
    top: 40px;
    background-color: white;
    border: 1px solid #ddd;
    list-style: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .menu-dropdown button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
  }
  
  .menu-dropdown button:hover {
    background-color: #0056b3;
  }