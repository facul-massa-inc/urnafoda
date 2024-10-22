<script lang="ts">
    import { removeCookie } from "typescript-cookie";
    import type { MainPageData } from "./+page.server";
    import { type Candidato, BrancoNulo } from "$lib/candidatos_types";

    export let data: MainPageData;
    const digitCount = 2;
    let numeros: number[] = [];
    let candidato: Candidato | BrancoNulo | null = null;
    let fim = data.alreadyVoted;

    function logout() {
        removeCookie("cpf");
        removeCookie("token");
        window.location.href = "/cadastro";
    }

    function corrige() {
        const corrige = new Audio("/corrige.mp3");
        corrige.play();
        numeros = [];
        candidato = null;
    }

    function branco() {
        candidato = BrancoNulo.BRANCO;
    }

    function enterNumber(num: number) {
        if(numeros.length >= digitCount) {
            return;
        }
        const tap = new Audio("/tap.mp3");
        tap.play();
        numeros.push(num);
        numeros = numeros;
        if(numeros.length !== digitCount) {
            return;
        }
        let candidatoFinal = data.candidatos.find(c => c.number === numeros.join(""));
        if(candidatoFinal) {
            candidato = candidatoFinal;
        }else {
            candidato = BrancoNulo.NULO;
        }
    }

    function keyDown(ev: KeyboardEvent) {
        if(ev.key === "Enter") {
            confirma();
            return;
        }
        if(ev.key === "Backspace" || ev.key === "Delete") {
            corrige();
            return;
        }
        let num = parseInt(ev.key);
        if(!isNaN(num)) {
            enterNumber(num);
        }
    }

    function confirma() {
        if(!candidato) {
            return;
        }
        const confirma = new Audio("/confirma.mp3");
        confirma.play();
        fim = true;
        fetch("/api/vote", {method: "post", body: numeros.join(""), headers: {"Content-Type": "text/plain"}});
    }
</script>
<svelte:window on:keydown={keyDown} />
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
        display: flex;
        position: relative;
        flex-direction: column;
        flex: 1.5 1;
        padding-left: 3%;
        padding-right: 3%;
        padding-top: 3%;
        height: 87%;
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
    .tela-grid {
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        width: 90%;
    }
    .numeros {
        display: flex;
        gap: 5px;
    }
    .numero {
        background-color: white;
        height: 100%;
        aspect-ratio: 27 / 35;
        border: 1px solid black;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2vw;
        color: #292929;
    }
    .numero:empty:not(.numero:empty ~ .numero:empty) {
        animation: blinking 1s infinite;
    }
    @keyframes blinking {
        0% { opacity: 1; }
        50% { opacity: 0.2; }
        100% { opacity: 1; }
    }
    .tela p {
        font-size: 1.2vw;
    }
    .tela > p:first-child {
        font-size: 1.5vw;
        margin-bottom: 10px;
    }
    .tela > p {
        font-style: 0.3vw;
        margin: 0;
    }
    .tela > main {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .candidato {
        display: inline-block;
        width: 35%;
        background-color: white;
        padding: 2%;
        border-radius: 10px 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }
    .candidato-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .candidato > p {
        text-align: center;
        margin: 0;
    }
    .candidato > img {
        width: 100%;
    }
    .logout {
        background: none;
        border: none;
        cursor: pointer;
        text-decoration: underline;
    }
    .tela > hr {
        width: 100%;
        margin-top: auto;
    }
    .numeroerrado {
        margin-top: 5px;
        grid-column: span 2;
    }
    .nulo {
        margin-top: auto;
        font-size: 3vw;
        animation: blinking 1s infinite;
    }
    .branco {
        margin-top: auto;
        margin-bottom: auto;
        text-align: center;
        font-size: 4vw;
        animation: blinking 1s infinite;
    }
    .fim {
        font-size: 7vw;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
<h1>Urna Eletrônica</h1>
<div class="urna">
    <div class="tela">
        {#if !fim}
            <p>SEU VOTO PARA</p>
                <main>
                    <div class="tela-grid">
                        <div></div>
                        <p style="font-size: 1.5vw">Candidato</p>
                        {#if candidato !== BrancoNulo.BRANCO}
                            <p>Número:</p>
                            <div class="numeros">
                                {#each {length: digitCount} as _, i}
                                    <div class="numero">{numeros[i] ?? ""}</div>
                                {/each}
                            </div>
                            {#if candidato && typeof candidato === "object"}
                                <p>Nome:</p>
                                <p>{candidato.name}</p>
                                <p>Partido:</p>
                                <p>{candidato.party}</p>
                            {:else if candidato === BrancoNulo.NULO}
                                <b class="numeroerrado">NÚMERO ERRADO</b>
                            {/if}
                        {/if}
                    </div>
                    {#if candidato && typeof candidato === "object"}
                        <div class="candidato-wrapper">
                            <div class="candidato">
                                <img src={candidato.photo} alt={candidato.name}>
                                <p>Candidato</p>
                            </div>
                        </div>
                    {/if}
                </main>
            {#if candidato === BrancoNulo.BRANCO}
                <b class="branco">VOTO EM BRANCO</b>
            {/if}
            {#if candidato}
                {#if candidato === BrancoNulo.NULO}
                    <b class="nulo">VOTO NULO</b>
                {/if}
                <hr>
                <p>Aperte a tela:</p>
                <p>CONFIRMA para CONFIRMAR este voto</p>
                <p>CORRIGE para CORRIGIR este voto</p> 
            {/if}
        {:else}
            <b class="fim">FIM</b>
        {/if}
    </div>
    <div class="teclado">
        <div class="logo">
            <img src="/brasao.png" alt=""> 
            <h2>REPÚBLICA DA CYBERSEGURANÇA</h2>
        </div>
        <div class="botoes">
            {#each {length: 10} as _, i}
                <button on:click={()=>enterNumber((i+1)%10)}>{(i+1)%10}</button>
            {/each}
            <div></div>
            <button style="background-color: white; color: black;" on:click={branco}>Branco</button>
            <button style="background-color: #ff5959;" on:click={corrige}>Corrige</button>
            <button style="background-color: forestgreen;" on:click={confirma}>Confirma</button>
        </div>
    </div>
</div>
<button on:click={logout} class="logout">Deslogar</button>
