# SummerChat

## Project Overview
SummerChat is a modern, real-time chat application built with React and
Firebase, designed for seamless communication and an intuitive user interface.
Users can send text and image messages, initiate new chats, and enjoy a
responsive, mobile-friendly layout.

>>> Visit: ![Summer Chat](https://summerchat-ed562.web.app/)

### Key Features
- **Real-Time Messaging**: Instant communication with Firebase's real-time
                            updates.
- **Image Sharing**: Allows users to upload and share images within chat.
- **User Authentication**: Secure login and registration with Firebase
                            Authentication.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Installation and Setup

### Prerequisites
- **Node.js** (latest LTS version recommended)
- **Firebase Account** (for Firebase configuration)
---

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SummerChat.git```

2. Navigate to the project directory:
    ```bash
    cd SummerChat```

3. Install dependencies:
    ```bash
    npm install```

4. Set up environment variables by creating a .env file in the root directory.
    Populate it with your Firebase credentials:
    ```shell
    REACT_APP_API_KEY=your_api_key
    REACT_APP_AUTH_DOMAIN=your_auth_domain
    REACT_APP_PROJECT_ID=your_project_id
    REACT_APP_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_APP_ID=your_app_id```

5. Run the app in development mode:
    ```bash
    npm start```


### File Descriptions

#### `src/App.jsx`

The `App.jsx` file serves as the main entry for routing and managing protected
navigation within the app. Key aspects include:

- **Protected Routing**: Allows only authenticated users to access the main
                            chat page.
- **React Router Setup**: Configures paths (`/`, `/login`, `/register`) for app
                            navigation.
- **Prop Validation**: Uses PropTypes for validating `ProtectedRoute` child
                            components.


#### `src/Components/Chat.jsx`

The `Chat.jsx` component renders the main chat interface for a conversation.
Key features:

- **User Display**: Shows the name of the chat participant.
- **Chat Controls**: Provides options for adding attachments, accessing the
                        camera, and more.
- **Integrated Components**: Utilizes `Messages` to display chat history and
                                `Input` for sending messages.


#### `src/Components/Chats.jsx`

The `Chats.jsx` component displays the list of user chats and handles chat
selection. Key features:

- **Real-Time Chat Updates**: Fetches and displays user chat data from Firebase
                                in real-time.
- **Chat Selection**: Allows users to select a chat, which updates the active
                        chat context.
- **User Info and Last Message**: Shows the profile picture, display name, and
                                    preview of the last message for each chat.

#### `src/Components/Input.jsx`

The `Input.jsx` component provides the interface for composing and sending
messages within a chat. Key features:

- **Text and Image Messages**: Allows users to send both text and image
                                messages.
- **Image Upload**: Integrates with Firebase Storage to upload images,
                        retrieving download URLs for use in messages.
- **Real-Time Updates**: Updates the Firebase database with messages and
                            timestamps, ensuring both users' chat views
                            stay synchronized.
- **Input Validation**: Prevents empty message submissions and handles errors
                            during file uploads.


#### `src/Components/Message.jsx`

The `Message.jsx` component displays individual chat messages within the
conversation. Key features:

- **Dynamic Display**: Conditionally renders the message as sent by either the
                            current user or the other user.
- **Auto-Scroll**: Scrolls messages into view as new messages are added
                    to the chat.
- **Image Support**: Displays any attached image alongside the text content.
- **Prop Validation**: Ensures message data is structured correctly
                        using PropTypes.

#### `src/Components/Messages.jsx`
The `Messages.jsx` component is responsible for rendering the chat conversation
by displaying a list of messages between users. Key features:

- **Real-Time Message Fetching**: Subscribes to changes in the Firebase
                database, updating the chat view in real time when new messages
                are sent or received.
- **Individual Message Components**: Renders each message using the `Message` 
                component, handling message-specific data and display.
- **Optimized Data Handling**: Manages and updates messages efficiently through
                Firebase's onSnapshot function, ensuring low latency and smooth
                user experience.

#### `src/Components/Navbar.jsx`
The `Navbar.jsx` component serves as the top navigation bar, providing
essential user information and logout functionality. Key features:

- **App Branding**: Displays the application logo or name ("Summer Chat") 
                    prominently.
- **User Information**: Shows the logged-in user’s profile image and
                    display name.
- **Logout Functionality**: Provides a logout button that allows users to sign
                    out of the application securely through Firebase.

#### `src/Components/Search.jsx`
The `Search.jsx` component allows users to search for other users by their
display name. Key features:

- **User Search**: Retrieves users from Firebase based on the display name
                    input.
- **Chat Initialization**: If a chat does not already exist between two users,
    it creates a new chat document in Firebase, sets up user chat details, and
    updates each user’s chat list with relevant information.
- **Error Handling**: Displays a message if the user is not found.
- **Context Dispatch**: Dispatches the selected user to the `ChatContext` for
                    use in the chat view.

#### `src/Components/Sidebar.jsx`
The `Sidebar.jsx` component organizes the main navigational elements for the
chat application. It includes:

- **Navbar**: Displays user information and logout button.
- **Search**: Allows user search and chat initiation.
- **Chats**: Displays a list of the user’s chats for easy access.

#### `src/context/AuthContext.jsx`
The `AuthContext.jsx` file provides a context for managing user authentication
state. Key features include:

- **Authentication State Management**: Monitors the current user state using
                    Firebase's `onAuthStateChanged` method.
- **Context Provider**: Supplies the current user data to components that
                    require authentication information.

#### `src/context/ChatContext.jsx`
The `ChatContext.jsx` file manages the chat-related state and user interactions.
Key features include:

- **Chat State Management**: Maintains the current chat's ID and selected user.
- **Reducer Functionality**: Implements a reducer to handle actions such as
                                changing the current user.
- **Context Provider**: Supplies chat state and dispatch function to components
                                requiring chat information.

#### `images/`
This folder contains all the application assets such as logos, user avatars,
and any other images used throughout the application.

#### `src/pages/Home.jsx`
The `Home` component serves as the main layout for the chat application,
combining the Sidebar and Chat components for a cohesive user experience.

#### `src/pages/Login.jsx`
The `Login` component handles user authentication, allowing users to sign in
with their email and password. It also includes error handling for
unsuccessful login attempts.

#### `src/pages/Register.jsx`
The `Register` component facilitates user sign-up, allowing users to create an
account, upload a profile avatar, and initialize their user profile in
Firebase. It also includes error handling for signup failures.

### `src/style.scss`
- **Purpose**: Provides styling for the chat application, including responsive
                design features.

### `src/App.jsx`
- **Purpose**: Main application component that sets up routing and protected
                routes using React Router.
- **Key Features**:
  - **ProtectedRoute Component**: Ensures that only authenticated users can
        access certain pages, redirecting unauthenticated users to
        the login page.
  - **Routes**:
    - `/`: Default route leading to the `Home` page, protected by 
            authentication.
    - `/login`: Route for the login page.
    - `/register`: Route for the registration page.
  - **Integration with AuthContext**: Utilizes context to determine the current
            user's authentication status.

### `src/index.js`
- **Purpose**: Entry point for the React application, setting up root rendering
        with context providers.
- **Key Features**:
  - **AuthContextProvider**: Wraps the application in authentication context,
            making user data available throughout the app.
  - **ChatContextProvider**: Wraps the application in chat context, allowing
            chat functionality and data sharing across components.
  - **StrictMode**: Includes `React.StrictMode` to assist in identifying
            potential issues in the application.

### `package.json`
- **Purpose**: Defines project metadata, dependencies, and scripts for the
        Summer Chat application.
- **Key Components**:
  - **Dependencies**:
    - `@testing-library` packages for testing utilities in Jest and React.
    - `dotenv` for managing environment variables.
    - `firebase` for backend and database integration.
    - `react`, `react-dom`, and `react-router-dom` for building the React
            application and handling routing.
    - `sass` for managing styles with SCSS.
    - `uuid` for generating unique identifiers.
    - `web-vitals` for measuring application performance.
  - **Scripts**:
    - `start`: Launches the application in development mode.
    - `build`: Compiles the app for production.
    - `test`: Runs tests using React's testing library.
    - `eject`: Ejects from `react-scripts` for more configuration control.

### `public/index.html`
- **Purpose**: Provides the base HTML structure for the Summer Chat React
        application.
- **Key Components**:
  - **Meta Tags**:
    - `charset="utf-8"`: Defines character encoding as UTF-8.
    - `viewport`: Ensures responsive scaling on different devices.
    - `description`: Basic description for search engines.
  - **Fonts**:
    - Links to Google Fonts for `Open Sans`, setting a clean, readable font
        style across the app.
  - **CSS Reset**:
    - Basic CSS reset within a `<style>` block, applying `Open Sans` as the
        default font and resetting margins.

### `src/firebase.js`
- **Purpose**: Sets up Firebase configuration and initializes Firebase
        services used in the app.
- **Key Features**:
  - **Configuration**:
    - Uses environment variables (`process.env`) to keep sensitive Firebase
        project data secure.
  - **Firebase Services**:
    - `getAuth()`: Initializes Firebase Authentication for user login and
            registration.
    - `getStorage()`: Configures Firebase Storage for file uploads and
            retrieval.
    - `getFirestore()`: Sets up Firebase Firestore as the primary database
            for storing app data.

---

To run the project, see the `package.json` section below for available scripts
    and dependencies.

### Contributing
    Contributions are welcome! Please fork the repository, create a feature
    branch, and submit a pull request for review.

### License
    This project is licensed under the MIT License.

### About the Author
    Developed by ![Samar Ibrahim](https://github.com/itssamaribrahim), passionate about building efficient and user-friendly
    web applications.
