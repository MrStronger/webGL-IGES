attribute vec4 a_Position;

void main() {
  gl_Position = a_Position;
  gl_PointSize = 20.0;
}