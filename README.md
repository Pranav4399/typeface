# Typeface task

This is a simple chat application built using `React, Typescript, SASS and other miscellaneous libarires` allowing users to send messages and replies in a threaded conversation format. Users can reply to existing messages and view a hierarchical representation of the conversation.

The details about the three components used in the code base are mentioned below - 

#### ChatApp
The ChatApp component is the main application component that serves as a container for the chat interface. It manages the state of the application, including the messages and the message being replied to.

#### ChatInput
The ChatInput component renders the UI for textbox and the buttons through which user can type the message.

#### Message
The Message component is the core component that represents a single message in the chat. It displays the message text, message timestamp and allows users to reply to the message. It can also recursively render replies to the message, creating a threaded conversation.

#### Steps to run the project.
Please clone the repository from the link - `https://github.com/Pranav4399/typeface.git`.

`cd typeface`
`npm install`
`npm start`

#### Miscellaneous points
1. Inline styles are used in few places and styles are imported from scss file in majority of the other elements. This has been done only to complete the task as soon as possible. The inline styles can be moved to the scss file as well.
2. The task utilizes Typescript and interfaces are defined inside each of the three components itself.
3. The current version of UI for the threaded view of messages was decided owing to the term "threaded" in the task details provided in the email. The UI can be further improved to replicate few of the real life chat applications without any change in the base layer.

`This project has been created by Pranav Sriram for the interview task of Typeface. Please reach out to me incase of any queries.`

###### Thanks,
###### Pranav Sriram
