class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.moving = false;
    this.sprites = sprites;
  }

  draw() {
    context.drawImage(
      this.image,
      //cropping
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      //actual
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
    if (!this.moving) return;
    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % 30 === 0)
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
  }
}

class Boundary {
  static width = 64;
  static height = 64;
  constructor({ position }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
  }

  draw() {
    context.fillStyle = 'rgba(255, 0, 0, 0)';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
