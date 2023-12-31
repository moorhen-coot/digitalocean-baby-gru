var pointspheres_vertex_shader_source = `#version 300 es\n
    in vec3 aVertexPosition;
    in vec4 aVertexColour;
    in vec3 aVertexNormal;

    uniform vec3 offset;
    uniform float size;
    uniform mat3 scaleMatrix;

    uniform mat4 uMVMatrix;
    uniform mat4 uMVINVMatrix;
    uniform mat4 uPMatrix;

    out lowp vec4 vColor;
    out lowp vec3 vNormal;
    out lowp vec3 vPosition;
    out mediump mat4 mvInvMatrix;

    out lowp vec4 eyePos;

    void main(void) {

      vec4 theVert = vec4(size*scaleMatrix*aVertexPosition+offset,1.0);

      gl_Position = uPMatrix * uMVMatrix * theVert;
      vColor = aVertexColour;

      eyePos = uMVMatrix * theVert;

      vNormal = aVertexNormal;
      mvInvMatrix = uMVINVMatrix;
      vPosition = aVertexPosition;

    }
`;

export {pointspheres_vertex_shader_source};
