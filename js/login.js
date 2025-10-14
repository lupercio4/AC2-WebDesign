document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const btnCadastro = document.getElementById("btnCadastro");
    const loginSection = document.getElementById("loginSection");
    const cadastroSection = document.getElementById("cadastroSection");

    // Exibe login por padrão
    loginSection.style.display = "block";
    cadastroSection.style.display = "none";

    btnLogin.addEventListener("click", () => {
        loginSection.style.display = "block";
        cadastroSection.style.display = "none";
        btnLogin.classList.add("ativo");
        btnCadastro.classList.remove("ativo");
    });

    btnCadastro.addEventListener("click", () => {
        loginSection.style.display = "none";
        cadastroSection.style.display = "block";
        btnCadastro.classList.add("ativo");
        btnLogin.classList.remove("ativo");
    });
});
