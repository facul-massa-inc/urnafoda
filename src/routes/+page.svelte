<script lang="ts">
    import { removeCookie } from "typescript-cookie";

    function logout() {
        removeCookie("cpf");
        removeCookie("token");
        window.location.href = "/cadastro";
    }
</script>
<style>
    :global(body) {
        background-image: linear-gradient(120deg, #555555 0%, #ebedee 100%);
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1 {
        color: white;
        font-size: 3em;
        text-align: center;
    }
    .urna {
        display: flex;
        padding: 2%;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
        gap: 10px;
        border-radius: 20px 20px;
        width: 90%;
        aspect-ratio: 3 / 1;
    }
    .tela {
        flex: 1.5 1;
        height: 90%;
        background-color: #e9e9e9;
        border-radius: 20px 20px;
    }
    .teclado {
        flex: 1 1;
        display: flex;
        flex-direction: column;
        border-radius: 10px 10px;
        overflow: hidden;
        height: 100%;
    }
    .botoes {
        display: grid;
        flex-grow: 1;
        grid-template-columns: 1fr 1fr 1fr;
        background-color: #e9e9e9;
        justify-items: center;
        align-items: center;
    }
    .botoes > button {
        background-color: #292929;
        border: none;
        color: white;
        width: 80%;
        height: 80%;
        border-radius: 10px 10px;
        font-size: 1em;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        font-size: 1.7vw;
    }
    .botoes > button:nth-child(10) {
        grid-column: 2;
    }
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #292929;
    }
    .logo > img {
        width: 5vw;
        height: 5vw;
        filter: grayscale(100%);
    }
    .logo > h2 {
        font-size: 1.5vw;
        color: white;
    }
</style>
<h1>Urna Eletrônica</h1>
<div class="urna">
    <div class="tela"></div>
    <div class="teclado">
        <div class="logo">
            <img src="/brasao.png" alt=""> 
            <h2>REPÚBLICA DA CYBERSEGURANÇA</h2>
        </div>
        <div class="botoes">
            {#each {length: 10} as _, i}
                <button>{(i+1)%10}</button>
            {/each}
            <div></div>
            <button style="background-color: white; color: black;">Branco</button>
            <button style="background-color: #ff5959;">Corrige</button>
            <button style="background-color: forestgreen;">Confirma</button>
        </div>
    </div>
</div>
<button on:click={logout}>deslogar</button>