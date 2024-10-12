<script lang="ts">
    import { removeCookie } from "typescript-cookie";

    function logout() {
        removeCookie("cpf");
        removeCookie("token");
        window.location.href = "/cadastro";
    }
</script>
<h1>oi</h1>
<button on:click={logout}>deslogar</button>