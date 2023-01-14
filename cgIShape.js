class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }
    
    makeCube (subdivisions)  {
        
        // fill in your cube code here.
        if( subdivisions < 1 )

            subdivisions = 1;

        var step;

        step = 1 /  subdivisions;

        for (var i = 0; i < subdivisions; i++) {

            var u0 = i * step - .5;

            var u1 = (i + 1) * step - .5;

            for (var j = 0; j < subdivisions; j++) {

                var v0 = j * step - .5;

                var v1 = (j + 1) * step - .5;

                //Triangle drawn using coordinate

                this.addTriangle(u0, v0, .5, u1, v0, .5, u0, v1, .5);

                this.addTriangle(u0, v1, .5, u1, v0, .5, u1, v1, .5);

                this.addTriangle(u1, v0, -.5, u0, v0, -.5, u0, v1, -.5);

                this.addTriangle(u1, v0, -.5, u0, v1, -.5, u1, v1, -.5);

                this.addTriangle(.5, u1, v0, .5, u0, v1, .5, u0, v0);

                this.addTriangle(.5, u1, v0, .5, u1, v1, .5, u0, v1);

                this.addTriangle(u1, -.5, v0, u0, -.5, v1, u0, -.5, v0);

                this.addTriangle(u1, -.5, v0, u1, -.5, v1, u0, -.5, v1);

                this.addTriangle(u0, .5, v1, u1, .5, v0, u0, .5, v0);

                this.addTriangle(u1, .5, v1, u1, .5, v0, u0, .5, v1);




                this.addTriangle(-.5, u0, v1, -.5, u1, v0, -.5, u0, v0);

                this.addTriangle(-.5, u1, v1, -.5, u1, v0, -.5, u0, v1);

            }
        }
    }
}


class Cylinder extends cgIShape{

    constructor(radialdivision, heightdivision) {
        
        super();
        this.makeCylinder(radialdivision, heightdivision);
    }
    
    makeCylinder(radialdivision,heightdivision){
        // fill in your cylinder code here

        var radius = 0.5;
        if( radialdivision < 3 )
            radialdivision = 3;

        if( heightdivision < 1 )
            heightdivision = 1;

        // const float PI = 3.14159265358979f;
        var PI = Math.PI;
        var alpha = 0;
        var y0 = -.5; var y1;
        var x0; var z0; var x1; var z1;
        for (var i = 0; i < radialdivision; i++) {
            // we compute the coordinates of the triangle MON, 
            // where M(x0,+/-.5,z0), O(0,+/-.5,0) and N(x1,+/-.5,z1)
            x0 = radius * Math.cos(i * 2 * PI / radialdivision);
            z0 = radius * Math.sin(i * 2 * PI / radialdivision);
            x1 = radius * Math.cos((i+1) * 2 * PI / radialdivision);
            z1 = radius * Math.sin((i+1) * 2 * PI / radialdivision);

            // face (x,-.5,z) drawn clockwise
            this.addTriangle(0, -0.5, 0, x0, -0.5, z0, x1, -0.5, z1);
            // face (x,5,z) drawn counterclockwise
            this.addTriangle(x1, .5, z1, x0, .5, z0, 0, .5, 0);

            // draw the rectangles for the height
            for (var j = 0; j < heightdivision; j++) {
                y0 = (j) / heightdivision - .5;
                y1 = (j + 1) / heightdivision -.5;
                this.addTriangle(x0, y1, z0, x1, y1, z1, x0, y0, z0);
                this.addTriangle(x1, y1, z1, x1, y0, z1, x0, y0, z0);
            }
        }
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
    
        // Fill in your cone code here.

        var radius = 0.5;
        if( radialdivision < 3 )
            radialdivision = 3;

        if( heightdivision < 1 )
            heightdivision = 1;

        const PI = Math.PI;

        for (var i = 0; i < radialdivision; i++) {
            // we compute the coordinates of the triangle MON, 
            // where M(x0,+/-.5,z0), O(0,+/-.5,0) and N(x1,+/-.5,z1)
            var x0 = radius * Math.cos(i * 2 * PI / radialdivision);
            var z0 = radius * Math.sin(i * 2 * PI / radialdivision);
            var x1 = radius * Math.cos((i + 1) * 2 * PI / radialdivision);
            var z1 = radius * Math.sin((i + 1) * 2 * PI / radialdivision);

            // face (x,5,z) drawn counterclockwise
            this.addTriangle(x0, -0.5, z0, x1, -0.5, z1, 0.0, -0.5, 0.0);

            var y0 = -0.5;
            var cx0 = -x0 / heightdivision;
            var cz0 = -z0 / heightdivision;
            var cx1 = -x1 / heightdivision;
            var cz1 = -z1 / heightdivision;
            var y1 = 1.0 / heightdivision;
            // draw the rectangles for the height
            for (var j = 0; j < heightdivision - 1; j++) {
            // else we wanna draw trapezium         
                this.addTriangle(x0, y0, z0, x0+cx0, y0+y1, z0+cz0, x1, y0, z1);
                this.addTriangle(x0+cx0, y0+y1, z0+cz0, x1+cx1, y0+y1, z1+cz1, x1, y0, z1);

                x0 += cx0;
                z0 += cz0;
                x1 += cx1;
                z1 += cz1;
                y0 += y1;
            }

            // when we are at the top of the cone, just draw a triangle
            this.addTriangle(x0, y0, z0, 0.0, 0.5, 0.0, x1, y0, z1);
        }
    }
}
    
