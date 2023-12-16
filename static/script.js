let graphInner = document.querySelector('.graph__inner')

// Кнопки

//Кнопка добавить узел
let buttonAddVertex = document.querySelector('#add__vertex')

buttonAddVertex.onclick = () => {
	let newVertex = document.createElement('div')
	newVertex.classList.add('vertex')
	newVertex.textContent = '23'; //Добавляем значение узла
	graphInner.appendChild(newVertex)
	elementDragging(newVertex)
	selectVertex(newVertex)
	

// document.addEventListener('click', function(event) {
// 	newVertex.forEach(function(element) {
// 		if (!element.contains(event.target)) {
// 			// Клик произошел вне элемента, сбрасываем стиль рамки
// 			element.style.border = '2px solid #fff'; // исходный цвет рамки
// 		}
// 	})
// })
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

// Функционал

// //Функция для перемещения элементов
function elementDragging(element) {
    let isDragging = false;
    let initialMouseX, initialMouseY;
    let initialElementX, initialElementY;

    element.addEventListener('mousedown', function (e) {
      isDragging = true;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;
      initialElementX = element.offsetLeft;
      initialElementY = element.offsetTop;
    });

    document.addEventListener('mousemove', function (e) {
      if (isDragging) {
        let deltaX = e.clientX - initialMouseX;
        let deltaY = e.clientY - initialMouseY;
        let newElementX = initialElementX + deltaX;
        let newElementY = initialElementY + deltaY;
        element.style.left = newElementX + 'px';
        element.style.top = newElementY + 'px';
      }
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
    });
  }

let draggableElements = document.querySelectorAll('.vertex');

draggableElements.forEach(function (element) {
	elementDragging(element);
});

//Выбираем элемент
let vertexes = document.querySelectorAll('.vertex')

function selectVertex(element) {
	element.addEventListener('click', function() {
		element.style.border = '2px solid red'
	})
}

//Если клик вне элемента, то отменяем выбор
function cancelSelectVertex() {
	document.addEventListener('click', function(event) {
		vertexes.forEach(function(element) {
			if (!element.contains(event.target)) {
				// Клик произошел вне элемента, сбрасываем стиль рамки
				element.style.border = '2px solid #fff'; // исходный цвет рамки
			}
		})
	})
}

vertexes.forEach(function() {
	cancelSelectVertex()
})


vertexes.forEach(function(element) {
	selectVertex(element)
})



