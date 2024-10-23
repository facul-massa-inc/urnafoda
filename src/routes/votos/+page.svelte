<script lang="ts">
    import { onMount } from "svelte";
    import type { VotosPageData } from "./+page.server";
    import type { Votos } from "$lib/misc";

    export let data: VotosPageData;

    let votos = data.votos;
    $: total = Object.values(votos).reduce((a, b) => a + b);

    function fixPercent(n: number) {
        return (isNaN(n) ? 0 : n).toFixed(1);
    }

    onMount(() => {
        setInterval(async () => {
            let newVotos: Votos[] = await (await fetch("/api/votecount", { method: "post" })).json();
            let votosMap: typeof votos = {};
            for(let i = 0; i < newVotos.length; ++i) {
                votosMap[newVotos[i].candidato] = newVotos[i].votos;
            }
            votos = votosMap;
        }, 3000);
    });
</script>
<style>
    :global(body) {
        display: flex;
        align-items: center;
        flex-direction: column;
        background-image: url("/camara.jpg");
        background-size: cover;
        backdrop-filter: blur(5px);
        position: absolute;
        width: 100%;
    }
    :global(body)::before {
        content: "";
        position: absolute;
        display: inline-block;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: -1;
        pointer-events: none;
    }
    h1, p {
        color: white;
        text-align: center;
    }
    main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        width: 75%;
        gap: 20px;
    }
    img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .candidato {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(138, 138, 138, 0.164);;
        box-shadow: 0px 8px 15px 0 rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(5px);
        border: 2px solid rgba(255, 255, 255, 0.055);
        border-radius: 10px;
        padding: 5%;
    }
    .barra {
        align-self: flex-end;
        background-color: rgba(224, 224, 224, 0.9);
        width: 100%;
        height: 20px;
        border-radius: 20px;
        margin-top: auto;
        overflow: hidden;
        --percent: 0;
    }
    .barra::before {
        content: "";
        display: inline-block;
        background-color: #4CAF50;
        width: var(--percent);
        height: 100%;
        transition: width 1s ease-in-out;
    }
    .nome {
        margin-top: 1em;
        font-size: 0.9em;
        color: white;
    }
    .contagem {
        color: #4CAF50;
        font-size: 1.25em;
    }
    .porcentagem {
        margin: 0;
        color: #d6d6d6;
        font-size: 0.75em;
    }
</style>
<h1>Resultados da Votação</h1>
<main>
    {#each data.candidatos as candidato}
        <div class="candidato">
            <img src={candidato.photo} alt={candidato.name}>
            <b class="nome">{candidato.name}</b>
            <div class="barra" style="--percent: {fixPercent(votos[candidato.number]/total*100)}%"></div>
            <b class="contagem">{votos[candidato.number]}</b>
            <p class="porcentagem">{fixPercent(votos[candidato.number]/total*100)}%</p>
        </div>
    {/each}
</main>
<p>Total de votos: {total}</p>