       This project is a fully responsive Admin Panel built using React, TypeScript, Material-UI, and Vite. It demonstrates the basic CRUD functionality and data 
       visualization for managing user data.

       Project Structure: The project is organized into the following components and pages:


       Components:

       •Guard: Protects specific pages by checking if the user is authenticated. If not, the user is redirected to the login page.
       •Header: Used on the UserPage to display navigation and user information. It includes a logout button to redirect the user to the login page.
       •UserTable: Displays a sorted table of user data fetched from the database. It includes:
                   	Pagination for the user list.
                   	Functionality to edit and delete user entries.
                   	Add new user functionality.

        Pages:
     
            •	LoginPage: The login page contains email and password input fields for the admin to log in.
                   Admin credentials:
                        Email: admin@gmail.com
                        Password: admin123
                   On successful authentication, the admin is redirected to the UserPage.

            •	UserPage: This page displays a list of users with details such as name, email, age, and status. It includes:

            
                   o	User data fetched from the dummy data API: https://dummyjson.com/users
                   o Functionalities to:
                      	Add a new user.
                      	Edit user details.
                      	Delete user entries.
                   o	User data can be sorted and there is pagination for navigating through large user lists.
           
           
           Features:
         Material-UI Integration:
            •	The project uses Material-UI for a modern and visually appealing user interface. The Material-UI components (buttons, inputs) are styled and used throughout the application for a responsive experience.
            •	Custom styling is added to each component and page using CSS files for additional flexibility.
            
         CRUD Operations:
           	Add a User: A form or modal allows the admin to add a new user to the list.
           	Edit a User: Admin can edit user details, such as name, email, age, and status
           	Delete a User: Admin can delete a user entry from the list through the user table.

         Pagination and Sorting:
           •	Pagination is implemented in the UserTable to handle a large number of users.
           •	Sorting functionality is available for the user list, making it easier for the admin to view and manage user data.

         Search Functionality
           •	What: Add a search bar that filters user data based on user attributes (name, email).
           •	Where:
                       o	In the UserPage component, place the search bar above the UserTable component.
                       o	Inside UserTable, implement filtering logic to update the displayed user list based on the search query.

	GitHub repository link  -https://github.com/AniJijiashvili/AdminPanell.git
