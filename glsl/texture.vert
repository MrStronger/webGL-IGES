attribute vec4 a_Position;
attribute vec2 a_TexCoord1;
attribute vec2 a_TexCoord2;
varying vec2 v_TexCoord1;
varying vec2 v_TexCoord2;
void main() {
  gl_Position = a_Position;
  v_TexCoord1 = a_TexCoord1;
  v_TexCoord2 = a_TexCoord2;
}