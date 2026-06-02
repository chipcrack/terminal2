# Terminal2

Terminal2 es una extensión para Visual Studio Code que permite abrir una terminal integrada y ejecutar comandos rápidamente desde la paleta de comandos, atajos de teclado o menú contextual.

## Funciones

- Abrir terminal integrada.
- Ejecutar comandos desde un cuadro de entrada.
- Cerrar la terminal creada por la extensión.
- Acceder desde el menú contextual del editor.
- Acceder desde el menú contextual del explorador de archivos.
- Usar atajos de teclado en macOS, Windows y Linux.

## Comandos disponibles

| Comando | Descripción |
|---|---|
| Terminal2: Run Terminal Command | Ejecuta un comando en la terminal integrada |
| Terminal2: Stop Terminal Command | Cierra la terminal creada por la extensión |
| Terminal2: Open in Integrated Terminal | Abre la terminal integrada |
| Terminal2: Toggle Integrated Terminal | Muestra la terminal integrada |

## Atajos de teclado

| Acción | macOS | Windows/Linux |
|---|---|---|
| Ejecutar comando | Cmd + Alt + R | Ctrl + Alt + R |
| Cerrar terminal | Cmd + Alt + C | Ctrl + Alt + C |
| Abrir terminal | Cmd + Alt + O | Ctrl + Alt + O |
| Mostrar terminal | Cmd + Alt + T | Ctrl + Alt + T |

## Configuración

La extensión permite configurar algunos valores desde la configuración de Visual Studio Code.

```json
{
  "terminal2.defaultCommand": "",
  "terminal2.terminalName": "Terminal2",
  "terminal2.clearBeforeRun": false
}
```

## Opciones de configuración

| Opción | Tipo | Valor por defecto | Descripción |
|---|---|---|---|
| terminal2.defaultCommand | string | "" | Comando por defecto que aparece al ejecutar un comando |
| terminal2.terminalName | string | "Terminal2" | Nombre de la terminal integrada |
| terminal2.clearBeforeRun | boolean | false | Limpia la terminal antes de ejecutar un comando |

## Uso

Abre la paleta de comandos con:

```text
Cmd + Shift + P
```

Luego busca:

```text
Terminal2
```

También puedes hacer clic derecho en el editor o en el explorador de archivos y seleccionar:

```text
Terminal2: Open in Integrated Terminal
```

## Requisitos

- Visual Studio Code 1.119.0 o superior.

## Versión

0.0.1

## Autor

Desarrollado por Angelo Lopez Torrico.