# Happiness

Introduction
Purpose & description 

With the enhancing technical industry and life standard of the world, people are getting focus on a “happiness”. 
Happiness is not only feeling, but also makes people be more productively and healthier (happiness, 2019, para. 1). 
Happiness is consisting various factors such as health, relationship, and economy, therefore, this application is developed to know what things are made happiness up. 
Moreover, this application shows which country is the happiest and what factors of it.
 
This application has a wonderful navigation bar which is changed depends on the user’s status such as login. In this application, 
there are used several modules for making it more efficient. chart.js is used for graphs are organized well for user sight.  
React-select and bootstrap modules are used in this app for looking gorgeous. 
 

Completeness and Limitations 

Completeness: 
	This application works toggle navigation and toggle graphs well. 
	When the function works, it leads the users to another page which they are going to be the next step such as from registering to log in. 
It makes users do not click unnecessarily.
Limitation:
	On the search page, when users write a country name in the input box if the select box already has been selected, the select box does not initialize.



Use of End Points  
/rankings 
In this endpoint (/rankings) users can check all happiness rankings. On this page, ranking API is used for year and table. 
Years can be changed depends on the data, so years are brought from ranking API.

/countries
This search page has shown happiness data depends on the country, or country and year. Ranking and Country APIs are used on the search page for showing country, year, and table.

/factor
Users cannot reach the factor page if they did not log in to this application. On this page Ranking and Country APIs are used to show year, country, and table same as the search endpoint.

/register
On this page, Register API is used for creating an account. This API is POST because this API has a purpose for delivering information from the front.

/user/login
Log in API checks authorization of the user information. If they are a proper person who has an account, it allows them to log in.

Modules Used
Ag-grid-react
This module is for a fully functioned table, including GUI, sorting, and filtering.
Install: $npm install @ag-grid-community/all-modules
https://www.ag-grid.com/reacst-grid/

react-select
This module for looking good select box and autocompleting function.
Install: $npm install react-select
https://react-select.com/home

React Bootstrap
A bootstrap module can make CSS quickly and easily. It is also easy to customize.
Install: $npm install bootstrap
https://getbootstrap.com/

react-chartjs
This module supports various charts like bar and line charts. 
Install: $npm install --save react-chartjs-2 chart.js
https://www.chartjs.org/

Application Design
Navigation and Layout 

	Navigation
Well-made navigation is that “clear and intuitive labels”, “minimum number of clicks to arrive at the destination”, 
and “Be consistent through the site” (Hogan, J., 2021, p. 14).
First, this navigation is named clearly what they want to say and point to user even user access the application first time. 
User can recognise all the functions with few clicks.
 
 
Secondly, this application is made that user can reach where they want without many clicks. Because, 
when user click factor without login then it goes to login page directly, also, if user try to login without their account, 
then user do not need to move mouse to up for click to register. They can click bottom of the log on button. 
 
Finally, this navigation is global navigation. Therefore, user does not have to go back to access other page. 
It will make the user comfortable to access everywhere in this application.

Layout
This layout is a full-width layout. However, when contents are distributed, users' perspectives are distributed, 
and their concentration is likely to be disrupted. 
Therefore, the max-width of the content is fixed so that the user's attention is not distributed evenly on a wide screen.
 

This application consists of a header (navigation), content, and footer. 
Navigation is globally fixed at the top so that users can access all the pages. The content consists of a total of four blocks, 
providing flow for users to see. Finally, the footer contains brief information about this application, which is set to route back to the main page 
when the image is clicked in the footer.
 


Usability and Quality of Design

	Content
According to web design and react component (Hogan, J., 2021, p. 5), the efficient contents include factors that are “fresh and interesting” 
and “not just copy & paste onto a server” and “have a voice”. 
First, this yellowish colour makes the attention to the users’ sight. Yellow usually means notice or warning. But this application has been avoided 
with warning meaning. it is made whiter than yellow. Therefore, this is a more friendly and attentional background instead of an alert.
Secondly, this main page is made by me who has been learning CAB230. Therefore, this main page is unique and is not to copy and paste onto a server.
Finally, there are 3 sentences on the main page which are started check, easy. Those are obviously not passive voices. Therefore, those sentences make power 
and trustable this application.


Technical Description 
Architecture 
src has folders such as assets, components, and pages. Assets are global assets of developers that can be used again for other projects or developments at any time later. There are CSS, img, and JSON folders in the assets.
components is folder containing files that classify features separately. The functionality within this folder is intended to reduce the complexity of code and re-use it.
Finally, the pages folder contains the main js files that make up each page.

Test plan 
 
Cases	Task	Expected Outcome	Result	Screenshot
Positive case	Select year	Change data on the table	pass	 
	Search year	Change data on the table	pass	 
	Login successfully	Redirect main
Change navigation bar	pass	 
	Logout	Redirect main
Change navigation bar	pass	 
	Register	Redirect login page	pass	 
	Select year	Show chart	pass	 
Negative case	Login failed	Show alert error message	pass	 
	Register failed	Show alert error message	pass	 
	Access factor page failed	Show alert error message
Redirect login page	pass	 
 
Edge case	Access factor page without login	Redirect main page	pass	 
	Access login/register (user state is logging in)	Redirect main page	pass	 

Difficulties / Exclusions / unresolved & persistent errors / 

Difficulties
	It took the longest time to set all the functions one by one when coding directly to reduce the use of the library as much as possible.
	In addition, it was difficult to handle data because it was wanted to use data from APIs that were as reliable as possible.
	If there had been more time, the completion of the CSS could have been improved.
	Handling response errors during Patch and setting up the router when taking a path other than the specified one.

Extensions (Optional) 

If it is added boards and surveys to this app, it will be able to get feedback from users, and furthermore, it will be able to create a group of people who pursue happiness through the board. It can create a 1:1 or 1:n chat system that identifies (because it can be dangerous) to prevent indiscriminate encounters.


User guide  

1. Main page
When use access this application, user can see the main page like below screenshot
 
2. Ranking
Users does not need to login to see the ranking. When users access to the ranking page. It shows directly ranking of happiness data. And users can choose year which they want to check information in specific year.
 

2. Search
Search page also does not require to login. In the search page, there are 3 option which are country selection, year selection, and country input box. When users choose country then a line chart will be shows about the score.
 

Users can choose year, then they can check rank, country and score in specific year.
 
Sometimes, users feel to bother finding country name in select box. 
Then users can search in select box. Otherwise, they can search country through input box with country name or country code.
  


3. Login 
For using factor page, users need to login this application. If they do not follow the email form, the error shows up. When their email or password are not correct, or email or password are not written, then alert error pops up.
 
When users login successfully, this page redirect to main. 

4. Register
If users do not have account, they can create in the register page. In register page, there are 3 input box for email, password, and checking password. When users create account, ID should be email, and password and checking password should be same. If users create account successfully, it gose to login page directly.
 

5. Factor
If users want to reach the factor page. They have to login. If their statement are logged in then they can access factor page without concern, otherwise, the page will be redirected to login page.
The factor data default is 2020. If they want to see chart and choose country and limit. They have to select year. 

 
Charts always show 5 rankings. And user can choose year, country, and limit.
 
References 

Happiness: Why Does Happiness Matter? (2019, January 9). Retrieved from https://happinesssummit.world/index.php/2019/01/09/why-does-happiness-matter/

Lecturer, Hogan.J (2021, 04). CAB230: Web Design and React Components.
Blackboard. https://blackboard.qut.edu.au/bbcswebdav/pid-9197644-dt-content-rid-37842998_1/courses/CAB230_21se1/WD-1.1-Principles1-3%281%29.pdf

