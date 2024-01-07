<template>
<div id="content">

    <div style="display: flex; justify-content: center; align-items: center;">
        <img src="/logo.png" alt="Logo" />
    </div>

    <div class="m-3">
        <p>Recebi de ALBINO administradora e venda de imóveis, as chaves e
            utensílios do imóvel sito a
            <b>
                <label v-if="dados.rua">Rua: {{dados.rua}}, </label>
                <label v-if="dados.numero"> {{dados.numero}} </label>
                <label v-if="dados.apto"> - {{dados.apto}} </label>
                <label v-if="dados.bairro"> - {{dados.bairro}} </label>
                <label v-if="dados.cidade"> - {{dados.cidade}} </label>
                <label v-if="dados.estado"> - {{dados.estado}} </label>
                <label v-if="dados.cep"> - CEP: {{dados.cep}}; </label>
            </b>
            obrigando-me a devolvê-las no término da locação nas mesmas condições em que o recebi:</p>
    </div>

    <div class="m-3">
        <b>ATENÇÃO: DEVOLUÇÃO DO IMÓVEL ATÉ AS 17:00 HORAS, COM VISTORIA CUMPRIDA
            (DEVOLVER DE ACORDO COM A RELAÇÃO ABAIXO), MUNIDO DE QUITAÇÃO DE LUZ
            E ÁGUA, IPTU E/OU CONDOMÍNIO. </b>
    </div>

    <div class="surface-overlay border-round border-1 my-3 p-3" v-for="(item, index) in dados.listaComodos" :key="index">
        <label v-if="item.tipo" style="font-weight: bold">{{item.tipo.nome}}:</label>
        <label v-else style="font-weight: bold">{{item.outros}}:</label>
        <ul class="list-disc">
            <li v-if="item.portas">{{item.portas}}</li>
            <li v-if="item.janelas">{{item.janelas}}</li>
            <li v-if="item.moveis">{{item.moveis}}</li>
            <li v-if="item.situacaoTeto">{{item.situacaoTeto}}</li>
            <li v-if="item.situacaoParede">{{item.situacaoParede}}</li>
            <li v-if="item.situacaoComodo">{{item.situacaoComodo}}</li>
        </ul>
    </div>

    <div>
        <label class="m-3">São José, {{dataAtual}}.</label>
    </div>

    <div class="mx-3 mt-3">
        <label for="">______________________________________________</label>
    </div>
    <div class="mx-3">
        <label>Locatário: </label>
        <label style="font-weight: bold" class="mx-1">Locatário: </label>
    </div>

</div>

<div class="botao">
    <button type="button" class="btn btn-secondary" @click="gerarPdf">Gerar vistoria em PDF</button>

</div>
</template>

<script>
import Button from 'primevue/button';

export default {
    props: ['dados'],
    components: [Button],
    data() {
        return {
            count: 0,
            dados: this.dados,
            dataAtual: new Date().toLocaleDateString()
        };
    },
    methods: {
        teste() {
            const content = document.querySelector("#content");
            const options = {
                margin: [20, 20, 20, 20],
                filename: "arquivo.pdf",
                html2canvas: {
                    scale: 2
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait"
                }
            };
            html2pdf().set(options).from(content).save();
        }
    },
    mounted() {
        console.log(this.dados);
    },


}
</script>

<style scoped>
.botao {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
