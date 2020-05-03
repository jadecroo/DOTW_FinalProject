//RANDOM PIX BACKGROUND

const canvas = document.getElementById('bg');
      const context = canvas.getContext('2d');

      let width;
      let height;

      // set the number of canvas pixels, scaled for screen resolution
      let pxScale = window.devicePixelRatio;

      function setup() {
        // full browser canvas
        width = window.innerWidth;
        height = window.innerHeight;

        // set the CSS display size
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        canvas.width = width * pxScale;
        canvas.height = height * pxScale;

        // normalize the coordinate system
        context.scale(pxScale, pxScale);

        draw();
      }

      function draw() {
        let pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        let pixelData = pixels.data;
        console.log(pixelData.length); // total number of color channels of all pixels

        // random pixel values
        for (let i = 0; i < pixelData.length; i += 4) { // jump over every pixel
          pixelData[i] = Math.floor(Math.random() * 255); // random red channel
          pixelData[i + 1] = Math.floor(Math.random() * 255); // green channel
          pixelData[i + 2] = Math.floor(Math.random() * 255); // blue channel
          pixelData[i + 3] = 255; // alpha channel
        }

        context.putImageData(pixels, 0, 0); // write pixels to the canvas
      }

      // when the whole page has loaded, including all dependent resources
      window.addEventListener('load', setup);

      // resize canvas when window is resized (for full browser canvas only)
      window.addEventListener('resize', setup);
