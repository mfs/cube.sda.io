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

function draw_arrow_head(ctx, x, y, line_angle) {
    let angle = Math.PI / 8;
    let length = 10;
    let h = Math.abs(length / Math.cos(angle));

    let x0 = x + Math.cos(line_angle + angle) * h;
    let y0 = y + Math.sin(line_angle + angle) * h;

    let x1 = x + Math.cos(line_angle - angle) * h;
    let y1 = y + Math.sin(line_angle - angle) * h;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.fill();
}

function draw_line(ctx, x0, y0, x1, y1, start_arrow, end_arrow) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    let line_angle = Math.atan2(y1 - y0, x1 - x0);

    if (end_arrow) {
      draw_arrow_head(ctx, x1, y1, line_angle + Math.PI);
    }

    if (start_arrow) {
      draw_arrow_head(ctx, x0, y0, line_angle);
    }
}

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

    // lines
    ctx.fillStyle = "gray";
    ctx.strokeStyle = "gray";
    let arrows = canvas.getAttribute("data-arrows");
    if (arrows != null) {
        arrows = arrows.split("|");
        let both = false;
        if (arrows.length != 3) {
            both = true;
        }
        arrows.forEach(function(a) {
          const x0 = (size + gap) * (parseInt(a[0]) % 3) + sides + gap + size/2;
          const y0 = (size + gap) * Math.floor(parseInt(a[0]) / 3) + sides + gap + size/2;
          const x1 = (size + gap) * (parseInt(a[1]) % 3) + sides + gap + size/2;
          const y1 = (size + gap) * Math.floor(parseInt(a[1]) / 3) + sides + gap + size/2;
          draw_line(ctx, x0, y0, x1, y1, both, true);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {

    var cubes = document.getElementsByTagName("canvas");

    var i;
    for (i = 0; i < cubes.length; i++) {
        cube(cubes[i].id);
    }


}, false);
