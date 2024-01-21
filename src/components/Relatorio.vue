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

    <div class="surface-overlay border-round border-1 px-3" v-for="(item, index) in dados.listaComodos" :key="index">
        <label v-if="item.tipo" style="font-weight: bold">{{item.tipo.nome}}:</label>
        <label v-else style="font-weight: bold">{{item.outros}}:</label>
        <ul class="list-disc">
            <li v-if="item.portas">
                <label style="font-weight: bold; margin-right: 3px;">Portas: </label>{{item.portas}}
            </li>
            <li v-if="item.janelas">
                <label style="font-weight: bold; margin-right: 3px;">Janelas: </label>{{item.janelas}}
            </li>
            <li v-if="item.moveis">
                <label style="font-weight: bold; margin-right: 3px;">Móveis: </label>{{item.moveis}}
            </li>
            <li v-if="item.situacaoTeto">
                <label style="font-weight: bold; margin-right: 3px;">Teto: </label> {{item.situacaoTeto}}
            </li>
            <li v-if="item.situacaoParede">
                <label style="font-weight: bold; margin-right: 3px;">Parede: </label> {{item.situacaoParede}}
            </li>
            <li v-if="item.situacaoPiso">
                <label style="font-weight: bold; margin-right: 3px;">Piso: </label> {{item.situacaoPiso}}
            </li>
            <li v-if="item.anotacoesComodo">
                <label style="font-weight: bold; margin-right: 3px;">Outras anotações: </label>{{item.anotacoesComodo}}
            </li>
        </ul>
    </div>
    <div class="surface-overlay border-round border-1 my-3 px-3">
        <label v-if="dados.faxina || dados.entulhos || dados.pintura || dados.observacoesGerais" style="font-weight: bold; margin-right: 1px; ">Geral: </label>
        <ul class="list-disc">
            <li v-if="dados.faxina">{{dados.faxina}}</li>
            <li v-if="dados.entulhos">{{dados.entulhos}}</li>
            <li v-if="dados.pintura">{{dados.pintura}}</li>
            <li v-if="dados.observacoesGerais">{{dados.observacoesGerais}}</li>
        </ul>
    </div>

    <div class="surface-overlay border-round border-1 px-3">
        <label v-if="dados.situacaoAgua" style="font-weight: bold; margin-right: 1px;">Medidores: </label>
        <div v-if="dados.situacaoAgua">
            <div>
                <label style="padding-right: 0.25rem ;">Situação água: </label>
                <label >{{ dados.situacaoAgua }} </label>
            </div>

            <div v-if="aguaLigada">
                <label style="padding-right: 0.25rem ;">Leitura atual: </label>
                <label>{{ dados.leituraAgua }} </label>
            </div>
        </div>

        <div class="mt-3" v-if="dados.situacaoEnergia">
            <div>
                <label style="padding-right: 0.25rem ;">Situação energia elétrica: </label>
                <label>{{ dados.situacaoEnergia }} </label>
            </div>

            <div v-if="energiaLigada">
                <label style="padding-right: 0.25rem ;">Leitura atual: </label>
                <label>{{ dados.leituraEnergia }} </label>
            </div>
        </div>
    </div>

    <div class="surface-overlay border-round border-1 px-3 pt-3">
        <label v-if="dados.situacaoAgua" style="font-weight: bold; margin-right: 1px;">Gerais: </label>
        <ul class="list-disc">
            <li v-if="dados.faxina"><label style="padding-right: 0.25rem ;">Faxina: </label>{{dados.faxina}}</li>
            <li v-if="dados.entulhos">{{dados.entulhos}}</li>
            <li v-if="dados.pintura">{{dados.pintura}}</li>
            <li v-if="dados.observacoesGerais">{{dados.observacoesGerais}}</li>
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
        <label style="font-weight: bold" class="mx-1">{{dados.locatario}}</label>
    </div>
    <div class="mx-3">
        <label>CPF: </label>
        <label style="font-weight: bold" class="mx-1">{{dados.cpfLocatario}}</label>
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
        gerarPdf() {
            const content = document.querySelector("#content");
            const options = {
                margin: [10, 10, 10, 10],
                filename: "arquivo.pdf",
                html2canvas: {
                    scale: 1
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait"
                }
            };
            html2pdf().set(options).from(content).save();
        },
    },
    mounted() {
        console.log(this.dados);
    },
    computed: {
        aguaLigada() {
            return this.dados.situacaoAgua == "Ligada";
        },
        energiaLigada() {
            return this.dados.situacaoEnergia == "Ligada";
        }
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
