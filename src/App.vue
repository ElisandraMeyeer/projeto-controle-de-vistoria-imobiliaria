
<template>
  <router-view></router-view>
</template>


<script>

import Formulario from './components/Formulario.vue';
export default {
  components: { Formulario },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    exibirMensagemAntesDeRecarregar(event) {
      const mensagem = "Você tem alterações não salvas. Tem certeza que deseja sair?";
      event.returnValue = mensagem;
      return mensagem;
    },
  },
  mounted() {
    window.addEventListener('beforeunload', this.exibirMensagemAntesDeRecarregar);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.exibirMensagemAntesDeRecarregar);
  },

}
</script>