// class Sphere extends cgIShape {

//     constructor (slices, stacks) {
//         super();
//         this.makeSphere (slices, stacks);
//     }
    
//     makeSphere (slices, stacks) {
//         // fill in your sphere code here
//         var radius = 0.5;
//         if (slices < 1)
//         slices = 1;
//         if (slices > 5)
//             slices = 5;

//         if (stacks < 3)
//             stacks = 3;

//         //define the variabel "a" it's describe in the course
//         var a = radius;
//         //declaration of the 19 triangles of the icosahedron
//         //Triangle0 = <V0,V1,V2>
//         this.recursiveTriangle(0, a, -1, -a, 1, 0, a, 1, 0, slices, radius);
//         //Triangle1 = <V3, V2, V1>
//         this.recursiveTriangle(0, a, 1, a, 1, 0, -a, 1, 0, slices, radius);
//         //Triangle2 = <V3, V4, V5>
//         this.recursiveTriangle(0, a, 1, -1, 0, a, 0, -a, 1, slices, radius);
//         //Triangle3 = <V3, V5, V6>
//         this.recursiveTriangle(0, a, 1, 0, -a, 1, 1, 0, a, slices, radius);
//         //Triangle4 = <V0, V7, V8>
//         this.recursiveTriangle(0, a, -1, 1, 0, -a, 0, -a, -1, slices, radius);
//         //Triangle5 = <V0, V8, V9>
//         this.recursiveTriangle(0, a, -1, 0, -a, -1, -1, 0, -a, slices, radius);
//         //Triangle6 = <V5, V10, V11>
//         this.recursiveTriangle(0, -a, 1, -a, -1, 0, a, -1, 0, slices, radius);
//         //Triangle7 = <V8, V11, V10>
//         this.recursiveTriangle(0, -a, -1, a, -1, 0, -a, -1, 0, slices, radius);
//         //Triangle8 = <V1, V9, V4>
//         this.recursiveTriangle(-a, 1, 0, -1, 0, -a, -1, 0, a, slices, radius);
//         //Triangle9 = <V10, V4, V9>
//         this.recursiveTriangle(-a, -1, 0, -1, 0, a, -1, 0, -a, slices, radius);
//         //Triangle10 = <V2, V6, V7>
//         this.recursiveTriangle(a, 1, 0, 1, 0, a, 1, 0, -a, slices, radius);
//         //Triangle11 = <V11, V7, V6>
//         this.recursiveTriangle(a, -1, 0, 1, 0, -a, 1, 0, a, slices, radius);
//         //Triangle12 = <V3, V1, V4>
//         this.recursiveTriangle(0, a, 1, -a, 1, 0, -1, 0, a, slices, radius);
//         //Triangle13 = <V3, V6, V2>
//         this.recursiveTriangle(0, a, 1, 1, 0, a, a, 1, 0, slices, radius);
//         //Triangle14 = <V0, V9, V1>
//         this.recursiveTriangle(0, a, -1, -1, 0, -a, -a, 1, 0, slices, radius);
//         //Triangle15 = <V0, V2, V7>
//         this.recursiveTriangle(0, a, -1, a, 1, 0, 1, 0, -a, slices, radius);
//         //Triangle16 = <V8, V10, V9>
//         this.recursiveTriangle(0, -a, -1, -a, -1, 0, -1, 0, -a, slices, radius);
//         //Triangle17 = <V8, V7, V11>
//         this.recursiveTriangle(0, -a, -1, 1, 0, -a, a, -1, 0, slices, radius);
//         //Triangle18 = <V5, V4, V10>
//         this.recursiveTriangle(0, -a, 1, -1, 0, a, -a, -1, 0, slices, radius);
//         //Triangle19 = <V5, V11, V6>
//         this.recursiveTriangle(0, -a, 1, a, -1, 0, 1, 0, a, slices, radius);

