// Матрица смежности
matrixAdjacency = document.getElementById('matrix__adjacency')

matrixAdjacency.addEventListener('click', function() {
	generateMatrix("matrix__adj", "Матрица смежности")
})

// Матрица инцидентности
matrixIncidentality = document.getElementById('matrix__incidentality')

matrixIncidentality.addEventListener('click', function() {
	generateMatrix("matrix__incid", "Матрица инцидентности")
})

// Весовая матрица
matrixWeight = document.getElementById('weight__matrix')

matrixWeight.addEventListener('click', function() {
	generateMatrix("matrix__weight", "Весовая матрица")
})

const rows = 3
const cols = 3
    
    // Генерация матрицы
function generateMatrix(matrix__name, matrix__isName) {
    let matrix = "<table>";
    matrix += "<tr>";
    for (let i = 1; i <= cols; i++) {
        matrix += `<th>${i}</th>`;
    }
    matrix += "</tr>";

    for (let i = 1; i <= rows; i++) {
        matrix += "<tr>";
        for (let j = 1; j <= cols; j++) {
            matrix += `<td>${i},${j}</td>`;
        }
        matrix += "</tr>";
    }

    matrix += '<tr>';
    matrix += `<td colspan="${cols}" style="text-align: center;">${matrix__isName}</td>`;
    matrix += '</tr>';

    matrix += "</table>"; // Закройте таблицу

    document.getElementById(matrix__name).innerHTML = matrix;
}


// Canvas
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const addNodeBtn = document.getElementById('addNodeBtn');
    const createEdgeBtn = document.getElementById('createEdgeBtn');
    const deleteNodeBtn = document.getElementById('deleteNodeBtn');
    
    const modal = document.getElementById('myModal');
    const valueInput = document.getElementById('nodeValue');
    const addNodeModalBtn = document.getElementById('addNodeModalBtn');

    let nodes = [];
    let edges = [];
    let selectedNode = null;
    let isDragging = false;

    var count = 0;

    function drawNode(node) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = node === selectedNode ? 'red' : 'blue';
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('' + node.value, node.x, node.y);
    }

    function drawEdge(node1, node2) {
        ctx.beginPath();
        ctx.moveTo(node1.x, node1.y);
        ctx.lineTo(node2.x, node2.y);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawGraph() {
        edges.forEach(edge => drawEdge(edge[0], edge[1]));
        nodes.forEach(node => drawNode(node));
    }

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function closeAndClearModal() {
        closeModal();
        valueInput.value = ''; // Очистим поле ввода при закрытии
    }

    function handleAddNodeFromModal() {
        const value = valueInput.value.trim();
        var nodeValue = document.getElementById("nodeValue").value;

        fetch('/add-node-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id:count, value: nodeValue }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Ответ от сервера:', data);
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });

        if (value !== '') {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const numericValue = parseFloat(value);
            const newNode = {
                id:count,
                x,
                y,
                value: isNaN(numericValue) ? 0 : numericValue
            };
            count++;
            nodes.push(newNode);
            clearCanvas();
            drawGraph();
            closeModal();
        }
    }

    function handleAddNode() {
        openModal();
    }

    function handleCreateEdge() {
        if (selectedNode && selectedNode !== nodes[nodes.length - 1]) {
            edges.push([nodes[nodes.length - 1], selectedNode]);
            clearCanvas();
            drawGraph();
        }
    }

    function handleDeleteNode() {
        if (selectedNode) {
            const indexToRemove = nodes.indexOf(selectedNode);
            if (indexToRemove !== -1) {
                nodes.splice(indexToRemove, 1);
            }

            fetch('/remove-node-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:selectedNode.id}),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });

            edges = edges.filter(edge => edge[0] !== selectedNode && edge[1] !== selectedNode);
            selectedNode = null;
            clearCanvas();
            drawGraph();
        }
    }

    function handleCanvasClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const clickedNode = nodes.find(node => {
            const distance = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
            return distance <= 20;
        });

        if (clickedNode) {
            if (event.button === 0) {
                selectedNode = clickedNode;
            }
        } else {
            selectedNode = null;
        }

        clearCanvas();
        drawGraph();
    }

    function handleCanvasMouseMove(event) {
        if (selectedNode && isDragging) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            selectedNode.x = mouseX;
            selectedNode.y = mouseY;

            clearCanvas();
            drawGraph();
        }
    }

    function handleCanvasMouseUp() {
        isDragging = false;
    }

		addNodeModalBtn.addEventListener('click', handleAddNodeFromModal);

		// Закрытие модального окна при клике вне его
		window.addEventListener('click', function (event) {
				if (event.target === modal) {
						closeAndClearModal();
				}
		});

		// Закрытие модального окна при нажатии на "X"
		const closeBtn = document.querySelector('.close');
		closeBtn.addEventListener('click', closeAndClearModal);

    addNodeBtn.addEventListener('click', handleAddNode);
    createEdgeBtn.addEventListener('click', handleCreateEdge);
    deleteNodeBtn.addEventListener('click', handleDeleteNode);
    canvas.addEventListener('mousedown', function () {
        isDragging = true;
    });
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('mouseup', handleCanvasMouseUp);
    canvas.addEventListener('mouseleave', function () {
        isDragging = false;
    });
    canvas.addEventListener('click', handleCanvasClick);

    // Обработчик для кнопки в модальном окне
    addNodeModalBtn.addEventListener('click', handleAddNodeFromModal);

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});

