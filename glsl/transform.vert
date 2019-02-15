attribute vec4 a_Position;
uniform mat4 u_Transform;
void main() {
  gl_Position = u_Transform * a_Position;
}