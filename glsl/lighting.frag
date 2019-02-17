
precision mediump float;

uniform vec3 u_LightPosition;
uniform vec3 u_LightColor;
uniform vec3 u_AmbientLight;

varying vec4 v_Color;
varying vec3 v_Normal;
varying vec4 v_VertexPosition;

void main() {
  vec3 lightDiraction = normalize(u_LightPosition - vec3(v_VertexPosition));
  float cosQ = max(dot(lightDiraction, normalize(v_Normal)), 0.0);
  vec3 reflectedLight = u_LightColor * v_Color.rgb * cosQ;
  vec3 ambientLight = u_AmbientLight * v_Color.rgb;
  gl_FragColor = vec4(reflectedLight + ambientLight, v_Color.a);
   
}