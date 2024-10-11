
export function formatCpf(cpf: string) {
    return cpf
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        .replace(/^(^|(?:\d{3}\.))(\d{3})(\d)/, "$1$2.$3")
        .replace(/(\d{3}\.\d{3}\.\d{3})(\d)/, "$1-$2")
        .replace(/[-\.]$/, "");
}