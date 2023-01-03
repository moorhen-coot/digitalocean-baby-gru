var thick_lines_normal_vertex_shader_source = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColour;
    attribute vec3 aVertexNormal;
    attribute vec3 aVertexRealNormal;

    uniform mat4 uMVMatrix;
    uniform mat4 uMVINVMatrix;
    uniform vec3 screenZ;
    uniform mat4 uPMatrix;
    uniform float pixelZoom;

    varying lowp vec4 vColor;
    varying lowp vec3 vNormal;
    varying mediump mat4 mvInvMatrix;
    varying lowp vec3 v;
    varying lowp vec4 eyePos;

    void main(void) {

        vec4 theVert = aVertexPosition;
        float lineSize = pixelZoom*dot(aVertexNormal,aVertexNormal);
        vec3 lineY = lineSize * normalize(cross(aVertexNormal,screenZ));

        gl_Position =  uPMatrix * vec4(lineY+aVertexPosition.xyz,1.0);
        vColor = aVertexColour;
        vNormal = -aVertexRealNormal;
        if(dot(screenZ,aVertexRealNormal)>0.0)
           vNormal = aVertexRealNormal;
        eyePos = uMVMatrix * aVertexPosition;
        mvInvMatrix = uMVINVMatrix;
        v = vec3(uMVMatrix * theVert);

    }
`;

export {thick_lines_normal_vertex_shader_source};
