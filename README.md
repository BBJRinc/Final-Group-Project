# Calentask

This app allows you to combine the best features of a to do list app and a calendar app for scheduling those tasks.  A user can take notes, make checklists and schedule their tasks using the built-in calendar.

## Login Screen

This application uses Auth0 and json web tokens for authorization.  The user is assigned a web token that is saved to local storage on their device.  That way, when they pull up the app, they don't need to login every time and instead are directly taken to their landing page.
The server is built to identify the user with the web token and allows the user access to the app and all their data.

## Calendar View

This is the primary landing page for the user.  Here they are able to see their schedule for the day as well as any tasks they have scheduled.  We used React Native's PanResponder and Animated so the user can drag and drop their tasks onto the timeslot where they'd like to start working on that task.  The task square is also re-sizeable so the user can adjust the length of time they would like to dedicate to that task.

## Drawer Menu

Our main menu is accessed by tapping on the hamburger menu icon in the footer of the app.  Through the main menu, the user can navigate to any part of the application.  We used Native-Base components for many of the features on our app, such as this drawer.

## Task Details

This page is the heart and soul of this app.  Here a user can manage an individual task and add as much or as little detail to the task as he or she would like.

### Task Title and Label Color
The color label at the top of the task detail card can be changed by the user.  This way a user is able to categorize the task and quickly recognize the type of task they have scheduled when they first pull up their calendar.

### Due Date and Duration
Here a user is able to select the day that their task is due by.  Then, when they are searching through their tasks they can sort by the soonest due date.  
The duration picker allows them to specify how much time they are going to dedicate to their task.  Both of these components were built using React Native's picker component and unix time.

### The Checklist
This feature sets this to do app apart from all the others, the ability to create sub-tasks within a task.  The checklist allows you to create items that need to be completed in order to mark the task complete.  
We used json_agg functions in our SQL queries to be able to return multiple checklist items associated with a single task. The checklist items can be marked complete, edited or deleted.

### Activity Section and Comments
Here the activity that is done to the task is logged as well as any comments that the user has made about the task. This can be handy when you want to log something important to remember about that task. For example, maybe you were making a phone call regarding that task and wanted to remember it for later.
Here we also used json_agg functions combined with coalesce to retrieve multiple comments associated with a single task.  It also logs the user's initials who authored the comment next to the comment itself.


## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Bradack Barnard** - *Initial work* - [BradackB](https://github.com/bradackb)
* **Brandon Allred** - *Initial work* - [RedSnow32](https://github.com/redsnow32)
* **Jordan Short** - *Initial work* - [JordanShort](https://github.com/jordanshort)
* **Ross Dunford** - *Initial work* - [RDunford](https://github.com/rdunford)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
