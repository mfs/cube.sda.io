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

function cube(id) {
    const canvas = document.getElementById(id);

    canvas.width = 2 * sides + 3 * size + 4 * gap;
    canvas.height = 2 * sides + 3 * size + 4 * gap;

    const squares = canvas.getAttribute("data-squares");

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

cube("oll-edge-bar");
cube("oll-edge-l");
cube("oll-edge-dot");

cube("oll-sune");
cube("oll-antisune");
cube("oll-h");
cube("oll-pi");
cube("oll-t");
cube("oll-u");
cube("oll-l");
