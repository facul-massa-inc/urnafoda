<script lang="ts">
    import { formatCpf } from "$lib/cpf";

    let cpf = "";
    $: cpf = formatCpf(cpf);

    function cpfKey(ev: KeyboardEvent) {
        if(isNaN(<any>ev.key)) ev.preventDefault();
    }
</script>
<style>
    :global(body) {
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(120deg, #555555 0%,  #ebedee 100%);
    }
    form {
        display: flex;
        flex-flow: column;
        align-items: center;
        width: 100%;
    }
    main {
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: white;
        padding: 30px;
        border-radius: 30px;
        width: 300px;
    }
    input {
        width: 100%;
        margin-bottom: 10px;
        height: 30px;
        border: 1px solid #cccccc;
        border-radius: 5px;
    }
    button {
        background-color: #059900;
        border: none;
        color: white;
        padding: 1em;
        border-radius: 10px;
        width: 100%;
        cursor: pointer;
    }
    button:hover {
        background-color: #035e00;
    }
    label {
        align-self: start;
    }
    h1 {
        text-align: center;
        font-size: x-large;
    }
</style>
<main>
    <img src="/brasao.png" alt="" width=100 height=100>
    <h1>Cadastro de Usuário</h1>
    <form>
        <label for="cpf">CPF:</label>
        <input type="text" name="cpf" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" bind:value={cpf} on:keypress={cpfKey} required>
        <label for="password">Senha:</label>
        <input type="password" name="password" required>
        <button type="submit">Cadastrar</button>
    </form>
</main>