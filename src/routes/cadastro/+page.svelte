<script lang="ts">
    import { formatCpf, validateCpf } from "$lib/cpf";

    let cpf = "";
    $: cpf = formatCpf(cpf);
    let cpfInvalid = false;
    let cpfElement: HTMLInputElement;

    let password = "";
    let passwordInvalidMessage = "";
    let passwordInvalid = false;

    let form: HTMLFormElement;

    function cpfKey(ev: KeyboardEvent) {
        if(isNaN(<any>ev.key)) ev.preventDefault();
    }

    async function validateAndSubmit(ev: SubmitEvent) {
        ev.preventDefault();
        if(!validateCpf(cpf)) {
            cpfInvalid = true;
            return;
        }
        if(password.length < 8) {
            passwordInvalid = true;
            passwordInvalidMessage = "Muito curta";
            return;
        }
        let validatePass = await (await fetch("/api/validatepass", 
            { method: "post", body: JSON.stringify({cpf: cpf, password: password}) }
        )).text() === "true";
        if(!validatePass) {
            passwordInvalid = true;
            passwordInvalidMessage = "Senha inválida";
            return;
        }
        cpfInvalid = false;
        passwordInvalid = false;
        passwordInvalidMessage = "";
        form.submit();
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
    .labelInvalid {
        color: red;
    }
    .inputInvalid {
        border-color: red;
    }
</style>
<main>
    <img src="/brasao.png" alt="" width=100 height=100>
    <h1>Cadastro de Usuário</h1>
    <form method="post" on:submit={validateAndSubmit} bind:this={form}>
        <label for="cpf" class:labelInvalid={cpfInvalid}>CPF:</label>
        <input type="text" name="cpf" maxlength=14 bind:value={cpf} bind:this={cpfElement} on:keypress={cpfKey} class:inputInvalid={cpfInvalid} required>
        <label for="password" class:labelInvalid={passwordInvalid}>
            Senha{#if passwordInvalidMessage}{` (${passwordInvalidMessage})`}{/if}:
        </label>
        <input type="password" name="password" bind:value={password} required class:inputInvalid={passwordInvalid}>
        <button type="submit">Cadastrar</button>
    </form>
</main>