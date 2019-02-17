attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec4 a_Normal;

uniform mat4 u_ProjViewModelMat;
uniform mat4 u_ModelMatrix;
uniform mat4 u_NormalMatrix;

varying vec3 v_Normal;
varying vec4 v_VertexPosition;
varying vec4 v_Color;

void main() {
  gl_Position = u_ProjViewModelMat * u_ModelMatrix * a_Position;
  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
  v_VertexPosition = u_ModelMatrix * a_Position;
  v_Color = a_Color;
}