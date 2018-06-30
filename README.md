# frangoFramework

This is a simple Javascript framework to genarate SPA(single page application).
I built this to play a little with javascript and python.

The framework has a client made with python3 to:

- Create SPA projects.
- Create Containers to organize the components.
- Create Components to separate and provide reusable code.
- Provide a local server to run the project;
- Build a SPA.

Installation structure to frangoFramework

To install frangoFramework, follow this steps:

Install python3
Install firefox browser
Install selenium with the command: pip install -U selenium
Clone or download this project
Add the cloned folder to PATH sytem variable

The client has this commands:
 - frango.py createproject 
   Creates a new project.
 - frango.py createcontainer
   Creates a new folder to agrupy components
 - frango.py createcomponent
   Creates a new component - The component can be reusable or not. Use normal components to pages(accessed by rotes) and reusable components to couple in another components.
     - Not reusable example: frango.py createcomponent test
     - Reusable example: frango.py createcomponent test reusable
 - frango.py removecomponent
   Removes a specific component
 - frango.py serve
   Runs a local server at http://localhost:8081
 - frango.py build
  Builds a SPA to deploy
  
 The frango.js file contains a lot of functions to make your work easier. I will put a tutorial here sooner as possible.
 A simple example:
 
 - get the component
 
 var component = frango.getComponent('testComponent');

 - send data to template.
 
 component.bindData([{"column1": "test"}, {"column1":"test1"}])
 
 
 - component html template.
 
   \<div>
     [{(dataset1) column1 }] 
   \</div>

 
 - it will produce the code below.
 
   \<div>
     test
   \</div>
   
   \<div>
     test1
   \</div>
 
 
 
 To more complex examples, look at https://github.com/ivanmrosa/myLanguages-client
 