//     }

//     function recursiveTriangle(x0, y0, z0, x1, y1, z1, x2, y2, z2, subdivision, radius)
//     {
//         if (subdivision == 1)
//         {
//             //Normalization of the point 0
//             var norm0 = Math.pow((Math.pow(x0, 2) + Math.pow(y0, 2) + Math.pow(z0, 2)), 0.5);
//             x0 = (x0 / norm0) * radius;
//             y0 = (y0 / norm0) * radius;
//             z0 = (z0 / norm0) * radius;
//             //Normalization of the point 1
//             var norm1 = Math.pow((Math.pow(x1, 2) + Math.pow(y1, 2) + Math.pow(z1, 2)), 0.5);
//             x1 = (x1 / norm1) * radius;
//             y1 = (y1 / norm1) * radius;
//             z1 = (z1 / norm1) * radius;
//             //Normalization of the point 2
//             var norm2 = Math.pow((Math.pow(x2, 2) + Math.pow(y2, 2) + Math.pow(z2, 2)), 0.5);
//             x2 = (x2 / norm2) * radius;
//             y2 = (y2 / norm2) * radius;
//             z2 = (z2 / norm2) * radius;
//             addTriangle(x0, y0, z0, x1, y1, z1, x2, y2, z2);
//         }
//         else
//         {
//             //Calculate the point on the middle of the edge point0 - point1
//             var midx01 = (x0 + x1) / 2.;
//             var midy01 = (y0 + y1) / 2.;
//             var midz01 = (z0 + z1) / 2.;

//             //Calculate the point on the middle of the edge point1 - point2
//             var midx12 = (x1 + x2) / 2.;
//             var midy12 = (y1 + y2) / 2.;
//             var midz12 = (z1 + z2) / 2.;

//             //Calculate the point on the middle of the edge point2 - point0
//             var midx20 = (x0 + x2) / 2.;
//             var midy20 = (y0 + y2) / 2.;
//             var midz20 = (z0 + z2) / 2.;

//             //Call 4 times (1 call per sub triangles created) the recursiveTriangle method with subdivision-1,
//             this.recursiveTriangle(x0, y0, z0, midx01, midy01, midz01, midx20, midy20, midz20, (subdivision - 1), radius);
//             this.recursiveTriangle(midx01, midy01, midz01, midx12, midy12, midz12, midx20, midy20, midz20, (subdivision - 1), radius);
//             this.recursiveTriangle(midx01, midy01, midz01, x1, y1, z1, midx12, midy12, midz12, (subdivision - 1), radius);
//             this.recursiveTriangle(midx20, midy20, midz20, midx12, midy12, midz12, x2, y2, z2, (subdivision - 1), radius);
//         }
//     }

// }


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}