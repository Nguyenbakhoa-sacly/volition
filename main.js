const canvas = document.getElementById("testCanvas");
const c = canvas.getContext('2d')

// thiết lập kích thước
canvas.width = innerWidth
canvas.height = innerHeight

// vị trí giả định của chuột
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
// nhấn dữ chuột vào màn hình
let mouseDown = false
addEventListener('mousedown', () => {
  mouseDown = true
})
// tha chuột
addEventListener('mouseup', () => {
  mouseDown = false
})
// lắng nghe sự đổi kích thước cửa sổ
addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// tạo các hạt nhỏ
class Particle {
  // khởi tạo thuộc tính của hạt
  constructor(x, y, radius, color) {
    this.x = x // tọa độ
    this.y = y
    this.radius = radius // bán kính hạt
    this.color = color
  }

  // vẽ hạt
  draw() {
    c.beginPath()
    // vẽ hình tròn
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.shadowColor = this.color
    c.shadowBlur = 15 // độ mờ
    c.fillStyle = this.color // màu của hạt
    c.fill() // to màu
    c.closePath()
  }

  update() {
    this.draw()
  }
}

//
let particles
function init() {
  particles = [] // chứa các hạt

  // số lượng hạt
  for (let i = 0; i < 1500; i++) {
    const canvasWidth = canvas.width + 1000
    const canvasHeight = canvas.height + 2000

    // tạo tọa x,y độ ngẩu nhiên
    const x = Math.random() * canvasWidth - canvasWidth / 2
    const y = Math.random() * canvasHeight - canvasHeight / 2

    const radius = 2 * Math.random();

    // chọn màu
    const color = colors[Math.floor(Math.random() * colors.length)]

    particles.push(new Particle(x, y, radius, color))
  }
}

//
let radians = 0 // lưu góc quay
let alpha = 1 // độ trong suốt
function animate() {
  // yêu cầu trình duyệt gọi lại hàm
  requestAnimationFrame(animate);

  c.fillStyle = `rgba(10, 10, 10, ${alpha})`
  c.fillRect(0, 0, canvas.width, canvas.height);// tô màu nền

  c.save();
  c.translate(canvas.width / 2, canvas.height / 2);

  c.rotate(radians); // Xoay hệ trục tọa độ
  // lặp qua các hạt và gọi hàm update()
  particles.forEach((particle) => {
    particle.update();
  })
  c.restore();

  radians += 0.0004 // tốc độ quay

  // Nếu chuột đang được nhấn(mouseDown là true) và độ trong suốt alpha vẫn còn cao hơn 0.03, giảm dần alpha để làm nền tối hơn.
  if (mouseDown && alpha >= 0.03) {
    alpha -= 0.01
  } else if (!mouseDown && alpha < 1) {
    alpha += 0.01
  }
}

init()
animate()
