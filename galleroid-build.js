const fs = require('fs');
const path = require('path');
var projectsFolder = "./projects/";
var projectPaths = [];
var projects = [];

console.log("Building galleroid structure");
try {
    console.log("Looking for projects folder");
    var projectsFolderItems;
    try {
        projectsFolderItems = fs.readdirSync(projectsFolder);
    } catch (err) {
        throw new Error(err);
    }

    console.log("Found projects folder. Looking for individual project folders");
    if (projectsFolderItems.length < 1) {
        throw new Error("Projects folder has no contents. Exiting...");
    }
    var itemPath;
    for (var i = 0; i < projectsFolderItems.length; i++) {
        itemPath  = projectsFolder + projectsFolderItems[i];
        try {
            var itemStats = fs.statSync(itemPath);
        } catch (err) {
            throw new Error(err);
        }

        if (itemStats.isDirectory() && !(projectsFolderItems[i].startsWith('.'))) {
            console.log("Found project folder " + itemPath);
            projectPaths.push(itemPath);
        }
    }
    if (projectPaths.length < 1) {
        throw new Error("No project folders found. Exiting...");
    }

    console.log("Creating project objects from directories");
    for (var i = 0; i < projectPaths.length; i++) {
        var project = new Project(projectPaths[i]);
        if (project.isValidProject == true) {
            projects.push(project);
        }
    }
    if (projects.length < 1) {
        throw new Error("Unable to create any project objects from directories. Make sure at least one image is in the root of the project directory along with one project.json file.")
    }

    console.log("Generating final output.")
    var outputHTML = '';
    for (var i = 0; i < projects.length; i++) {
        outputHTML = outputHTML + projects[i].HTML;
    }
    fs.writeFileSync('galleroid.html', outputHTML);
} catch (err) {
    console.error(err);
}

function Project(projectPath) {
    this.isValidProject = false;

    console.log("Attempting to create project from folder " + projectPath + ".");
    try {
        var projectItems = fs.readdirSync(projectPath);
    } catch (err) {
        throw new Error(err);
    }
    if (projectItems.length < 1) {
        console.log("Could not create project - no files found.");
        return null
    }

    this.projectJSONPath;
    this.imagePaths = [];
    for (var i = 0; i < projectItems.length; i++) {
        var itemName = projectItems[i];
        var itemPath = projectPath + "/" + itemName;
        if (itemName == "project.json") {
            console.log("Found project.JSON.")
            this.projectJSONPath = itemPath;
            continue
        }
        var ext = path.extname(itemName.toLowerCase());
        var itemIsImage = false;
        if (ext == '.jpg' || ext == '.jpeg' || ext == '.png' || ext == '.bmp' || ext == '.gif') {
            itemIsImage = true;
        }
        var itemStats = fs.statSync(itemPath);
        if (itemStats.isFile() && itemIsImage) {
            console.log("Found image " + itemName);
            itemPath = "galleroid" + itemPath.slice(1);
            this.imagePaths.push(itemPath);
        } 
    }

    var hasNoImages = false;
    var hasNoJSON = false;
    if (this.imagePaths.length < 1) {
        hasNoImages = true;
        console.log("Could not create project - no images found in project folder.");
    }
    if (this.projectJSONPath === undefined || this.projectJSONPath == null) {
        //TODO: generate empty project.JSON
        hasNoJSON = true;
        console.log("Could not create project - no project.JSON file found in project folder.");
    }
    if (hasNoImages || hasNoJSON) {
        return null;
    }

    console.log("Necessary files found. Project will be created.");
    this.isValidProject = true;

    console.log("Opening project.JSON");
    let rawdata = fs.readFileSync(this.projectJSONPath);
    this.projectJSON = JSON.parse(rawdata);

    console.log("Generating project HTML");
    this.foregroundImagesHTML = function() {
        var results = '';
        for (var i = 0; i < this.imagePaths.length; i++) {
            if (i == 0) {
                results = `${results}
                <img src="${this.imagePaths[i]}" class="galleroid-fg-picture ${i == 0 ? 'active' : 'hidden-right'}" width="100" height="100">`;
            } else {
                results = `${results}
                <img src="" data-src="${this.imagePaths[i]}" class="galleroid-fg-picture ${i == 0 ? 'active' : 'hidden-right'}" width="100" height="100">`;
            }
        }
        return results;
    }

    this.backgroundImagesHTML = function() {
        var results = '';
        for (var i = 0; i < this.imagePaths.length; i++) {
            if (i == 0) {
                results = `${results}
                <img src="${this.imagePaths[i]}" class="galleroid-bg-picture ${i == 0 ? 'active' : 'hidden-right'}" width="100" height="100">`;
            } else {
                results = `${results}
                <img src="" data-src="${this.imagePaths[i]}" class="galleroid-bg-picture ${i == 0 ? 'active' : 'hidden-right'}" width="100" height="100">`;
            }
        }
        return results;
    }

    this.captionsHTML = function() {
        var results = '';
        for (var i = 0; (i < this.imagePaths.length) && (i < this.projectJSON.captions.length); i++) {
            results = `     ${results}
            <p class="galleroid-caption ${i == 0 ? 'active' : 'hidden-right'}">${this.projectJSON.captions[i].caption}</p>`;
        }
        return results;
    }

    this.HTML = `
<div class="galleroid-item-wrapper">
    <div class="galleroid-item">
        <div class="galleroid-picture-container">${this.foregroundImagesHTML()}${this.backgroundImagesHTML()}
        <img src="galleroid/times.svg" class="galleroid-close"></div>
        <button class="galleroid-previous-button">&larr;</button>
        <p class="galleroid-title">${this.projectJSON.projectDisplayTitle}</p>
        <button class="galleroid-next-button">&rarr;</button>
        <div class="galleroid-caption-container">${this.captionsHTML()}
        </div>
    </div>
</div>
    `;
}