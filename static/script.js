// Матрица смежности
//=======================================================
matrixAdjacency = document.getElementById('matrix__adjacency')

matrixAdjacency.addEventListener('click', function() {
	generateMatrix("matrix__adj")
	
})
//=====================================================

// Матрица инцидентности
//=======================================================
matrixIncidentality = document.getElementById('matrix__incidentality')

matrixIncidentality.addEventListener('click', function() {
	generateMatrix("matrix__incid")
})
//=====================================================

// Весовая матрица
//=======================================================
matrixWeight = document.getElementById('weight__matrix')

matrixWeight.addEventListener('click', function() {
	generateMatrix("matrix__weight")
})

// Матрицы
// Размеры матрицы
    const rows = 3
    const cols = 3

    // Генерация матрицы
    function generateMatrix(matrix__name) {
    let matrix = "<table>"; // Используйте <table> вместо <div> для создания таблицы
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

    matrix += "</table>"; // Закройте таблицу

    document.getElementById(matrix__name).innerHTML = matrix;

    // Текст добавляется после закрытия тега </table>
    let text = '<div style="text-align: center; margin-top: 10px;">Матрица инцидентности</div>';
    document.getElementById(matrix__name).insertAdjacentHTML('beforeend', text);
}

// Canvas
//=======================================================================
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const addNodeBtn = document.getElementById('addNodeBtn');
    const createEdgeBtn = document.getElementById('createEdgeBtn');
    const deleteNodeBtn = document.getElementById('deleteNodeBtn'); // Добавленная кнопка удаления

    let nodes = [];
    let edges = [];
    let selectedNode = null;
    let isDragging = false;

    function drawNode(x, y, isSelected = false) {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = isSelected ? 'red' : 'blue';
        ctx.fill();
        ctx.stroke();
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

    function handleAddNode() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        nodes.push({ x, y });
        clearCanvas();
        nodes.forEach(node => drawNode(node.x, node.y, node === selectedNode));
        edges.forEach(edge => drawEdge(edge[0], edge[1]));
    }

    function handleCreateEdge() {
        if (selectedNode && selectedNode !== nodes[nodes.length - 1]) {
            edges.push([nodes[nodes.length - 1], selectedNode]);
            clearCanvas();
            nodes.forEach(node => drawNode(node.x, node.y, node === selectedNode));
            edges.forEach(edge => drawEdge(edge[0], edge[1]));
        }
    }

    function handleDeleteNode() {
        if (selectedNode) {
            // Удаляем вершину из массива nodes
            const indexToRemove = nodes.indexOf(selectedNode);
            if (indexToRemove !== -1) {
                nodes.splice(indexToRemove, 1);
            }

            // Удаляем связанные рёбра
            edges = edges.filter(edge => edge[0] !== selectedNode && edge[1] !== selectedNode);

            // Сбрасываем выбранную вершину
            selectedNode = null;

            // Очищаем и перерисовываем canvas
            clearCanvas();
            nodes.forEach(node => drawNode(node.x, node.y, node === selectedNode));
            edges.forEach(edge => drawEdge(edge[0], edge[1]));
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
        nodes.forEach(node => drawNode(node.x, node.y, node === selectedNode));
        edges.forEach(edge => drawEdge(edge[0], edge[1]));
    }

    function handleCanvasMouseMove(event) {
        if (selectedNode && isDragging) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            selectedNode.x = mouseX;
            selectedNode.y = mouseY;

            clearCanvas();
            nodes.forEach(node => drawNode(node.x, node.y, node === selectedNode));
            edges.forEach(edge => drawEdge(edge[0], edge[1]));
        }
    }

    function handleCanvasMouseUp() {
        isDragging = false;
    }

    addNodeBtn.addEventListener('click', handleAddNode);
    createEdgeBtn.addEventListener('click', handleCreateEdge);
    deleteNodeBtn.addEventListener('click', handleDeleteNode); // Добавлен слушатель для кнопки удаления
    canvas.addEventListener('mousedown', function () {
        isDragging = true;
    });
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('mouseup', handleCanvasMouseUp);
    canvas.addEventListener('mouseleave', function () {
        isDragging = false;
    });
    canvas.addEventListener('click', handleCanvasClick);
});
