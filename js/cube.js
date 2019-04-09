const gap = 4;
const size = 30;
const sides = 6;

const colors = {
  "r": "red",
  "g": "green",
  "b": "blue",
  "w": "white",
  "y": "#f0f000",
  "o": "orange",
  "_": "gray"
};

function cube(id, squares) {
    const canvas = document.getElementById(id);

    canvas.width = 2 * sides + 3 * size + 4 * gap;
    canvas.height = 2 * sides + 3 * size + 4 * gap;

    const ctx = canvas.getContext('2d');

    for (y = 0; y < 3; ++y) {
        for (x = 0; x < 3; ++x) {
            ctx.fillStyle = colors[squares.charAt(y * 3 + x)];
            const rx = (size + gap) * x + sides + gap;
            const ry = (size + gap) * y + sides + gap;
            ctx.fillRect(rx, ry, size, size);
        }
    }

    const edges = squares.split("|");

    for (i = 0; i < 3; ++i) {
        // top
        ctx.fillStyle = colors[edges[1].charAt(i)];
        ctx.fillRect(sides + gap + (size + gap) * i, 0, size, sides);

        // bottom
        ctx.fillStyle = colors[edges[2].charAt(i)];
        ctx.fillRect(sides + gap + (size + gap) * i, (gap + size) * 3 + gap + sides, size, sides);

        // left
        ctx.fillStyle = colors[edges[3].charAt(i)];
        ctx.fillRect(0, sides + gap + (size + gap) * i , sides, size);

        // right
        ctx.fillStyle = colors[edges[4].charAt(i)];
        ctx.fillRect((gap + size) * 3 + gap + sides, sides + gap + (size + gap) * i , sides, size);
    }
}

cube("oll-edge-bar", "___yyy___|_y_|_y_|___|___");
cube("oll-edge-l", "____yy_y_|_y_|___|_y_|___");
cube("oll-edge-dot", "____y____|_y_|_y_|_y_|_y_");

cube("oll-sune", "_y_yyyyy_|y__|__y|___|y__");
cube("oll-antisune", "_y_yyy_yy|__y|y__|y__|___");
cube("oll-h", "_y_yyy_y_|y_y|y_y|___|___");
cube("oll-pi", "_y_yyy_y_|__y|__y|y_y|___");
cube("oll-t", "_yyyyy_yy|y__|y__|___|___");
cube("oll-u", "yyyyyy_y_|___|y_y|___|___");
cube("oll-l", "yy_yyy_yy|___|y__|___|y__");
