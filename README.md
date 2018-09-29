<p align="center">
  <img width="400" height="169,64 " src="https://user-images.githubusercontent.com/40801473/43268704-3a1be308-90e9-11e8-8642-803d47c21335.png">
</p>


# galleroid
## a CSS3 and jQuery picture gallery with polaroid-style previews

This is a responsive picture gallery suited to showing project work, with a polaroid-style thumbnail for each project. When the thumbnail is clicked, the polaroid expands to show a larger photo plus accompanying text, and offers the ability to cycle through more pictures and text about parts of the project. Galleroid is intended to be used for small, statically-served sites.

## how to use
1. Download this repository and unzip into a folder called 'galleroid' in the root of your project
2. Organise your files:
  * In the galleroid projects folder, create one folder for each separate project you'd like to display
  * Images should be in the root of the project folder, along with a 'project.json' file
  * Galleroid will display projects and images in the order they appear in your file browser, so rename files and folders appropriately
3. Edit the project.json file to define the title displayed for each project, and the captions for each image. Captions are displayed in order, and just include an empty caption if you don't want one to be shown
4. In the galleroid folder, run `node galleroid-build` to generate the appropriate HTML. Alternatively you can build this manually (see galleroid-example.html for the structure you need for each project), in which case you can use whatever file/folder structure you wish
4. Insert galleroid into your code:
  * Create a div element with the id 'galleroid' at the place in your HTML file where you'd like galleroid to appear
  * Include jQuery 3.2.1 or greater, galleroid-navigation.js and galleroid.css in that HTML file

Galleroid uses a method to inject itself into the page that works only when that page is hosted on a server - for security reasons it does not work for local files. Therefore you may need to run a simple local test server (e.g. Python's SimpleHTTPServer) to see results before deploying

You can see Galleroid in action [here](http://www.galleroid.feargusbrickley.com)
