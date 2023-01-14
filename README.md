# Computer-Graphics-3D-Transformation
CSCI-610 

As a part of the course, Computer Graphics:-

Implementing the rendering of the target scene using WebGL and the tessellation routines that I created for my last assignment 'Tessellation'.

• In the file cg IShape. js, please fill in your code for the following functions. You can use the implementations from your previous assignments or updates you might have made since your last submission. Note that these functions have now been encapsulated into the class cgIShape. Finally, fill in as many shapes as you completed in your last assignments. You should at least have an implementation for the cube...and you can complete this assignment by just using cubes if need be.

* makeCube (subdivisions)

* makeCylinder (radialdivision,heightdivision)

* makeCone (radialdivision, heightdivision) o makeSphere (slices, stacks)

• The file teapot. js contains vertices for the Utah teapot so you can easily include the teapot in your scene.

• In the file transMain. js:

* You will need to provide a global variable for each object to appear in your scene.

* In the function createShapes (), you will need to create those objects and bind them to a VAO....Note that there is an auxiliary function bindVAO () which will do that for you. An example for creating a teapot is given in the supplied code.

* In the function set UpCamera (), you are to set up the view and projection matrices for viewing. The supplied code sets up an orthographic projection with the camera being placed -5 on the z axis and looking at the origin. You will probably want to use a perspective project and move the camera a bit to get the correct camera settings to reproduce the scene. Though matrix multiplications are built into GLSL shaders, you will need some sort of matrix library for use on the javascript side. The assignment makes use of a simple library g1Mat r ix which was specifically designed for use with WebGL.

* In the function drawShapes () , you issue a draw command for each of your objects. Note that you will need to supply a ModelMatrix for each object drawn which indicates the combined transformations to place / orient the objects in the world. An example for the teapot is supplied in the code. Note that you can create new hierarchical models objects that consist of multiple basic objects (for example for each of the pedestals) as discussed in this week's video if you like (though this is not required. This approach will allow you to manipulate the pedestal as a whole in orienting it correctly in the scene.

• You should not have to change any code below the line that reads "// Yow shouldn't have to edit below this line"

• If you load the file in your browser with no code modifications, the page should look like 

![teapot img](Computer-Graphics-3D-Transformation/README.png?raw=true)
