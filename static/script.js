let graph = document.querySelector('.graph')
let selectedVertexes = [] //Хранит выбранные вершины
let clickCount = 0;
// Кнопки

//Кнопка добавить узел
let buttonAddVertex = document.querySelector('#add__vertex')

buttonAddVertex.onclick = () => {
	let newVertex = document.createElement('div')
	newVertex.classList.add('vertex')
	newVertex.textContent = '23'
	clickCount++
	newVertex.id = `el${clickCount}`
	graph.appendChild(newVertex)
	selectVertex(newVertex)

	document.addEventListener('click', function(event) {
		if (!newVertex.contains(event.target) && !event.target.classList.contains('vertex')) {
			newVertex.style.border = '2px solid green'
		}
	})
}

// Кнопка удалить узел
buttonRemoveVertex = document.querySelector('#remove__vertex')

buttonRemoveVertex.onclick = () => {
	let vertexes = document.querySelectorAll('.vertex')
	let lastVertex = vertexes[vertexes.length - 1]

	if (lastVertex) {
    lastVertex.parentNode.removeChild(lastVertex)
	}
}

//Добавить ребро
buttonAddLine = document.querySelector('#add__line')

buttonAddLine.addEventListener('click', function() {
	addLine()
})

//Выбираем элемент
let vertexes = document.querySelectorAll('.vertex')

function selectVertex(element) {
	element.addEventListener('click', function() {
		element.style.border = '2px solid red'
	})
}

vertexes.forEach(function(element) {
	selectVertex(element)
})


//Если клик вне элемента, то отменяем выбор
function cancelSelectVertex() {
	document.addEventListener('click', function(event) {
		vertexes.forEach(function(element) {
			if (!element.contains(event.target) && !event.target.classList.contains('vertex')) {
				// Клик произошел вне элемента, сбрасываем стиль рамки
				element.style.border = '2px solid green' // исходный цвет рамки
			}
		})
	})
}

cancelSelectVertex()

//Построение ребер

function addLine() {
	let el1 = document.getElementById('el1')
	let el2 = document.getElementById('el2')
	const size = 40

	const canvas = document.getElementById('canvas')
	const context = canvas.getContext('2d')
	let width = canvas.width
	let height = canvas.height

	/*------------------------------------*/
	let current = null
	let elements = {
	el1: {
		x: Math.random() * (width - size),
		y: Math.random() * (height - size),
		startX: 0,
		startY: 0
	},

	el2: {
		x: Math.random() * (width - size),
		y: Math.random() * (height - size),
		startX: 0,
		startY: 0
	}
	}

	// начальное положение
	translate(el1, elements.el1.x, elements.el1.y)
	translate(el2, elements.el2.x, elements.el2.y)
	drawLine(
	elements.el1.x,
	elements.el2.x,
	elements.el1.y,
	elements.el2.y
	)

	/*------------------------------------*/

	el1.addEventListener('mousedown', onMouseDown)
	el2.addEventListener('mousedown', onMouseDown)


	function onMouseDown(e) {
	e.preventDefault()
	// координаты нажатия мыши внутри элемента
	elements[e.target.id].startX = e.x - elements[e.target.id].x
	elements[e.target.id].startY = e.y - elements[e.target.id].y

	current = e.target

	document.body.addEventListener('mousemove', onMouseMove)
	document.body.addEventListener('mouseup', onMouseUp)
	}

	function onMouseMove(e) {
		let x = elements[current.id].x = e.x - elements[current.id].startX
		let y = elements[current.id].y = e.y - elements[current.id].startY

		translate(current, x, y)
		drawLine(
			elements.el1.x,
			elements.el2.x,
			elements.el1.y,
			elements.el2.y
		)
	}

	function onMouseUp() {
		document.body.removeEventListener('mousemove', onMouseMove)
		document.body.removeEventListener('mouseup', onMouseUp)
	}

	/*------------------------------------*/

	function translate(el, x, y) {
		el.style.transform = `translate(${x}px, ${y}px)`
	}

	function drawLine(x1, x2, y1, y2) {
		context.clearRect(0, 0, width, height)
		context.beginPath()
		// из центра квадрата
		context.moveTo(x1 + size / 2, y1 + size / 2)
		// в центр другого квадрата
		context.lineTo(x2 + size / 2, y2 + size / 2)
		context.stroke()
	}

}



// Функционал

// //Функция для перемещения элементов
// function elementDragging(element) {
//     let isDragging = false;
//     let initialMouseX, initialMouseY;
//     let initialElementX, initialElementY;

//     element.addEventListener('mousedown', function (e) {
//       isDragging = true;
//       initialMouseX = e.clientX;
//       initialMouseY = e.clientY;
//       initialElementX = element.offsetLeft;
//       initialElementY = element.offsetTop;
//     });

//     document.addEventListener('mousemove', function (e) {
//       if (isDragging) {
//         let deltaX = e.clientX - initialMouseX;
//         let deltaY = e.clientY - initialMouseY;
//         let newElementX = initialElementX + deltaX;
//         let newElementY = initialElementY + deltaY;
//         element.style.left = newElementX + 'px';
//         element.style.top = newElementY + 'px';
//       }
//     });

//     document.addEventListener('mouseup', function () {
//       isDragging = false;
//     });
//   }

// let draggableElements = document.querySelectorAll('.vertex');

// draggableElements.forEach(function (element) {
// 	elementDragging(element);
// });