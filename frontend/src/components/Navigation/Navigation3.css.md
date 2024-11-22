/* General Styling */
.navigation-header {
    background-color: rgb(87, 67, 67);
    color: white;
    padding: 10px;
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  
  .logo {
    width: 10%; /* Makes the logo 10% of its original size */
    height: auto; /* Maintains aspect ratio */
    max-width: 100px; /* Optional: Limit the maximum size */
  }

  .site-name {
    font-family: 'Roboto', sans-serif; /* Use a clean and modern font */
    font-size: 24px; /* Adjust size for emphasis */
    font-weight: bold; /* Make the text bold */
    color: #1e90ff; /* A nice blue color, adjust as needed */
    margin-left: 10px; /* Spacing between the logo and site name */   
    letter-spacing: 2px; /* Add spacing between letters */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
    transition: color 0.3s ease; /* Smooth color change on hover */
  }
  
  .site-name:hover {
    color: #104e8b; /* Darker blue on hover */
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    text-decoration: none;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 50%;
    padding: 10px;
    width: 40px;
    height: 40px;
    transition: background-color 0.3s;
  }
  
  .nav-icon:hover {
    background-color: white;
    color: black;
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