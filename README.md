# Conceptos básicos de NODE

## COLORES

**–Estilos**<br>
‘\x1b[0m’   // COLOR RESET<br>
‘\x1b[1m’   // Negrita<br>
‘\x1b[4m’   // Subrayado<br>
‘\x1b[7m’   // Invertido<br>
‘\x1b[5m’   // Parpadeo<br>
‘\x1b[7m’   // Invertir colores (fondo/primer plano)<br>
‘\x1b[9m’   // Tachado<br><br>
**–Colores Basicos**<br>
‘\x1b[31m’  // Color Rojo<br>
‘\x1b[32m’  // Color Verde<br>
‘\x1b[33m’  // Color Amarillo<br>
‘\x1b[34m’  // Color Azul<br>
‘\x1b[35m’  // Color Magenta<br>
‘\x1b[36m’  // Color Cyan<br>
‘\x1b[37m’  // Color Blanco<br><br>
**–Colores Brillantes**<br>
‘\x1b[90m’  // Gris brillante<br>
‘\x1b[91m’  // Rojo brillante<br>
‘\x1b[92m’  // Verde brillante<br>
‘\x1b[93m’  // Amarillo brillante<br>
‘\x1b[94m’  // Azul brillante<br>
‘\x1b[95m’  // Magenta brillante<br>
‘\x1b[96m’  // Cian brillante<br>
‘\x1b[97m’  // Blanco brillante<br><br>
**–Se pueden combinar estilos y colores**<br>
‘x1b[4;31m’ // Texto rojo y subrayado<br>
‘x1b[4;32m’ // Texto verde y subrayado<br>
‘x1b[4;33m’ // Texto amarillo y subrayado<br>
‘x1b[4;34m’ // Texto azul y subrayado<br>
‘x1b[4;35m’ // Texto magenta y subrayado<br>
‘x1b[4;36m’ // Texto cyan y subrayado<br>
‘x1b[4;37m’ // Texto blanco y subrayado<br><br>
‘x1b[1;31m’ // Texto rojo y negrita <br>
‘x1b[1;32m’ // Texto verde y negrita <br>
‘x1b[1;33m’ // Texto amarillo y negrita <br>
‘x1b[1;34m’ // Texto azul y negrita <br>
‘x1b[1;35m’ // Texto magenta y negrita <br>
‘x1b[1;36m’ // Texto cyan y negrita <br>
‘x1b[1;37m’ // Texto blanco y negrita <br><br>
‘x1b[1;4;31m’ // Texto rojo, negrita y subrayado<br>
‘x1b[1;4;32m’ // Texto verde, negrita y subrayado<br>
‘x1b[1;4;33m’ // Texto amarillo, negrita y subrayado<br>
‘x1b[1;4;34m’ // Texto azul, negrita y subrayado<br>
‘x1b[1;4;35m’ // Texto magenta, negrita y subrayado<br>
‘x1b[1;4;36m’ // Texto cyan, negrita y subrayado<br>
‘x1b[1;4;37m’ // Texto blanco, negrita y subrayado<br><br>
**–Colores de fondo**<br>
‘\x1b[40m’  // Fondo negro<br>
‘\x1b[41m’  // Fondo rojo<br>
‘\x1b[42m’  // Fondo verde<br>
‘\x1b[43m’  // Fondo amarillo<br>
‘\x1b[44m’  // Fondo azul<br>
‘\x1b[45m’  // Fondo magenta<br>
‘\x1b[46m’  // Fondo cyan<br>
‘\x1b[47m’  // Fondo blanco</p>