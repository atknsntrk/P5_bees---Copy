class Anim {
    constructor() {
        this.angle = 0;
        this.w = 10;
        this.ma = atan(cos(QUARTER_PI));
        this.maxD = dist(0, 0, 60, 60);
    }

    render() {
      tex.background(100);
      tex.clear()
      tex.push()
      tex.ortho(-64, 64, 64, -64, 0, 110);
      tex.rotateX(-this.ma);
      tex.rotateY(-QUARTER_PI);
    
      for (let z = 0; z < tex.height; z += this.w) {
        for (let x = 0; x < tex.width; x += this.w) {
          tex.push();
          let d = dist(x, z, tex.width / 2, tex.height / 2);
          let offset = map(d, 0, this.maxD, -PI, PI);
          let a = this.angle + offset;
          let h = floor(map(sin(a), -1, 1, 20, 60));
          tex.translate(x - tex.width / 2, 0, z - tex.height / 2);
          tex.normalMaterial();
          tex.box(this.w, h, this.w);
          tex.pop();
        }
      }
      this.angle -= TWO_PI / 100 ;  
      tex.pop()
    }

}