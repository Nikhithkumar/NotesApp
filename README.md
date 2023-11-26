<div align="center">
    <h1> Notes App</h1>
</div>


                                CRUD              UI            SEARCHBAR 

## 🧪 Technologies

This project was developed using the following technologies:
- [ReactNative](https://reactnative.dev/)

## 🚀 How to Run

Clone the project and navigate to its folder.

```bash
$ git clone https://github.com/Nikhithkumar/NotesApp.git
$ cd Notes


## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/Nikhithkumar/NotesApp.git
$ cd Notes
```

# Install dependencies
$ yarn or npm install

# Running the Application
To run the app on different platforms, you can use the following commands:

Android: Run the app on an Android emulator or device.

```bash
$ npx react-native run-android

```
iOS: Run the app on an iOS simulator or device.

```bash
$ npx react-native run-ios

```
.

💻 Project
A simple note-taking app, based on the CRUD concept, created in React Native.

The application saves notes to state management library zustand.



## 🌟 Features

- [x] Asyncstorage.

- [x] Zustand.

- [x] SearchBar.

## Building APK and IPA Files

To generate APK (Android) and IPA (iOS) files for distribution, follow these steps

# For Android (APK):
Create a release build of the Android app:

```bash

$ cd android
$ ./gradlew bundleRelease

```

Build the APK:

```bash

$ cd android
$ ./gradlew bundleRelease

```
The APK file will be located at android/app/build/outputs/bundle/release/app-release.aab.

# For iOS (IPA):
Open the project in Xcode:

```bash

$ cd ios
$ open YourApp.xcworkspace

```
Select the desired device/simulator in Xcode.

Archive the app using Xcode.

The IPA file will be generated and available for distribution through Xcode.

# Contributing
Contributions are welcome. Please fork this repository and create a pull request.

## Setting Up the Project
Create a new React Native project (if not already done):

```bash


$ npx react-native init NotesApp
$ cd NotesApp
$ npm install zustand
```

Create your project structure, including components, screens, and navigation.


React Native notes app with CRUD operations using the Zustand state management library, here's a concise documentation specifying the commands used for each step of the development process. This documentation assumes that you have a basic understanding of React Native and Zustand.

step-1 Create a Notes Store

Create a file for your Zustand store, e.g., Store.ts.
 
Implemented set and get in Zustand store

step-2 Create a Note Component

Create a new Note component, e.g., Note.ts.

Use the Zustand store to access and modify the state for each note.

step-3 Create a List of Notes Component
Create a component to display a list of notes, e.g., Notes.tsx.

Use the Zustand store to access the list of notes and map them to the UI

step-4 Implement Create Operation
Create a component or screen for adding a new note, e.g., CreateNote.tsx.

Use the Zustand store to add a new note to the state

step-5 Implement Update Operation
Use the Zustand store to update the note's content.

step-6 Implement Delete Operation
Implement a delete function using Zustand to remove a note from the state

step-7 Styling and Navigation
Style your components using CSS or a styling library.
Implement navigation using React Navigation or a similar library to navigate between screens.

step-8 Testing
Test your app on both iOS and Android emulators/simulators and physical devices.
Debug and fix any issues that may arise.

## 📝 License

This project is under the MIT license. See the LICENSE file for more details.

Make sure to replace `(https://github.com/Nikhithkumar/NotesApp.git)` with the actual URL of your repository, and customize any other placeholders in the documentation to match your project's specifics.

With this README.md, users will have clear instructions on how to install, run, and build your React Native Notes App for various platforms.
