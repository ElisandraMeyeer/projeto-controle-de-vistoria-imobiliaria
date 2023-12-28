
<template>
    <div id="content">
  
  oi {{ teste }}

</div>

    <div>

        <button @click="teste">Clique aqui</button>
    </div>
</template>
  
  
<script>
export default {
    props: ['nome'],
    data() {
        return {
            count: 0,
            teste: null
        };
    },
    methods: {
        teste() {
            const content = document.querySelector("#content");
            const options = {
                margin: [10, 10, 10, 10],
                filename: "arquivo.pdf",
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
            };
            html2pdf().set(options).from(content).save();
        }
    },
    mounted() {
        this.teste = this.nome;
    }

}
</script>
  
  
  
<style scoped></style>
  