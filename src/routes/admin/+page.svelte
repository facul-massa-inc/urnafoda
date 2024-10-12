<script lang="ts">
    export let data: {auth: string};

    let command = "";
    let result = "";

    async function handleEnter(ev: KeyboardEvent) {
        if(ev.key === "Enter") await fireCommand();
    }

    async function fireCommand() {
        result = await (await fetch("/admin", { method: "post", headers: {
            "Authorization": data.auth
        }, body: command })).text();
    }
</script>
<style>
    :global(body) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input {
        width: 90%;
    }
</style>
<input bind:value={command} on:keypress={handleEnter}>
<p>{result}</p>