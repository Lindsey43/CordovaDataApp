# CordovaDataApp
For this assignment you will be creating an iPhone app called "Giftr". Basically, it is an app for saving gift ideas for people that you like enough to consider buying gifts for. The interface is four very similar screens and four similar modal windows. Here is the wireframe:

#Giftr-ios-sql-wireframe.png

Here is the GitHub Repo with the starter HTML, CSS, and JS to save you having to design that part - https://github.com/SteveGriffith/ios-sql (Links to an external site.) 

Here is the CodePen that gives an example of how to work with simulated Modal windows through HTML, CSS and JS - http://codepen.io/mad-d/pen/Pwdbgq (Links to an external site.) 

#Database

The primary challenge of the assignment is managing the data going in and out of your local SQLite database.

You need to create a local database with three tables:

people
person_id integer
person_name varchar
 

occasions
occ_id integer
occ_name varchar
 

gifts
gift_id integer
person_id integer
occ_id integer
gift_idea varchar
purchased boolean
 

#Functional Requirements

Swiping left or right on the People or Occasion screens will switch back and forth between those screens.

The screens in the user interface are intended to be an easy way for users to manage the information in those tables.

There are four "Add" buttons. Clicking any of those will open a Modal window and let the user enter the information for a new person, occasion, or gift idea.

A single tap on a list item in the People or Occasion screens will open the screen for managing the gifts for the selected person or occasion.

A single tap on a gift idea will toggle the purchased status - you will need to find a visual way to represent that status.

A double tap on ANY list item will remove it from the interface and delete it from the database.

#Design

Use a monochromatic colour scheme and the icon set that you created for the MAD9020 course assignment.

CSS Transitions are optional for this assignment.

 

#Submission

Create a GitHub Repo with your entire project. Make sure this includes all your Cordova project folders.

Submit the URL for your github repo master branch.

Also install your app on one of the iPhones in class and submit the name of the phone that you submitted your app on.
