const telaModal = document.querySelector(".modal");


// Metodos de interação com Local Storage
const getLocalStorage = () => JSON.parse(localStorage.getItem("dbClientes")) ?? [];
const setLocalSotrage = (dbClientes) => localStorage.setItem("dbClientes", JSON.stringify(dbClientes));


// estrutra da tabela com dados
const linhasTabela = (cliente, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.celular}</td>
        <td>${cliente.cidade}</td>
        <td>
            <button type="button" id="btnEditar-${index}" class="button green">editar</button>
            <button type="button" id="btnDeletar-${index}" class="button red">excluir</button>
        </td>
    `
    document.querySelector("#tableCliente>tbody").appendChild(tr);
}



// Mostrar tabela
const mostrarTabela = () => {
    const dbClientes = getLocalStorage();
    limparTabela();
    dbClientes.forEach(linhasTabela);
}
    
// Mostra somente uma tabela
const limparTabela = () => {
    const rows = document.querySelectorAll("#tableCliente>tbody tr")
    rows.forEach(row => row.parentNode.removeChild(row));
}




const isValidFields = () => {
    return document.querySelector("#form").reportValidity();
}


// Funcação do botao salvar: criar novo/ editar
const salvarCliente = () => {

    if (isValidFields()) {

        const cliente = {
            nome: document.querySelector("#nome").value,
            email: document.querySelector("#email").value,
            celular: document.querySelector("#celular").value,
            cidade: document.querySelector("#cidade").value,

        }

            cadastrarCliente(cliente);
            mostrarTabela();
            fecharModal();
            console.log("Novo cliente")

        // const index = document.getElementById("nome").dataset.index

        // if(index == "new"){
        //     cadastrarCliente(cliente);
        //     mostrarTabela();
        //     fecharModal();
        //     console.log("Novo cliente")
            
        // }else{
        //     editarCliente(index, cliente);
        //     mostrarTabela();
        //     fecharModal();
        //     console.log("Atualziar cliente")
        // }

    }

}





const camposPreenchidos = (cliente) => {
    document.querySelector("#nome").value = cliente.nome;
    document.querySelector("#email").value = cliente.email;
    document.querySelector("#celular").value = cliente.celular;
    document.querySelector("#cidade").value = cliente.cidade;
    document.querySelector("#nome").dataset.index = cliente.index;
}

const editarCliente = (index) => {
    const dbCliente = getLocalStorage();
    dbCliente.index = index;
    camposPreenchidos(dbCliente[index]); 
    abrirModal();
    
}


// Chama o evneto de deletar o editar
const editDelete = (event) => {

    if (event.target.type == "button") {

        const [acao, index] = event.target.id.split('-');

        if (acao == "btnEditar") {
            editarCliente(index);
        }
        if (acao == "btnDeletar") {
            apagarCliente(index);
            mostrarTabela();
        }
    }

}


//CRUD COMPLETO ==============================================
// Apagar cliente
const apagarCliente = (index) => {
    const dbClientes = getLocalStorage();
    dbClientes.splice(index, 1);
    setLocalSotrage(dbClientes);
}


// Ler Cliente
const lerCliente = (index) => {
    const dbClientes = getLocalStorage();
    console.log(dbClientes[index]);
}


// Atualizar Cliente
const atualizarCliente = (index, cliente) => {
    const dbClientes = getLocalStorage();
    dbClientes[index] = cliente;
    setLocalSotrage(dbClientes);
}


// Cadastrar cliente
const cadastrarCliente = (cliente) => {
    const dbClientes = getLocalStorage();
    dbClientes.push(cliente);
    setLocalSotrage(dbClientes);
}
//FIM-CRUD COMPLETO ==========================================


// Funcação que fecha tela  modal
const fecharModal = () => {
    limparInputs();
    telaModal.classList.remove("active");
}

// Limpa campos
const limparInputs = () => {
    const inputs = document.querySelectorAll(".modal-field");
    inputs.forEach(campos => campos.value = "")
}

// Funcação que abre tela modal
const abrirModal = () => {
    telaModal.classList.add("active");
}

// botoes que chamar acoes====================================
document.querySelector("#cadastrarCliente")
    .addEventListener("click", abrirModal);

document.querySelector("#modalClose")
    .addEventListener("click", fecharModal)

document.querySelector("#salvar")
    .addEventListener("click", salvarCliente)

document.querySelector("#cancelar")
    .addEventListener("click", fecharModal)

document.querySelector("#tableCliente>tbody tr")
addEventListener("click", editDelete)


mostrarTabela();