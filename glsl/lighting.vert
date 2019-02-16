attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec4 a_Normal;
uniform vec3 u_LightColor;
uniform vec3 u_AmbientLight;
uniform vec3 u_LightDiraction;
uniform mat4 u_ProjViewModelMat;
uniform mat4 u_NormalMatrix;
varying vec4 v_Color;
void main() {
  gl_Position = u_ProjViewModelMat * a_Position;
  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));
  float cosQ = max(dot(u_LightDiraction, normal), 0.0);
  vec3 reflectedLight = u_LightColor * vec3(a_Color) * cosQ;
  vec3 ambientLight = u_AmbientLight * vec3(a_Color);
  v_Color = vec4(reflectedLight + ambientLight, 1.0);
}