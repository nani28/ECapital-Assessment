# Take-home Assignment (Full Stack)

Preconditions:

1. Enter the database URL shared via email, in the .env file parameter named DATABASE_URL before executing the following steps.

Follow the below steps to run the project:

1. Clone the GitHub repository.
   `git clone https://github.com/nani28/ECapital-Assessment.git`
2. Go to the folder named ECapital-Assessment.
   `cd ECapital-Assessment`
3. Install the required dependencies on server side.
   `npm install .`
4. Open another terminal to install the required dependencies for client side.
   ```
   cd client
   npm install .
   npm run build
   ```
5. Start the server.
   `npm run start`
6. Start the client.
   `npm run prod`

Assumptions :

1. The database tables will be reinitialized as per the content in data.json, whenever the server starts or restarts.

# Given:

### Goal:

- Create an Employee Table web application
- Use any front-end framework (Angular, React, Vue, etc...) or CSS library to accomplish this
- Implement the back-end API with the back-end framework of your choice, and a SQL database
- What we're looking for is your demonstration of best practices in terms of UI design, organization, code style, GIT commits, and documentation

### Functional Requirements:

- Initially, list all employees that are in data.json
  - First name, last name, department, and salary in currency format (i.e. $42,000)
- Implement the following CRUD operations
  - The ability to edit an employee
    - The department field must be a dropdown, with its values pulled from the database
  - The ability to delete an employee
  - The ability to create a new employee
  - Add validations as necessary

### Technical Guidelines:

- Structure your application and components in a modular/reusable way
- Commit code with useful and informative comments
- Your application doesn't have to use the data.json file directly, but have a SQL script to initialize your database with data found in that file
- Implement API code to read and write to a SQL database
- Styling: CSS or SCSS or SASS can be used, whichever you prefer (can use popular UI frameworks like Bootstrap as well)
- You can use any supporting libraries you'd like.
- You decide what's the best UI/UX. Use your imagination.
- While anything beyond the minimum requirements might impress us, make sure you complete the base requirements first, and deliver on time.
