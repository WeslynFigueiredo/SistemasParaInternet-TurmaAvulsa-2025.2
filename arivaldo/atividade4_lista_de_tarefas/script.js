// Seleciona os elementos HTML para interagir com o JavaScript
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");// Função para adicionar uma nova tarefa à lista
function addTask() {
// Obtém o texto digitado no campo de entrada e remove espaços extras
const taskText = taskInput.value.trim();// Verifica se o campo de entrada não está vazio
if (taskText !== "") {
// Cria um novo item de lista (<li>) com o texto da tarefa e um botão de remoção
const listItem = document.createElement("li");
listItem.innerHTML = `${taskText} <span class="remove-btn" onclick="removeTask(this)">X</span>`;// Adiciona o item de tarefa à lista (<ul>)
taskList.appendChild(listItem);// Limpa o campo de entrada após adicionar a tarefa
taskInput.value = "";
} else {
// Exibe um alerta se o campo de entrada estiver vazio
alert("Digite uma tarefa para adicionar à lista!");
}
}// Função para remover uma tarefa da lista
function removeTask(taskElement) {
// Remove o item<li> ao qual o botão pertence
taskElement.parentElement.remove();
}