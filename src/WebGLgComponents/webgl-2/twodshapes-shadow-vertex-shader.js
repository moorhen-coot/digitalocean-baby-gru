var twod_vertex_shadow_shader_source = `#version 300 es\n
    in vec3 aVertexOrigin;
    in vec3 aVertexPosition;
    in vec4 aVertexColour;
    in vec3 aVertexNormal;
    in vec2 aVertexTexture;

    uniform mat4 uMVMatrix;
    uniform mat4 uMVINVMatrix;
    uniform mat4 uPMatrix;

    out lowp vec4 vColor;
    out lowp vec3 vNormal;
    out lowp vec2 vTexture;
    out mediump mat4 mvMatrix;
    out mediump mat4 projMatrix;
    out lowp vec3 v;
    out float size_v;

    out lowp vec4 eyePos;

    uniform float size;
    uniform vec3 offset;

    uniform mat4 TextureMatrix;
    out lowp vec4 ShadowCoord;

    void main(void) {

      vec4 theVert = vec4(size*aVertexPosition+offset,1.0);

      ShadowCoord = TextureMatrix * theVert;

      gl_Position = uPMatrix * uMVMatrix * theVert;
      vColor = aVertexColour;
      vNormal = aVertexNormal;
      eyePos = uMVMatrix * theVert;
      mvMatrix = uMVMatrix;
      v = vec3(uMVMatrix * theVert);

      projMatrix = uPMatrix;
      size_v = size;
      vTexture = aVertexTexture;
    }
`;

export {twod_vertex_shadow_shader_source};
